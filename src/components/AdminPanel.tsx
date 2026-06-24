import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Service, GalleryPhoto, GalleryVideo } from '../types';
import { SERVICES_SCHEDULING } from '../data';
import { 
  Lock, 
  Unlock, 
  Save, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  AlertCircle, 
  Calendar, 
  Megaphone, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown,
  Clock,
  Sparkles,
  Image as ImageIcon,
  Video as VideoIcon,
  Upload,
  Link,
  Loader2,
  AlertTriangle,
  Play,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

interface AnnouncementData {
  roTitle: string;
  roText: string;
  enTitle: string;
  enText: string;
  active: boolean;
}

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Data States
  const [announcement, setAnnouncement] = useState<AnnouncementData>({
    roTitle: 'Anunț Important',
    roText: 'Slujbele noastre de duminică încep cu Utrenia la ora 09:00 și Sfânta Liturghie la 10:00.',
    enTitle: 'Important Announcement',
    enText: 'Our Sunday services begin with Matins at 09:00 and Holy Liturgy at 10:00.',
    active: false,
  });
  
  const [services, setServices] = useState<Service[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Gallery Inputs States
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoUrlInput, setPhotoUrlInput] = useState(''); // manually paste url fallback
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [galleryStatus, setGalleryStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  // Load from Firestore
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Fetch Announcement
        const annDocRef = doc(db, 'settings', 'announcement');
        let annDocSnap;
        try {
          annDocSnap = await getDoc(annDocRef);
        } catch (e) {
          handleFirestoreError(e, OperationType.GET, 'settings/announcement');
        }
        
        if (annDocSnap && annDocSnap.exists()) {
          setAnnouncement(annDocSnap.data() as AnnouncementData);
        }

        // Fetch Services
        const servDocRef = doc(db, 'settings', 'services');
        let servDocSnap;
        try {
          servDocSnap = await getDoc(servDocRef);
        } catch (e) {
          handleFirestoreError(e, OperationType.GET, 'settings/services');
        }
        
        if (servDocSnap && servDocSnap.exists()) {
          const data = servDocSnap.data() as { list: Service[] };
          if (data && Array.isArray(data.list)) {
            setServices(data.list);
          } else {
            setServices(SERVICES_SCHEDULING);
          }
        } else {
          setServices(SERVICES_SCHEDULING);
        }

        // Fetch Gallery
        const gallDocRef = doc(db, 'settings', 'gallery');
        let gallDocSnap;
        try {
          gallDocSnap = await getDoc(gallDocRef);
        } catch (e) {
          console.warn('Gallery document load warning:', e);
        }
        if (gallDocSnap && gallDocSnap.exists()) {
          const gData = gallDocSnap.data();
          if (gData.photos && Array.isArray(gData.photos)) {
            setGalleryPhotos(gData.photos);
          }
          if (gData.videos && Array.isArray(gData.videos)) {
            setGalleryVideos(gData.videos);
          }
        }
      } catch (e) {
        console.error('Error loading Firestore settings:', e);
        // Fallback to static defaults
        if (services.length === 0) {
          setServices(SERVICES_SCHEDULING);
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPassword = password.trim().toLowerCase();
    // Supporting standard parish nicknames or password for simplicity
    if (cleanPassword === 'scunthorpe' || cleanPassword === 'sfhybald' || cleanPassword === 'parohie') {
      setIsAuthorized(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Parolă incorectă! Încearcă "Scunthorpe" sau "sfhybald".');
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveSuccess(false);

      // Save Announcement document
      const annDocRef = doc(db, 'settings', 'announcement');
      try {
        await setDoc(annDocRef, announcement);
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, 'settings/announcement');
      }

      // Save Services document
      const servDocRef = doc(db, 'settings', 'services');
      try {
        await setDoc(servDocRef, { list: services });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, 'settings/services');
      }

      // Save Gallery document
      const gallDocRef = doc(db, 'settings', 'gallery');
      try {
        await setDoc(gallDocRef, { photos: galleryPhotos, videos: galleryVideos });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, 'settings/gallery');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (e) {
      console.error('Error saving settings to Firestore:', e);
      alert('A apărut o eroare la salvare: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSaving(false);
    }
  };

  const updateServiceField = (index: number, field: string, value: any, langKey?: 'RO' | 'EN') => {
    const updated = [...services];
    if (langKey) {
      updated[index] = {
        ...updated[index],
        [field]: {
          ...updated[index][field as keyof Service] as Record<string, string>,
          [langKey]: value,
        },
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    }
    setServices(updated);
  };

  const addService = () => {
    const newService: Service = {
      id: 'service_' + Date.now(),
      name: { RO: 'Slujbă nouă', EN: 'New Service' },
      time: '18:00',
      day: { RO: 'Sâmbătă', EN: 'Saturday' },
      description: { RO: 'Descrierea slujbei noi.', EN: 'Description of the new service.' },
      type: 'special'
    };
    setServices([...services, newService]);
  };

  const deleteService = (index: number) => {
    if (confirm('Sigur doriți să ștergeți această slujbă?')) {
      const updated = services.filter((_, i) => i !== index);
      setServices(updated);
    }
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === services.length - 1) return;

    const updated = [...services];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setServices(updated);
  };

  const getYoutubeId = (url: string): string | null => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    } catch (e) {
      return null;
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img') as HTMLImageElement;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL('image/jpeg', 0.82);
          resolve(base64);
        };
        img.onerror = (e) => reject(e);
        img.src = event.target?.result as string;
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (galleryPhotos.length >= 20) {
      setGalleryStatus({ type: 'error', message: 'S-a atins limita maximă de 20 de fotografii parohiale. Ștergeți-le pe cele vechi.' });
      return;
    }

    try {
      setUploadingPhoto(true);
      setGalleryStatus({ type: '', message: '' });

      const compressedDataUrl = await compressImage(file);
      
      let finalUrl = '';
      try {
        const uniqueName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const photoRef = ref(storage, `gallery/${uniqueName}`);
        
        const res = await fetch(compressedDataUrl);
        const blob = await res.blob();
        
        const uploadResult = await uploadBytes(photoRef, blob);
        finalUrl = await getDownloadURL(uploadResult.ref);
      } catch (storageError) {
        console.warn('Fallback secure base64 compression applied due to firebase storage rule setup or limits:', storageError);
        finalUrl = compressedDataUrl;
      }

      const newPhoto: GalleryPhoto = {
        id: Date.now().toString(),
        url: finalUrl,
        caption: photoCaption.trim() || undefined,
        createdAt: Date.now()
      };

      setGalleryPhotos(prev => [...prev, newPhoto]);
      setPhotoCaption('');
      setGalleryStatus({ 
        type: 'success', 
        message: 'Fotografia a fost încărcată cu succes! Nu uitați să apăsați „Salvează toate modificările” în colțul din dreapta sus pentru confirmare.' 
      });
    } catch (err) {
      console.error('Error handling file upload:', err);
      setGalleryStatus({ type: 'error', message: 'Eroare la procesare: ' + (err instanceof Error ? err.message : String(err)) });
    } finally {
      setUploadingPhoto(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleAddPhotoByUrl = () => {
    if (!photoUrlInput) {
      setGalleryStatus({ type: 'error', message: 'Te rog adaugă un link URL valid.' });
      return;
    }
    if (galleryPhotos.length >= 20) {
      setGalleryStatus({ type: 'error', message: 'Limita maximă este de 20 de fotografii parohiale.' });
      return;
    }
    const newPhoto: GalleryPhoto = {
      id: Date.now().toString(),
      url: photoUrlInput.trim(),
      caption: photoCaption.trim() || undefined,
      createdAt: Date.now()
    };
    setGalleryPhotos(prev => [...prev, newPhoto]);
    setPhotoUrlInput('');
    setPhotoCaption('');
    setGalleryStatus({ type: 'success', message: 'Fotografia a fost adăugată prin URL! Nu uitați să salvați din panoul de sus.' });
  };

  const handleDeletePhoto = async (photo: GalleryPhoto) => {
    try {
      if (photo.url.includes('firebasestorage')) {
        try {
          const decodedUrl = decodeURIComponent(photo.url);
          const parts = decodedUrl.split('/o/');
          if (parts.length > 1) {
            const pathWithQuery = parts[1];
            const fullPath = pathWithQuery.split('?')[0];
            const fileRef = ref(storage, fullPath);
            await deleteObject(fileRef);
          }
        } catch (delErr) {
          console.warn('Storage delete warning:', delErr);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setGalleryPhotos(prev => prev.filter(p => p.id !== photo.id));
    setGalleryStatus({ type: 'success', message: 'Fotografia a fost ștearsă din listă. Salvează din panoul de sus.' });
  };

  const handleAddVideo = () => {
    if (!newVideoUrl) {
      setGalleryStatus({ type: 'error', message: 'Vă rugăm să introduceți link-ul video-ului de YouTube.' });
      return;
    }
    const yid = getYoutubeId(newVideoUrl);
    if (!yid) {
      setGalleryStatus({ type: 'error', message: 'Adresa video-ului nu pare să fie corectă. Fiți sigur că este un link valid spre YouTube (ex: https://www.youtube.com/watch?v=... sau https://youtu.be/...).' });
      return;
    }
    const cleanTitle = newVideoTitle.trim() || `Material Video - ${new Date().toLocaleDateString()}`;
    const newVideo: GalleryVideo = {
      id: Date.now().toString(),
      url: newVideoUrl.trim(),
      title: cleanTitle,
      createdAt: Date.now()
    };
    setGalleryVideos(prev => [...prev, newVideo]);
    setNewVideoUrl('');
    setNewVideoTitle('');
    setGalleryStatus({ type: 'success', message: 'Video adăugat cu succes! Apăsați butonul principal de salvare din colțul de sus.' });
  };

  const handleDeleteVideo = (id: string) => {
    setGalleryVideos(prev => prev.filter(v => v.id !== id));
    setGalleryStatus({ type: 'success', message: 'Video-ul a fost retras. Nu uitați să salvați modificările de sus.' });
  };

  const goBack = () => {
    window.location.hash = '';
    window.location.pathname = '/';
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4 selection:bg-gold-500/30 selection:text-gold-200">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#d4ab15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md bg-stone-950 border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl z-10"
        >
          {/* Altar Golden Cross header style */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-400 mb-4 shadow-[0_0_15px_rgba(212,171,21,0.2)]">
              <Lock size={24} />
            </div>
            <h1 className="font-display text-2xl font-semibold text-white tracking-tight uppercase text-center">
              Administrare Misiune
            </h1>
            <p className="font-serif text-stone-400 text-xs text-center mt-2 italic">
              Introduceți parola de acces pentru a edita programul sau anunțurile.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-mono text-stone-400 font-semibold mb-2">
                Parolă Acces (De ex. Scunthorpe)
              </label>
              <input
                type="password"
                placeholder="Introdu parola..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none transition-all duration-300 font-mono text-center tracking-widest"
                required
                autoFocus
              />
            </div>

            {errorMsg && (
              <div className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 border border-red-500/20 p-3 rounded-lg">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-stone-950 font-medium py-3 rounded-xl transition-all duration-350 cursor-pointer flex items-center justify-center space-x-2 shadow-[0_4px_15px_rgba(212,171,21,0.2)] font-display text-xs uppercase tracking-wider"
            >
              <span>Accesează Panoul</span>
              <Unlock size={14} />
            </button>
          </form>

          <button
            onClick={goBack}
            className="w-full mt-6 flex items-center justify-center space-x-2 text-stone-500 hover:text-stone-300 transition-colors text-xs font-mono tracking-wider uppercase cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Înapoi la Site</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-24 selection:bg-gold-500/30 selection:text-gold-200">
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#d4ab15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Top Header Controls Bar */}
      <header className="sticky top-0 bg-stone-950/95 border-b border-stone-850 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={goBack}
              className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-300 rounded-xl transition-all cursor-pointer"
              title="Înapoi la Site"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="font-display text-md sm:text-lg font-bold text-gold-400 tracking-tight uppercase">
                Panou Control Misiune
              </h1>
              <p className="font-serif text-[10px] text-stone-500 italic">
                Editează în timp real anunțul și programul slujbelor
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center space-x-1.5 text-xs text-green-400 bg-green-950/60 border border-green-500/30 px-3 py-2 rounded-xl"
              >
                <CheckCircle2 size={13} />
                <span>Modificări salvate!</span>
              </motion.div>
            )}

            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="bg-gold-500 hover:bg-gold-400 font-medium px-5 py-2.5 rounded-xl text-stone-950 transition-all cursor-pointer flex items-center space-x-2 text-xs uppercase tracking-wider disabled:opacity-50"
            >
              <Save size={14} />
              <span>{saving ? 'Se salvează în Cloud...' : 'Salvează modificări'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sm:hidden mb-6 flex items-center space-x-2 text-xs text-green-400 bg-green-950/60 border border-green-500/30 p-4 rounded-xl"
          >
            <CheckCircle2 size={15} />
            <span>Modificările au fost salvate pe serverul Firestore!</span>
          </motion.div>
        )}

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
            <p className="font-serif text-stone-400 italic text-sm">Se încarcă datele din baza de date Firestore...</p>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* ANNOUNCEMENT EDIT BLOCK */}
            <section className="bg-stone-900/60 border border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-stone-850">
                <div className="p-2.5 bg-amber-500/10 text-gold-400 border border-gold-500/20 rounded-xl">
                  <Megaphone size={18} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">Anunț Altar (Banner principal)</h2>
                  <p className="font-serif text-xs text-stone-400 italic">Afișat în partea de sus a sălii de calendar pentru enoriași</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Active Toggle Switch */}
                <div className="flex items-center justify-between p-4 bg-stone-950/50 border border-stone-850 rounded-xl">
                  <div>
                    <h4 className="font-display font-semibold text-sm text-stone-205">Activează Anunțul în Site</h4>
                    <p className="text-[11px] text-stone-500 font-serif italic mt-0.5">Bifează pentru ca anunțul să apară pe ecran, debifează pentru a-l ascunde.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={announcement.active}
                    onChange={(e) => setAnnouncement({ ...announcement, active: e.target.checked })}
                    className="w-5 h-5 accent-gold-500 rounded cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Romanian Column */}
                  <div className="space-y-4 bg-stone-950/30 p-4 rounded-2xl border border-stone-900">
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-semibold">Romanian</span>
                    
                    <div>
                      <label className="block text-xs text-stone-400 font-medium mb-1.5">Titlu Anunț (RO)</label>
                      <input
                        type="text"
                        value={announcement.roTitle}
                        onChange={(e) => setAnnouncement({ ...announcement, roTitle: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none"
                        placeholder="Ex: Schimbare de Program"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 font-medium mb-1.5">Text Anunț / Conținut (RO)</label>
                      <textarea
                        rows={3}
                        value={announcement.roText}
                        onChange={(e) => setAnnouncement({ ...announcement, roText: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none font-serif italic leading-relaxed"
                        placeholder="Conținutul anunțului în română..."
                      />
                    </div>
                  </div>

                  {/* English Column */}
                  <div className="space-y-4 bg-stone-950/30 p-4 rounded-2xl border border-stone-900">
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold">English</span>
                    
                    <div>
                      <label className="block text-xs text-stone-400 font-medium mb-1.5">Announcement Title (EN)</label>
                      <input
                        type="text"
                        value={announcement.enTitle}
                        onChange={(e) => setAnnouncement({ ...announcement, enTitle: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none"
                        placeholder="Ex: Schedule Update"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 font-medium mb-1.5">Announcement Message / Description (EN)</label>
                      <textarea
                        rows={3}
                        value={announcement.enText}
                        onChange={(e) => setAnnouncement({ ...announcement, enText: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none font-serif italic leading-relaxed"
                        placeholder="Announcement content in English..."
                      />
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SERVICES EDIT BLOCK */}
            <section className="bg-stone-900/60 border border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-stone-850">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-amber-500/10 text-gold-400 border border-gold-500/20 rounded-xl">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">Programul Sfintelor Slujbe</h2>
                    <p className="font-serif text-xs text-stone-400 italic">Ordine directă prin butoanele de mutare și editare completă</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addService}
                  className="bg-stone-850 hover:bg-stone-800 hover:text-gold-400 border border-stone-850 text-stone-300 font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-xs uppercase"
                >
                  <Plus size={14} />
                  <span>Adaugă Slujbă</span>
                </button>
              </div>

              {/* Liturgical Services List */}
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div 
                    key={service.id} 
                    className="relative bg-stone-950/80 border border-stone-850 hover:border-gold-500/25 p-5 sm:p-6 rounded-2xl transition-all duration-300"
                  >
                    
                    {/* Floating Tools Controls */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-stone-900/80 border border-stone-800 rounded-lg p-1 shadow-md">
                      <button
                        onClick={() => moveService(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 text-stone-400 hover:text-gold-400 disabled:opacity-20 cursor-pointer"
                        title="Mută mai Sus"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => moveService(index, 'down')}
                        disabled={index === services.length - 1}
                        className="p-1.5 text-stone-400 hover:text-gold-400 disabled:opacity-20 cursor-pointer"
                        title="Mută mai Jos"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <div className="w-[1px] h-4 bg-stone-800 mx-1" />
                      <button
                        onClick={() => deleteService(index)}
                        className="p-1.5 text-red-400 hover:text-red-500 cursor-pointer"
                        title="Șterge slujba"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* Left Icon decoration depending on service type */}
                    <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-4 bg-amber-500/5 max-w-max border border-gold-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                      <Clock size={11} />
                      <span>Slujba #{index + 1}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      {/* Ora */}
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-1">Ora slujbei</label>
                        <input
                          type="text"
                          value={service.time}
                          onChange={(e) => updateServiceField(index, 'time', e.target.value)}
                          className="w-full bg-stone-900 border border-stone-855 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                          placeholder="Ex: 09:00 sau duminica"
                        />
                      </div>

                      {/* Ziua RO */}
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-1">Ziua / Frecvența (RO)</label>
                        <input
                          type="text"
                          value={service.day.RO}
                          onChange={(e) => updateServiceField(index, 'day', e.target.value, 'RO')}
                          className="w-full bg-stone-900 border border-stone-855 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                          placeholder="Ex: În fiecare Duminică"
                        />
                      </div>

                      {/* Ziua EN */}
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-1">Day / Frequency (EN)</label>
                        <input
                          type="text"
                          value={service.day.EN}
                          onChange={(e) => updateServiceField(index, 'day', e.target.value, 'EN')}
                          className="w-full bg-stone-900 border border-stone-855 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                          placeholder="Ex: Every Sunday"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Name RO */}
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-1">Numele Slujbei (RO)</label>
                        <input
                          type="text"
                          value={service.name.RO}
                          onChange={(e) => updateServiceField(index, 'name', e.target.value, 'RO')}
                          className="w-full bg-stone-900 border border-stone-855 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs font-semibold text-stone-100 focus:outline-none"
                          placeholder="Numele în română..."
                        />
                      </div>

                      {/* Name EN */}
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-1">Service Name (EN)</label>
                        <input
                          type="text"
                          value={service.name.EN}
                          onChange={(e) => updateServiceField(index, 'name', e.target.value, 'EN')}
                          className="w-full bg-stone-900 border border-stone-855 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs font-semibold text-stone-100 focus:outline-none"
                          placeholder="Name in English..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* DescRO */}
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-1">Descriere / Detalii (RO)</label>
                        <textarea
                          rows={2}
                          value={service.description.RO}
                          onChange={(e) => updateServiceField(index, 'description', e.target.value, 'RO')}
                          className="w-full bg-stone-900 border border-stone-855 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-stone-300 focus:outline-none"
                          placeholder="Detalii liturgice în română..."
                        />
                      </div>

                      {/* DescEN */}
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-1">Description / Details (EN)</label>
                        <textarea
                          rows={2}
                          value={service.description.EN}
                          onChange={(e) => updateServiceField(index, 'description', e.target.value, 'EN')}
                          className="w-full bg-stone-900 border border-stone-855 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-stone-300 focus:outline-none"
                          placeholder="Liturgical details in English..."
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-stone-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-1">Tipul Slujbei (pentru stil primar / culori)</label>
                        <select
                          value={service.type}
                          onChange={(e) => updateServiceField(index, 'type', e.target.value)}
                          className="bg-stone-900 border border-stone-855 text-xs rounded-xl px-2.5 py-2 text-stone-200 focus:outline-none focus:border-gold-500 cursor-pointer"
                        >
                          <option value="liturgy">Sfânta Liturghie (Auriu / Gold)</option>
                          <option value="vespers">Vecernie (Indigo)</option>
                          <option value="sacrament">Sfânta Taină (Roșu / Crimson)</option>
                          <option value="special">Agapă / Slujbe specifice (Verde / Emerald)</option>
                        </select>
                      </div>
                    </div>

                  </div>
                ))}

                {services.length === 0 && (
                  <div className="text-center py-12 bg-stone-950/40 border border-stone-900 rounded-2xl">
                    <p className="font-serif text-stone-500 text-xs italic">Nicio slujbă în listă. Faceți clic pe „Adaugă slujbă” mai sus.</p>
                  </div>
                )}
              </div>
            </section>

            {/* GALLERY MANAGEMENT SECTION */}
            <section className="bg-stone-900/60 border border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm mt-8">
              <div className="mb-6 pb-4 border-b border-stone-850">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-amber-500/10 text-gold-400 border border-gold-500/20 rounded-xl">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">Administrare Galerie (Foto & Video)</h2>
                    <p className="font-serif text-xs text-stone-400 italic">Încărcați fotografii reprezentative și adăugați link-uri video YouTube pentru enoriași</p>
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              {galleryStatus.message && (
                <div className={`p-4 rounded-xl text-xs mb-6 flex items-start space-x-2.5 border ${
                  galleryStatus.type === 'error' 
                    ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                    : 'bg-green-500/10 border-green-500/30 text-green-400'
                }`}>
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{galleryStatus.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* 1. Photos Column */}
                <div className="space-y-6">
                  <div className="bg-stone-950/40 border border-stone-900 p-5 rounded-2xl">
                    <h3 className="text-sm font-semibold text-stone-200 mb-2 flex items-center space-x-2">
                       <Upload size={14} className="text-gold-400" />
                      <span>Încărcare Fotografii ({galleryPhotos.length}/20)</span>
                    </h3>
                    <p className="text-[11px] text-stone-500 mb-4 leading-relaxed">
                      Selectați sau trageți fișiere de tip imagine. Sistemul le va redimensiona automat la dimensiuni optime (max 1000px) pentru a reduce încărcarea site-ului.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 font-medium mb-1.5 font-semibold">Descriere / Legendă Foto (opțional)</label>
                        <input
                          type="text"
                          value={photoCaption}
                          onChange={(e) => setPhotoCaption(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                          placeholder="Ex: Slujba Sfintei Liturghii, 2026..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        {/* File Upload Selector */}
                        <div className="relative">
                          <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-800 hover:border-gold-500/40 bg-stone-900/30 hover:bg-stone-900/60 rounded-xl p-4 cursor-pointer text-center group transition-all h-24">
                            {uploadingPhoto ? (
                              <>
                                <Loader2 size={20} className="text-gold-400 animate-spin mb-1.5" />
                                <span className="text-[11px] text-stone-400">Se încarcă...</span>
                              </>
                            ) : (
                              <>
                                <Upload size={18} className="text-stone-500 group-hover:text-gold-400 mb-1.5 transition-colors" />
                                <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Alege Fișier Direct</span>
                                <span className="text-[9px] text-stone-500 mt-0.5">JPEG, PNG</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              disabled={uploadingPhoto || galleryPhotos.length >= 20}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Paste URL Manual Fallback */}
                        <div className="border border-stone-850 bg-stone-900/10 p-3 rounded-xl space-y-2 h-26 flex flex-col justify-between">
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-stone-500 block leading-tight">Sau direct prin adresa web (URL)</span>
                          <input
                            type="text"
                            value={photoUrlInput}
                            onChange={(e) => setPhotoUrlInput(e.target.value)}
                            className="bg-stone-900 border border-stone-805 rounded-lg px-2 py-1 text-[10px] text-stone-100 focus:outline-none w-full"
                            placeholder="Adresa imaginii (https://...)"
                          />
                          <button
                            type="button"
                            onClick={handleAddPhotoByUrl}
                            disabled={galleryPhotos.length >= 20}
                            className="bg-amber-600 border border-stone-850 text-white font-semibold px-3 py-1 text-[10px] uppercase tracking-wider rounded-lg hover:opacity-90 w-full cursor-pointer shadow-sm"
                          >
                            Adaugă Link Foto
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* List of Photos */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold text-stone-400 flex items-center space-x-1.5">
                      <ImageIcon size={12} />
                      <span>Fotografii Existente ({galleryPhotos.length})</span>
                    </span>

                    {galleryPhotos.length === 0 ? (
                      <div className="text-center py-8 bg-stone-950/20 border border-stone-900 rounded-xl">
                        <p className="font-serif italic text-stone-500 text-xs text-center">Nicio fotografie adăugată încă.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                        {galleryPhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="relative aspect-video rounded-lg overflow-hidden border border-stone-850 group bg-stone-950"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption || 'Parish'}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            {photo.caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-stone-950/90 py-1 px-1.5 text-[9px] font-sans truncate text-stone-300">
                                {photo.caption}
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(photo)}
                              className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors shadow-md cursor-pointer"
                              title="Șterge fotografia"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Videos Column */}
                <div className="space-y-6">
                  <div className="bg-stone-950/40 border border-stone-900 p-5 rounded-2xl space-y-4">
                    <h3 className="text-sm font-semibold text-stone-200 mb-2 flex items-center space-x-2">
                      <VideoIcon size={14} className="text-gold-400" />
                      <span>Adăugare Material Video YouTube</span>
                    </h3>
                    
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 font-medium mb-1.5 font-semibold">Titlu Înregistrare Video</label>
                      <input
                        type="text"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none font-semibold"
                        placeholder="Ex: Slujba Sfintei Liturghii și Te Deum"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 font-medium mb-1.5 font-semibold">Link / URL YouTube (Unlisted/Public)</label>
                      <input
                        type="text"
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none font-semibold"
                        placeholder="Ex: https://www.youtube.com/watch?v=... sau https://youtu.be/..."
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddVideo}
                      className="bg-amber-600 border border-stone-850 hover:bg-amber-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-xs uppercase w-full shadow-md"
                    >
                      <Plus size={14} />
                      <span>Adaugă Legătură Video</span>
                    </button>
                  </div>

                  {/* List of Videos */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold text-stone-400 flex items-center space-x-1.5">
                      <VideoIcon size={12} />
                      <span>Videoclipuri Existente ({galleryVideos.length})</span>
                    </span>

                    {galleryVideos.length === 0 ? (
                      <div className="text-center py-8 bg-stone-950/20 border border-stone-900 rounded-xl">
                        <p className="font-serif italic text-stone-500 text-xs text-center">Niciun material video adăugat încă.</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                        {galleryVideos.map((video) => {
                          const yid = getYoutubeId(video.url);

                          return (
                            <div
                              key={video.id}
                              className="bg-stone-950/40 border border-stone-900 p-2 rounded-xl flex items-center justify-between gap-3 hover:border-stone-850 transition-all group"
                            >
                              <div className="flex items-center space-x-3 truncate">
                                <div className="relative aspect-video w-16 bg-stone-950 rounded overflow-hidden flex-shrink-0 flex items-center justify-center border border-stone-850">
                                  {yid ? (
                                    <img
                                      src={`https://img.youtube.com/vi/${yid}/default.jpg`}
                                      alt="Thumbnail"
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <VideoIcon size={12} className="text-stone-600" />
                                  )}
                                  <div className="absolute inset-0 bg-stone-950/20 flex items-center justify-center">
                                    <Play size={10} fill="currentColor" className="text-white" />
                                  </div>
                                </div>
                                <div className="truncate">
                                  <p className="text-xs font-semibold text-stone-200 select-all leading-tight truncate">{video.title}</p>
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[9px] text-stone-500 hover:text-gold-400 flex items-center space-x-1 mt-0.5 truncate"
                                  >
                                    <span className="truncate">{video.url}</span>
                                    <ExternalLink size={8} />
                                  </a>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeleteVideo(video.id)}
                                className="p-2 text-stone-500 hover:text-red-500 rounded-lg hover:bg-stone-900/40 transition-colors cursor-pointer"
                                title="Șterge video"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={goBack}
            className="inline-flex items-center space-x-2 text-stone-400 hover:text-gold-400 text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Înapoi la Site-ul Principal</span>
          </button>
        </div>

      </div>
    </div>
  );
}
