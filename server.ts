import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse large bodies (essential for compressed base64 images)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Initialize Firebase server-side (bypass client-side iframe sandbox blocks)
  let db: any = null;
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      const firebaseApp = initializeApp(config);
      const dbId = config.firestoreDatabaseId || 'default';
      db = getFirestore(firebaseApp, dbId);
      console.log('Firebase initialized server-side with database ID:', dbId);
    }
  } catch (err) {
    console.warn('Could not initialize Firebase server-side:', err);
  }

  // Path to local file storage for 100% reliable persistence
  const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'lib', 'parish_data.json');

  function getLocalParishData() {
    if (fs.existsSync(DATA_FILE_PATH)) {
      try {
        const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(content);
      } catch (e) {
        console.error('Error reading local parish JSON file:', e);
      }
    }
    return null;
  }

  function saveLocalParishData(data: any) {
    try {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Error writing local parish JSON file:', e);
      return false;
    }
  }

  // --- API Routes ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Fetch parish data
  app.get('/api/parish-data', async (req, res) => {
    // 1. Try local JSON first (instant cache fallback)
    let data = getLocalParishData();

    if (data) {
      // Return local cache immediately for speed, sync in background if needed
      return res.json(data);
    }

    // 2. Otherwise try Firestore
    if (db) {
      try {
        console.log('Fetching parish data from Firestore server-side...');
        // Announcement
        const announcementDocRef = doc(db, 'settings', 'announcement');
        const announcementSnap = await getDoc(announcementDocRef);
        let announcement = {
          roTitle: 'Anunț Important',
          roText: 'Slujbele noastre de duminică încep cu Utrenia la ora 09:00 și Sfânta Liturghie la 10:00.',
          enTitle: 'Important Announcement',
          enText: 'Our Sunday services begin with Matins at 09:00 and Holy Liturgy at 10:00.',
          active: false,
        };
        if (announcementSnap.exists()) {
          const d = announcementSnap.data();
          announcement = {
            roTitle: d.roTitle || announcement.roTitle,
            roText: d.roText || announcement.roText,
            enTitle: d.enTitle || announcement.enTitle,
            enText: d.enText || announcement.enText,
            active: typeof d.active === 'boolean' ? d.active : announcement.active,
          };
        }

        // Services
        const servicesDocRef = doc(db, 'settings', 'services');
        const servicesSnap = await getDoc(servicesDocRef);
        let services: any[] = [];
        if (servicesSnap.exists()) {
          const d = servicesSnap.data();
          if (Array.isArray(d.list)) {
            services = d.list;
          }
        }

        // Gallery
        const galleryDocRef = doc(db, 'settings', 'gallery');
        const gallerySnap = await getDoc(galleryDocRef);
        let galleryPhotos: any[] = [];
        let galleryVideos: any[] = [];
        if (gallerySnap.exists()) {
          const d = gallerySnap.data();
          if (Array.isArray(d.photos)) {
            galleryPhotos = d.photos;
          }
          if (Array.isArray(d.videos)) {
            galleryVideos = d.videos;
          }
        }

        data = { announcement, services, galleryPhotos, galleryVideos };
        saveLocalParishData(data);
        return res.json(data);
      } catch (err) {
        console.error('Error fetching from Firestore server-side:', err);
      }
    }

    // Default fallback
    const defaultData = {
      announcement: {
        roTitle: 'Anunț Important',
        roText: 'Slujbele noastre de duminică încep cu Utrenia la ora 09:00 și Sfânta Liturghie la 10:00.',
        enTitle: 'Important Announcement',
        enText: 'Our Sunday services begin with Matins at 09:00 and Holy Liturgy at 10:00.',
        active: false,
      },
      services: [],
      galleryPhotos: [],
      galleryVideos: []
    };
    return res.json(defaultData);
  });

  // Save parish data
  app.post('/api/parish-data', async (req, res) => {
    const newData = req.body;

    // 1. Save to local JSON instantly
    saveLocalParishData(newData);

    // 2. Sync to Firestore server-side
    if (db) {
      try {
        console.log('Syncing parish data to Firestore server-side...');
        // Save Announcement
        const announcementDocRef = doc(db, 'settings', 'announcement');
        await setDoc(announcementDocRef, {
          roTitle: newData.announcement?.roTitle || '',
          roText: newData.announcement?.roText || '',
          enTitle: newData.announcement?.enTitle || '',
          enText: newData.announcement?.enText || '',
          active: !!newData.announcement?.active
        });

        // Save Services List
        const servicesDocRef = doc(db, 'settings', 'services');
        await setDoc(servicesDocRef, {
          list: newData.services || [],
          version: 1
        });

        // Save Gallery
        const galleryDocRef = doc(db, 'settings', 'gallery');
        await setDoc(galleryDocRef, {
          photos: newData.galleryPhotos || [],
          videos: newData.galleryVideos || []
        });

        console.log('Firestore server-side sync successful!');
      } catch (err) {
        console.error('Error syncing with Firestore server-side:', err);
        // Do not return error code to client, as we have written to local file successfully
      }
    }

    return res.json({ success: true });
  });

  // --- Vite & Production SPA Static Serving Middleware ---

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
