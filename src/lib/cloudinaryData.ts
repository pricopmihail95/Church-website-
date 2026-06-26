import { Service, GalleryPhoto, GalleryVideo } from '../types';
import { SERVICES_SCHEDULING } from '../data';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface ParishData {
  announcement: {
    roTitle: string;
    roText: string;
    enTitle: string;
    enText: string;
    active: boolean;
  };
  services: Service[];
  galleryPhotos: GalleryPhoto[];
  galleryVideos: GalleryVideo[];
}

export const DEFAULT_PARISH_DATA: ParishData = {
  announcement: {
    roTitle: 'Anunț Important',
    roText: 'Slujbele noastre de duminică încep cu Utrenia la ora 09:00 și Sfânta Liturghie la 10:00.',
    enTitle: 'Important Announcement',
    enText: 'Our Sunday services begin with Matins at 09:00 and Holy Liturgy at 10:00.',
    active: false,
  },
  services: SERVICES_SCHEDULING,
  galleryPhotos: [],
  galleryVideos: []
};

export async function fetchParishData(): Promise<ParishData> {
  try {
    console.log('Fetching parish data directly from Firestore...');
    // 1. Fetch Announcement
    const announcementDocRef = doc(db, 'settings', 'announcement');
    const announcementSnap = await getDoc(announcementDocRef);
    let announcement = DEFAULT_PARISH_DATA.announcement;
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

    // 2. Fetch Services
    const servicesDocRef = doc(db, 'settings', 'services');
    const servicesSnap = await getDoc(servicesDocRef);
    let services = DEFAULT_PARISH_DATA.services;
    if (servicesSnap.exists()) {
      const d = servicesSnap.data();
      if (Array.isArray(d.list)) {
        services = d.list;
      }
    }

    // 3. Fetch Gallery (Photos and Videos)
    const galleryDocRef = doc(db, 'settings', 'gallery');
    const gallerySnap = await getDoc(galleryDocRef);
    let galleryPhotos: GalleryPhoto[] = [];
    let galleryVideos: GalleryVideo[] = [];
    if (gallerySnap.exists()) {
      const d = gallerySnap.data();
      if (Array.isArray(d.photos)) {
        galleryPhotos = d.photos;
      }
      if (Array.isArray(d.videos)) {
        galleryVideos = d.videos;
      }
    }

    const validatedData: ParishData = {
      announcement,
      services,
      galleryPhotos,
      galleryVideos
    };

    localStorage.setItem('parish_live_data', JSON.stringify(validatedData));
    return validatedData;
  } catch (error) {
    console.warn('Error fetching directly from Firestore, trying local storage fallback:', error);
    const local = localStorage.getItem('parish_live_data');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return {
          announcement: parsed.announcement || DEFAULT_PARISH_DATA.announcement,
          services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_PARISH_DATA.services,
          galleryPhotos: Array.isArray(parsed.galleryPhotos) ? parsed.galleryPhotos : [],
          galleryVideos: Array.isArray(parsed.galleryVideos) ? parsed.galleryVideos : []
        };
      } catch (e) {
        console.error('Error parsing local fallback data:', e);
      }
    }
    return DEFAULT_PARISH_DATA;
  }
}

export async function saveParishData(data: ParishData): Promise<boolean> {
  const dataStr = JSON.stringify(data);
  localStorage.setItem('parish_live_data', dataStr);

  try {
    console.log('Saving parish data directly to Firestore...');
    // Save Announcement
    const announcementDocRef = doc(db, 'settings', 'announcement');
    await setDoc(announcementDocRef, {
      roTitle: data.announcement?.roTitle || '',
      roText: data.announcement?.roText || '',
      enTitle: data.announcement?.enTitle || '',
      enText: data.announcement?.enText || '',
      active: !!data.announcement?.active
    });

    // Save Services List
    const servicesDocRef = doc(db, 'settings', 'services');
    await setDoc(servicesDocRef, {
      list: data.services || [],
      version: 1
    });

    // Save Gallery
    const galleryDocRef = doc(db, 'settings', 'gallery');
    
    // Firestore Nu suportă valori undefined. Curățăm undefined.
    const cleanPhotos = (data.galleryPhotos || []).map(p => {
      const cleanP = { ...p };
      if (cleanP.caption === undefined) cleanP.caption = '';
      return cleanP;
    });

    await setDoc(galleryDocRef, {
      photos: cleanPhotos,
      videos: data.galleryVideos || []
    });

    console.log('Successfully saved all parish settings directly to Firestore!');
    return true;
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    handleFirestoreError(error, OperationType.WRITE, 'settings/*');
    return false;
  }
}
