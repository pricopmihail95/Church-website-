import React, { useState, useEffect } from 'react';
import { Service, GalleryPhoto, GalleryVideo } from '../types';
import { fetchParishData, saveParishData } from '../lib/cloudinaryData';
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
  ExternalLink,
  Eye,
  EyeOff,
  RotateCcw,
  Moon,
  BookOpen,
  HeartHandshake
} from 'lucide-react';
import { motion } from 'motion/react';

interface AnnouncementData {
  roTitle: string;
  roText: string;
  enTitle: string;
  enText: string;
  active: boolean;
}

const SERVICE_PRESETS = [
  {
    id: 'vespers',
    name: { RO: 'Vecernia', EN: 'Vespers' },
    time: { RO: '18:00', EN: '18:00' },
    day: { RO: 'Sâmbătă Seara', EN: 'Saturday Evening' },
    description: {
      RO: 'Slujba de seară de sâmbătă prin care se intră în ziua Domnului, deschizând programul duminical.',
      EN: 'The traditional evening service on Saturdays opening the Lord\'s Day.'
    },
    type: 'vespers' as const
  },
  {
    id: 'matins',
    name: { RO: 'Utrenia (Slujba de Dimineață)', EN: 'Matins (Morning Service)' },
    time: { RO: '09:00', EN: '09:00' },
    day: { RO: 'În fiecare Duminică', EN: 'Every Sunday' },
    description: {
      RO: 'Pregătirea duhovnicească a inimilor prin laude de dimineață înaintea Sfintei Liturghii.',
      EN: 'The beautiful morning service of praise and preparation preceding the Holy Liturgy.'
    },
    type: 'liturgy' as const
  },
  {
    id: 'liturgy',
    name: { RO: 'Sfânta și Dumnezeiasca Liturghie', EN: 'The Holy Liturgy' },
    time: { RO: '10:00', EN: '10:00' },
    day: { RO: 'În fiecare Duminică', EN: 'Every Sunday' },
    description: {
      RO: 'Sfânta Jertfă Euharistică, inima comunității noastre. Săvârșită în limba engleză.',
      EN: 'Our central Eucharistic worship. English language service - all are welcome to pray with us.'
    },
    type: 'liturgy' as const
  },
  {
    id: 'refreshments',
    name: { RO: 'Agapa Frățească (Gustare / Socializare)', EN: 'Refreshments for All' },
    time: { RO: '12:00', EN: '12:00' },
    day: { RO: 'În fiecare Duminică', EN: 'Every Sunday' },
    description: {
      RO: 'Fiecare este binevenit să aducă alimente pentru a fi binecuvântate și împărtășite împreună la agapă.',
      EN: 'We gather after Liturgy. All are welcome to bring food to be Blessed and shared!'
    },
    type: 'special' as const
  }
];

const safeConfirm = (message: string): boolean => {
  try {
    return window.confirm(message);
  } catch (e) {
    console.warn("window.confirm blocked in sandboxed iframe, auto-confirming.", e);
    return true;
  }
};

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  // Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);

  // Live Preview State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Load from Cloudinary/localStorage
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchParishData();
      
      setAnnouncement(data.announcement);
      setServices(data.services);
      setGalleryPhotos(data.galleryPhotos);
      setGalleryVideos(data.galleryVideos);
    } catch (e) {
      console.error('Error loading parish settings:', e);
      setServices(SERVICES_SCHEDULING);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

      const success = await saveParishData({
        announcement,
        services,
        galleryPhotos,
        galleryVideos
      });

      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        alert('Eroare la salvarea în Cloud (Cloudinary)! Datele au fost salvate doar local în browser pentru moment.');
      }
    } catch (e) {
      console.error('Error saving settings to Cloudinary:', e);
      alert('A apărut o eroare la salvare: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSaving(false);
    }
  };

  const getFieldVal = (field: any, langKey: 'RO' | 'EN'): string => {
    if (!field) return '';
    if (typeof field === 'object') {
      return field[langKey] || '';
    }
    return String(field);
  };

  const updateServiceField = (index: number, field: string, value: any, langKey?: 'RO' | 'EN') => {
    const updated = [...services];
    if (langKey) {
      const currentVal = updated[index][field as keyof Service];
      let fieldObj: Record<string, string> = { RO: '', EN: '' };
      
      if (typeof currentVal === 'object' && currentVal !== null) {
        fieldObj = { ...currentVal as any };
      } else if (typeof currentVal === 'string') {
        fieldObj = { RO: currentVal, EN: currentVal };
      }
      
      fieldObj[langKey] = value;
      
      updated[index] = {
        ...updated[index],
        [field]: fieldObj,
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    }
    setServices(updated);
  };

  const wipeService = (index: number) => {
    const updated = [...services];
    updated[index] = {
      ...updated[index],
      name: { RO: '', EN: '' },
      time: { RO: '', EN: '' },
      day: { RO: '', EN: '' },
      description: { RO: '', EN: '' }
    };
    setServices(updated);
  };

  const applyPreset = (index: number, presetId: string) => {
    const preset = SERVICE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    const updated = [...services];
    updated[index] = {
      ...updated[index],
      name: { ...preset.name },
      time: { ...preset.time },
      day: { ...preset.day },
      description: { ...preset.description },
      type: preset.type
    };
    setServices(updated);
  };

  const addService = () => {
    const newService: Service = {
      id: 'service_' + Date.now(),
      name: { RO: 'Slujbă nouă', EN: 'New Service' },
      time: { RO: '18:00', EN: '18:00' },
      day: { RO: 'Sâmbătă', EN: 'Saturday' },
      description: { RO: 'Descrierea slujbei noi.', EN: 'Description of the new service.' },
      type: 'special'
    };
    setServices([...services, newService]);
  };

  const deleteService = (index: number) => {
    if (safeConfirm('Sigur doriți să ștergeți această slujbă?')) {
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
        const res = await fetch(compressedDataUrl);
        const blob = await res.blob();
        
        const formData = new FormData();
        formData.append('file', blob, file.name);
        formData.append('upload_preset', 'preset_biserica');
        
        const response = await fetch('https://api.cloudinary.com/v1_1/da4ywersp/image/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Cloudinary upload failed: ${response.statusText}`);
        }
        
        const data = await response.json();
        finalUrl = data.secure_url;
      } catch (uploadError) {
        console.warn('Cloudinary upload failed, falling back to local base64 compression:', uploadError);
        finalUrl = compressedDataUrl;
      }

      const newPhoto: GalleryPhoto = {
        id: Date.now().toString(),
        url: finalUrl,
        caption: photoCaption.trim() || undefined,
        createdAt: Date.now()
      };

      const updatedPhotos = [...galleryPhotos, newPhoto];
      setGalleryPhotos(updatedPhotos);
      localStorage.setItem('parish_gallery_photos', JSON.stringify(updatedPhotos));
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
    
    const updatedPhotos = [...galleryPhotos, newPhoto];
    setGalleryPhotos(updatedPhotos);
    localStorage.setItem('parish_gallery_photos', JSON.stringify(updatedPhotos));
    setPhotoUrlInput('');
    setPhotoCaption('');
    setGalleryStatus({ type: 'success', message: 'Fotografia a fost adăugată prin URL! Nu uitați să salvați din panoul de sus.' });
  };

  const handleDeletePhoto = (photo: GalleryPhoto) => {
    const updatedPhotos = galleryPhotos.filter(p => p.id !== photo.id);
    setGalleryPhotos(updatedPhotos);
    localStorage.setItem('parish_gallery_photos', JSON.stringify(updatedPhotos));
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
      <div className="min-h-screen bg-byz-blue-950 flex items-center justify-center p-4 selection:bg-gold-500/30 selection:text-gold-200">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#d4ab15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md bg-byz-blue-900 border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl z-10"
        >
          {/* Altar Golden Cross header style */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-400 mb-4 shadow-[0_0_15px_rgba(212,171,21,0.2)]">
              <Lock size={24} />
            </div>
            <h1 className="font-display text-2xl font-semibold text-white tracking-wider uppercase text-center">
              Administrare Misiune
            </h1>
            <p className="font-serif text-byz-blue-200 text-xs text-center mt-2 italic">
              Introduceți parola de acces pentru a edita programul sau anunțurile.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-mono text-byz-blue-300 font-semibold mb-2">
                Parolă Acces (De ex. Scunthorpe)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Introdu parola..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500 rounded-xl pl-4 pr-12 py-3 text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none transition-all duration-300 font-mono text-center tracking-widest"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-byz-blue-400 hover:text-byz-blue-200 transition-colors cursor-pointer"
                  title={showPassword ? "Ascunde parola" : "Arată parola"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 border border-red-500/20 p-3 rounded-lg">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-byz-blue-950 font-semibold py-3 rounded-xl transition-all duration-350 cursor-pointer flex items-center justify-center space-x-2 shadow-[0_4px_15px_rgba(212,171,21,0.2)] font-display text-xs uppercase tracking-wider"
            >
              <span>Accesează Panoul</span>
              <Unlock size={14} />
            </button>
          </form>

          <button
            onClick={goBack}
            className="w-full mt-6 flex items-center justify-center space-x-2 text-byz-blue-400 hover:text-byz-blue-200 transition-colors text-xs font-mono tracking-wider uppercase cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Înapoi la Site</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-byz-blue-950 text-byz-blue-100 pb-24 selection:bg-gold-500/30 selection:text-gold-200">
      <div className="absolute inset-0 z-0 opacity-[0.04] bg-[radial-gradient(#d4ab15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Top Header Controls Bar */}
      <header className="sticky top-0 bg-byz-blue-950/95 border-b border-byz-blue-800/40 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={goBack}
              className="p-2 bg-byz-blue-900 hover:bg-byz-blue-800 border border-byz-blue-800 hover:border-gold-500/30 text-byz-blue-100 rounded-xl transition-all cursor-pointer"
              title="Înapoi la Site"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="font-display text-md sm:text-lg font-bold text-gold-400 tracking-wider uppercase">
                Panou Control Misiune
              </h1>
              <p className="font-serif text-[10px] text-byz-blue-300 italic">
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
              onClick={() => {
                if (safeConfirm('Sigur doriți să anulați toate modificările nesalvate și să reîncărcați datele din Cloud?')) {
                  loadData();
                }
              }}
              disabled={saving || loading}
              className="bg-byz-blue-900 hover:bg-byz-blue-850 border border-byz-blue-800 text-byz-blue-100 font-medium px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 text-xs uppercase disabled:opacity-50"
              title="Anulează modificările nesalvate"
            >
              <RotateCcw size={14} />
              <span className="hidden md:inline">Anulează Modificări</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="bg-gold-500 hover:bg-gold-400 font-medium px-5 py-2.5 rounded-xl text-byz-blue-950 transition-all cursor-pointer flex items-center space-x-2 text-xs uppercase tracking-wider disabled:opacity-50"
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
            <p className="font-serif text-byz-blue-300 italic text-sm">Se încarcă datele din baza de date Firestore...</p>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* REAL-TIME PREVIEW SECTION */}
            <section className="bg-byz-blue-900/30 border border-byz-blue-800/40 rounded-3xl overflow-hidden transition-all duration-300">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                className="w-full flex items-center justify-between p-5 sm:p-6 bg-byz-blue-900/60 hover:bg-byz-blue-900/80 hover:text-gold-400 text-byz-blue-100 font-display font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer border-b border-byz-blue-800/40"
              >
                <div className="flex items-center space-x-2.5">
                  <Sparkles size={16} className="text-gold-400 animate-pulse" />
                  <span>Previzualizare în timp real (Sinergie directă cu Pagina Publică)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-byz-blue-300 font-normal normal-case">
                  <span>{isPreviewOpen ? 'Ascunde previzualizarea' : 'Afișează previzualizarea'}</span>
                  {isPreviewOpen ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                </div>
              </button>

              {isPreviewOpen && (
                <div className="p-6 sm:p-8 bg-byz-blue-950/95 space-y-8 animate-fade-in">
                  <p className="text-xs text-byz-blue-300 font-serif italic mb-2">
                    * Această secțiune simulează felul în care vor arăta anunțul și slujbele pe pagina principală a site-ului cu modificările curente (chiar și cele nesalvate).
                  </p>

                  {/* Simulated Announcement Banner */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-byz-blue-400 block font-semibold">1. Simulare Banner Anunț Altar (Partea de Sus a Site-ului):</span>
                    {announcement.active ? (
                      <div className="bg-gradient-to-r from-gold-950/25 via-gold-500/15 to-gold-950/25 border border-gold-500/35 rounded-xl p-4 flex items-center space-x-3">
                        <div className="p-1.5 bg-gold-500/15 text-gold-400 border border-gold-500/20 rounded-lg animate-pulse flex-shrink-0">
                          <Megaphone size={14} />
                        </div>
                        <div className="text-xs sm:text-sm leading-relaxed">
                          <span className="font-display font-bold text-gold-200 uppercase tracking-wider mr-2">
                            {announcement.roTitle}:
                          </span>
                          <span className="font-serif italic text-byz-blue-100">
                            {announcement.roText}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-byz-blue-800/30 bg-byz-blue-900/10 rounded-xl p-4 text-center">
                        <p className="text-xs text-byz-blue-400 font-serif italic">Bannerul de anunțuri este dezactivat în acest moment.</p>
                      </div>
                    )}
                  </div>

                  {/* Simulated Liturgical Calendar Cards */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-byz-blue-400 block font-semibold">2. Simulare Carduri Slujbe de Bază (Sinergie 1-la-1 cu Pagina Principală):</span>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Romanian Card Preview */}
                      <div className="bg-byz-blue-900/40 border border-byz-blue-100/10 dark:border-byz-blue-900/60 rounded-3xl p-6 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.05),transparent_70%) pointer-events-none" />
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-byz-blue-900/80">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-gold-400 bg-byz-blue-950 px-2.5 py-1 rounded-full border border-byz-blue-900">
                            Română / RO
                          </span>
                          <div className="p-1.5 rounded-lg bg-byz-blue-950 text-gold-400 border border-byz-blue-900">
                            <Calendar size={12} />
                          </div>
                        </div>
                        <h3 className="font-display text-base font-semibold text-gold-100 mb-5">Programul Slujbelor</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            {/* Vespers Slot */}
                            {services.find((s) => s.id === 'vespers' || s.type === 'vespers' || getFieldVal(s.name, 'RO').toLowerCase().includes('vecern')) ? (
                              (() => {
                                const s = services.find((s) => s.id === 'vespers' || s.type === 'vespers' || getFieldVal(s.name, 'RO').toLowerCase().includes('vecern'))!;
                                return (
                                  <div className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                    <span className="font-semibold text-white">{getFieldVal(s.day, 'RO')}:</span>
                                    <span className="text-right text-byz-blue-300 font-mono text-[11px] font-semibold">
                                      {getFieldVal(s.time, 'RO')} - {getFieldVal(s.name, 'RO')}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="text-[10px] text-byz-blue-400 italic border-b border-dashed border-byz-blue-900 pb-2">Vesper-ul (Vecernia de sâmbătă) este retrasă</div>
                            )}

                            {/* Matins Slot */}
                            {services.find((s) => s.id === 'matins' || getFieldVal(s.name, 'RO').toLowerCase().includes('utreni')) ? (
                              (() => {
                                const s = services.find((s) => s.id === 'matins' || getFieldVal(s.name, 'RO').toLowerCase().includes('utreni'))!;
                                return (
                                  <div className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                    <span className="font-semibold text-white">{getFieldVal(s.day, 'RO')}:</span>
                                    <span className="text-right text-byz-blue-300 font-mono text-[11px] font-semibold">
                                      {getFieldVal(s.time, 'RO')} - {getFieldVal(s.name, 'RO')}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="text-[10px] text-byz-blue-400 italic border-b border-dashed border-byz-blue-900 pb-2">Utrenia (Duminică Dimineață) este retrasă</div>
                            )}
                          </div>

                          <div className="space-y-4">
                            {/* Liturgy Slot */}
                            {services.find((s) => s.id === 'liturgy' || s.type === 'liturgy' || getFieldVal(s.name, 'RO').toLowerCase().includes('liturgh')) ? (
                              (() => {
                                const s = services.find((s) => s.id === 'liturgy' || s.type === 'liturgy' || getFieldVal(s.name, 'RO').toLowerCase().includes('liturgh'))!;
                                return (
                                  <div className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                    <span className="font-semibold text-white">{getFieldVal(s.day, 'RO')}:</span>
                                    <span className="text-right text-byz-blue-300 font-mono text-[11px] font-semibold">
                                      {getFieldVal(s.time, 'RO')} - {getFieldVal(s.name, 'RO')}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="text-[10px] text-byz-blue-400 italic border-b border-dashed border-byz-blue-900 pb-2">Sfânta Liturghie este retrasă</div>
                            )}

                            {/* Refreshments Slot */}
                            {services.find((s) => s.id === 'refreshments' || getFieldVal(s.name, 'RO').toLowerCase().includes('agap') || getFieldVal(s.name, 'RO').toLowerCase().includes('tratat')) ? (
                              (() => {
                                const s = services.find((s) => s.id === 'refreshments' || getFieldVal(s.name, 'RO').toLowerCase().includes('agap') || getFieldVal(s.name, 'RO').toLowerCase().includes('tratat'))!;
                                return (
                                  <div className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                    <span className="font-semibold text-white">{getFieldVal(s.day, 'RO')}:</span>
                                    <span className="text-right text-byz-blue-300 font-mono text-[11px] font-semibold">
                                      {getFieldVal(s.time, 'RO')} - {getFieldVal(s.name, 'RO')}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="text-[10px] text-byz-blue-400 italic border-b border-dashed border-byz-blue-900 pb-2">Agape / Refreshments retras</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* English Card Preview */}
                      <div className="bg-byz-blue-900/40 border border-byz-blue-100/10 dark:border-byz-blue-900/60 rounded-3xl p-6 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.05),transparent_70%) pointer-events-none" />
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-byz-blue-900/80">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-gold-400 bg-byz-blue-950 px-2.5 py-1 rounded-full border border-byz-blue-900">
                            English / EN
                          </span>
                          <div className="p-1.5 rounded-lg bg-byz-blue-950 text-gold-400 border border-byz-blue-900">
                            <Calendar size={12} />
                          </div>
                        </div>
                        <h3 className="font-display text-base font-semibold text-gold-100 mb-5">Schedule of Services</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            {/* Vespers Slot */}
                            {services.find((s) => s.id === 'vespers' || s.type === 'vespers' || getFieldVal(s.name, 'RO').toLowerCase().includes('vecern')) ? (
                              (() => {
                                const s = services.find((s) => s.id === 'vespers' || s.type === 'vespers' || getFieldVal(s.name, 'RO').toLowerCase().includes('vecern'))!;
                                return (
                                  <div className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                    <span className="font-semibold text-white">{getFieldVal(s.day, 'EN')}:</span>
                                    <span className="text-right text-byz-blue-300 font-mono text-[11px] font-semibold">
                                      {getFieldVal(s.time, 'EN')} - {getFieldVal(s.name, 'EN')}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="text-[10px] text-byz-blue-400 italic border-b border-dashed border-byz-blue-900 pb-2">Saturday Evening Vespers is removed</div>
                            )}

                            {/* Matins Slot */}
                            {services.find((s) => s.id === 'matins' || getFieldVal(s.name, 'RO').toLowerCase().includes('utreni')) ? (
                              (() => {
                                const s = services.find((s) => s.id === 'matins' || getFieldVal(s.name, 'RO').toLowerCase().includes('utreni'))!;
                                return (
                                  <div className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                    <span className="font-semibold text-white">{getFieldVal(s.day, 'EN')}:</span>
                                    <span className="text-right text-byz-blue-300 font-mono text-[11px] font-semibold">
                                      {getFieldVal(s.time, 'EN')} - {getFieldVal(s.name, 'EN')}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="text-[10px] text-byz-blue-400 italic border-b border-dashed border-byz-blue-900 pb-2">Sunday Morning Matins is removed</div>
                            )}
                          </div>

                          <div className="space-y-4">
                            {/* Liturgy Slot */}
                            {services.find((s) => s.id === 'liturgy' || s.type === 'liturgy' || getFieldVal(s.name, 'RO').toLowerCase().includes('liturgh')) ? (
                              (() => {
                                const s = services.find((s) => s.id === 'liturgy' || s.type === 'liturgy' || getFieldVal(s.name, 'RO').toLowerCase().includes('liturgh'))!;
                                return (
                                  <div className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                    <span className="font-semibold text-white">{getFieldVal(s.day, 'EN')}:</span>
                                    <span className="text-right text-byz-blue-300 font-mono text-[11px] font-semibold">
                                      {getFieldVal(s.time, 'EN')} - {getFieldVal(s.name, 'EN')}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="text-[10px] text-byz-blue-400 italic border-b border-dashed border-byz-blue-900 pb-2">Divine Liturgy is removed</div>
                            )}

                            {/* Refreshments Slot */}
                            {services.find((s) => s.id === 'refreshments' || getFieldVal(s.name, 'RO').toLowerCase().includes('agap') || getFieldVal(s.name, 'RO').toLowerCase().includes('tratat')) ? (
                              (() => {
                                const s = services.find((s) => s.id === 'refreshments' || getFieldVal(s.name, 'RO').toLowerCase().includes('agap') || getFieldVal(s.name, 'RO').toLowerCase().includes('tratat'))!;
                                return (
                                  <div className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                    <span className="font-semibold text-white">{getFieldVal(s.day, 'EN')}:</span>
                                    <span className="text-right text-byz-blue-300 font-mono text-[11px] font-semibold">
                                      {getFieldVal(s.time, 'EN')} - {getFieldVal(s.name, 'EN')}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="text-[10px] text-byz-blue-400 italic border-b border-dashed border-byz-blue-900 pb-2">Agape / Refreshments is removed</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* ANNOUNCEMENT EDIT BLOCK */}
            <section className="bg-byz-blue-900/40 border border-byz-blue-800/40 p-6 sm:p-8 rounded-3xl shadow-md animate-fade-in">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-byz-blue-800/40">
                <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl">
                  <Megaphone size={18} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">Anunț Altar (Banner principal)</h2>
                  <p className="font-serif text-xs text-byz-blue-300 italic">Afișat în partea de sus a sălii de calendar pentru enoriași</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Active Toggle Switch */}
                <div className="flex items-center justify-between p-4 bg-byz-blue-950/50 border border-byz-blue-800/40 rounded-xl">
                  <div>
                    <h4 className="font-display font-semibold text-sm text-byz-blue-100">Activează Anunțul în Site</h4>
                    <p className="text-[11px] text-byz-blue-400 font-serif italic mt-0.5">Bifează pentru ca anunțul să apară pe ecran, debifează pentru a-l ascunde.</p>
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
                  <div className="space-y-4 bg-byz-blue-950/30 p-4 rounded-2xl border border-byz-blue-900/50">
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-semibold">Romanian</span>
                    
                    <div>
                      <label className="block text-xs text-byz-blue-200 font-medium mb-1.5 font-sans">Titlu Anunț (RO)</label>
                      <input
                        type="text"
                        value={announcement.roTitle}
                        onChange={(e) => setAnnouncement({ ...announcement, roTitle: e.target.value })}
                        className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none"
                        placeholder="Ex: Schimbare de Program"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-byz-blue-200 font-medium mb-1.5 font-sans">Text Anunț / Conținut (RO)</label>
                      <textarea
                        rows={3}
                        value={announcement.roText}
                        onChange={(e) => setAnnouncement({ ...announcement, roText: e.target.value })}
                        className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none font-serif italic leading-relaxed"
                        placeholder="Conținutul anunțului în română..."
                      />
                    </div>
                  </div>

                  {/* English Column */}
                  <div className="space-y-4 bg-byz-blue-950/30 p-4 rounded-2xl border border-byz-blue-900/50">
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-byz-blue-500/15 text-byz-blue-300 border border-byz-blue-500/30 px-2 py-0.5 rounded-full font-semibold">English</span>
                    
                    <div>
                      <label className="block text-xs text-byz-blue-200 font-medium mb-1.5 font-sans">Announcement Title (EN)</label>
                      <input
                        type="text"
                        value={announcement.enTitle}
                        onChange={(e) => setAnnouncement({ ...announcement, enTitle: e.target.value })}
                        className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none"
                        placeholder="Ex: Schedule Update"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-byz-blue-200 font-medium mb-1.5 font-sans">Announcement Message / Description (EN)</label>
                      <textarea
                        rows={3}
                        value={announcement.enText}
                        onChange={(e) => setAnnouncement({ ...announcement, enText: e.target.value })}
                        className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none font-serif italic leading-relaxed"
                        placeholder="Announcement content in English..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SERVICES EDIT BLOCK */}
            <section className="bg-byz-blue-900/40 border border-byz-blue-800/40 p-6 sm:p-8 rounded-3xl shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-byz-blue-800/40">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">Programul Sfintelor Slujbe</h2>
                    <p className="font-serif text-xs text-byz-blue-300 italic">Administrează în timp real slots, zile și ore pentru enoriași</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (safeConfirm('Sigur doriți să resetați programul slujbelor la programul canonic implicit? Modificările nu sunt salvate permanent până când nu apăsați "Salvează modificări" din header.')) {
                        setServices(SERVICES_SCHEDULING);
                        setGalleryStatus({
                          type: 'success',
                          message: 'Programul slujbelor a fost resetat în memorie! Apăsați pe „Salvează modificări” din partea de sus a ecranului pentru a trimite în Cloud.'
                        });
                      }
                    }}
                    className="bg-byz-blue-950/80 hover:bg-byz-blue-900 text-byz-blue-300 hover:text-white border border-byz-blue-800 px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-xs uppercase"
                    title="Resetează programul la cel din fabrică"
                  >
                    <RotateCcw size={12} />
                    <span>Resetează la Implicite</span>
                  </button>

                  <button
                    type="button"
                    onClick={addService}
                    className="bg-byz-blue-950/90 hover:bg-byz-blue-900 hover:text-gold-400 border border-byz-blue-800 text-byz-blue-200 font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-xs uppercase"
                  >
                    <Plus size={14} />
                    <span>Adaugă Slujbă</span>
                  </button>
                </div>
              </div>

              {/* Informative Help Box */}
              <div className="bg-gradient-to-r from-gold-950/15 via-byz-blue-950/50 to-gold-950/15 border border-gold-500/20 p-4.5 rounded-2xl mb-8">
                <h4 className="text-xs uppercase font-display font-bold text-gold-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Sinergie Pagina Principală & Modul Sâmbătă</span>
                </h4>
                <p className="text-[11.5px] leading-relaxed text-byz-blue-200 font-serif italic">
                  * Pe pagina principală a site-ului, cele 4 sloturi de slujbe de bază (Vecernie, Utrenie, Sfânta Liturghie și Agapă/Tratații) sunt conectate în mod dinamic în funcție de prezența lor în listă.
                  <br />
                  * <span className="text-gold-300 font-semibold">Dacă nu aveți nevoie de Vecernia de sâmbătă</span>, puteți pur și simplu să o ștergeți sau să o dezactivați prin butonul de ștergere (🗑️) de pe slujba respectivă. Pentru a o reactiva, folosiți butonul „Adaugă slujbă” și asigurați-vă că tipul este setat pe „Vecernie”.
                </p>
              </div>

              {/* Liturgical Services List */}
              <div className="space-y-6">
                {services.map((service, index) => {
                  const isVespersSlot = service.id === 'vespers' || service.type === 'vespers' || getFieldVal(service.name, 'RO').toLowerCase().includes('vecern');
                  const isMatinsSlot = service.id === 'matins' || getFieldVal(service.name, 'RO').toLowerCase().includes('utreni');
                  const isLiturgySlot = service.id === 'liturgy' || service.type === 'liturgy' || getFieldVal(service.name, 'RO').toLowerCase().includes('liturgh');
                  const isRefreshmentsSlot = service.id === 'refreshments' || getFieldVal(service.name, 'RO').toLowerCase().includes('agap') || getFieldVal(service.name, 'RO').toLowerCase().includes('tratat');

                  return (
                    <div 
                      key={service.id} 
                      className="relative bg-byz-blue-950/60 border border-byz-blue-800/80 hover:border-gold-500/35 p-5 sm:p-6 rounded-2xl transition-all duration-300"
                    >
                      
                      {/* Floating Tools Controls */}
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-byz-blue-900 border border-byz-blue-850 rounded-lg p-1 shadow-md">
                        <button
                          onClick={() => moveService(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 text-byz-blue-300 hover:text-gold-400 disabled:opacity-20 cursor-pointer"
                          title="Mută mai Sus"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveService(index, 'down')}
                          disabled={index === services.length - 1}
                          className="p-1.5 text-byz-blue-300 hover:text-gold-400 disabled:opacity-20 cursor-pointer"
                          title="Mută mai Jos"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <div className="w-[1px] h-4 bg-byz-blue-800 mx-1" />
                        <button
                          onClick={() => deleteService(index)}
                          className="p-1.5 text-red-400 hover:text-red-500 cursor-pointer"
                          title="Șterge slujba"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Left Icon decoration depending on service type */}
                      <div className="flex flex-wrap gap-2 mb-5 pr-24">
                        <div className="flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2.5 py-1 rounded-full font-semibold">
                          <Clock size={11} />
                          <span>Slujba #{index + 1}</span>
                        </div>
                        
                        {isVespersSlot && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full font-bold">
                            <Moon size={10} className="animate-pulse" />
                            <span>Slot 1 pe Prima Pagină (Vecernie Sâmbătă)</span>
                          </div>
                        )}
                        {isMatinsSlot && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-sky-300 bg-sky-500/15 border border-sky-500/30 px-2.5 py-1 rounded-full font-bold">
                            <Clock size={10} />
                            <span>Slot 2 pe Prima Pagină (Utrenie Duminică)</span>
                          </div>
                        )}
                        {isLiturgySlot && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-gold-300 bg-gold-500/15 border border-gold-500/30 px-2.5 py-1 rounded-full font-bold">
                            <Sparkles size={10} className="animate-pulse" />
                            <span>Slot 3 pe Prima Pagină (Sfânta Liturghie)</span>
                          </div>
                        )}
                        {isRefreshmentsSlot && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                            <HeartHandshake size={10} />
                            <span>Slot 4 pe Prima Pagină (Agapă / Tratații)</span>
                          </div>
                        )}
                      </div>

                      {/* Presets and Wipe Actions Bar */}
                      <div className="mb-5 p-3.5 bg-byz-blue-900/40 border border-byz-blue-800/60 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="text-[10px] uppercase font-mono tracking-wider text-byz-blue-300 font-bold">
                            Încarcă Model (Preset):
                          </label>
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                applyPreset(index, e.target.value);
                                e.target.value = ""; // reset selection
                              }
                            }}
                            defaultValue=""
                            className="bg-byz-blue-950 border border-byz-blue-800 focus:border-gold-500 rounded-lg px-2.5 py-1 text-xs text-byz-blue-100 cursor-pointer focus:outline-none"
                          >
                            <option value="">-- Alege un Model --</option>
                            <option value="vespers">Vecernie (Saturday Vespers)</option>
                            <option value="matins">Utrenie (Sunday Matins)</option>
                            <option value="liturgy">Sfânta Liturghie (Divine Liturgy)</option>
                            <option value="refreshments">Agapă / Gustare (Refreshments for All)</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (safeConfirm('Sigur doriți să GOLIȚI complet toate datele acestui slot? Aceasta va șterge textul, dar va păstra slotul în listă pentru a-l edita manual.')) {
                              wipeService(index);
                            }
                          }}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 px-3 py-1 rounded-lg transition-all text-xs font-mono font-semibold flex items-center justify-center space-x-1 cursor-pointer"
                          title="Golește textul din toate câmpurile acestui slot"
                        >
                          <Trash2 size={11} />
                          <span>Golește Slotul (Wipe)</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* Ora (RO) */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Ora slujbei (RO)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.time, 'RO')}
                            onChange={(e) => updateServiceField(index, 'time', e.target.value, 'RO')}
                            className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-100 focus:outline-none"
                            placeholder="Ex: 09:00 sau duminică"
                          />
                        </div>

                        {/* Ora (EN) */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Time of service (EN)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.time, 'EN')}
                            onChange={(e) => updateServiceField(index, 'time', e.target.value, 'EN')}
                            className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-100 focus:outline-none"
                            placeholder="Ex: 09:00 or Sunday"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* Ziua RO */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Ziua / Frecvența (RO)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.day, 'RO')}
                            onChange={(e) => updateServiceField(index, 'day', e.target.value, 'RO')}
                            className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-100 focus:outline-none"
                            placeholder="Ex: În fiecare Duminică"
                          />
                        </div>

                        {/* Ziua EN */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Day / Frequency (EN)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.day, 'EN')}
                            onChange={(e) => updateServiceField(index, 'day', e.target.value, 'EN')}
                            className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-100 focus:outline-none"
                            placeholder="Ex: Every Sunday"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Name RO */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Numele Slujbei (RO)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.name, 'RO')}
                            onChange={(e) => updateServiceField(index, 'name', e.target.value, 'RO')}
                            className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs font-semibold text-byz-blue-100 focus:outline-none"
                            placeholder="Numele în română..."
                          />
                        </div>

                        {/* Name EN */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Service Name (EN)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.name, 'EN')}
                            onChange={(e) => updateServiceField(index, 'name', e.target.value, 'EN')}
                            className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs font-semibold text-byz-blue-100 focus:outline-none"
                            placeholder="Name in English..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* DescRO */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Descriere / Detalii (RO)</label>
                          <textarea
                            rows={2}
                            value={getFieldVal(service.description, 'RO')}
                            onChange={(e) => updateServiceField(index, 'description', e.target.value, 'RO')}
                            className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-200 focus:outline-none"
                            placeholder="Detalii liturgice în română..."
                          />
                        </div>

                        {/* DescEN */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Description / Details (EN)</label>
                          <textarea
                            rows={2}
                            value={getFieldVal(service.description, 'EN')}
                            onChange={(e) => updateServiceField(index, 'description', e.target.value, 'EN')}
                            className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-200 focus:outline-none"
                            placeholder="Liturgical details in English..."
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-byz-blue-800/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Tipul Slujbei (pentru stil primar / culori)</label>
                          <select
                            value={service.type}
                            onChange={(e) => updateServiceField(index, 'type', e.target.value)}
                            className="bg-byz-blue-950 border border-byz-blue-850 text-xs rounded-xl px-2.5 py-2 text-byz-blue-100 focus:outline-none focus:border-gold-500 cursor-pointer"
                          >
                            <option value="liturgy">Sfânta Liturghie (Auriu / Gold)</option>
                            <option value="vespers">Vecernie (Indigo)</option>
                            <option value="sacrament">Sfânta Taină (Roșu / Crimson)</option>
                            <option value="special">Agapă / Slujbe specifice (Verde / Emerald)</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  );
                })}

                {services.length === 0 && (
                  <div className="text-center py-12 bg-byz-blue-950/40 border border-byz-blue-900 rounded-2xl">
                    <p className="font-serif text-byz-blue-400 text-xs italic">Nicio slujbă în listă. Faceți clic pe „Adaugă slujbă” mai sus.</p>
                  </div>
                )}
              </div>
            </section>

            {/* GALLERY MANAGEMENT SECTION */}
            <section className="bg-byz-blue-900/40 border border-byz-blue-800/40 p-6 sm:p-8 rounded-3xl shadow-md mt-8">
              <div className="mb-6 pb-4 border-b border-byz-blue-800/40">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">Administrare Galerie (Foto & Video)</h2>
                    <p className="font-serif text-xs text-byz-blue-300 italic">Încărcați fotografii reprezentative și adăugați link-uri video YouTube pentru enoriași</p>
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
                  <div className="bg-byz-blue-950/40 border border-byz-blue-900 p-5 rounded-2xl">
                    <h3 className="text-sm font-semibold text-byz-blue-100 mb-2 flex items-center space-x-2">
                       <Upload size={14} className="text-gold-400" />
                      <span>Încărcare Fotografii ({galleryPhotos.length}/20)</span>
                    </h3>
                    <p className="text-[11px] text-byz-blue-400 mb-4 leading-relaxed">
                      Selectați sau trageți fișiere de tip imagine. Sistemul le va redimensiona automat la dimensiuni optime (max 1000px) pentru a reduce încărcarea site-ului.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-byz-blue-300 font-medium mb-1.5 font-semibold">Descriere / Legendă Foto (opțional)</label>
                        <input
                          type="text"
                          value={photoCaption}
                          onChange={(e) => setPhotoCaption(e.target.value)}
                          className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none"
                          placeholder="Ex: Slujba Sfintei Liturghii, 2026..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        {/* File Upload Selector with Drag & Drop */}
                        <div className="relative">
                          <label 
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDragging(true);
                            }}
                            onDragLeave={(e) => {
                              e.preventDefault();
                              setIsDragging(false);
                            }}
                            onDrop={async (e) => {
                              e.preventDefault();
                              setIsDragging(false);
                              if (uploadingPhoto || galleryPhotos.length >= 20) return;
                              const file = e.dataTransfer.files?.[0];
                              if (file && file.type.startsWith('image/')) {
                                const artificialEvent = {
                                  target: {
                                    files: [file],
                                    value: ''
                                  }
                                } as unknown as React.ChangeEvent<HTMLInputElement>;
                                handleFileUpload(artificialEvent);
                              }
                            }}
                            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer text-center group transition-all h-24 ${
                              isDragging 
                                ? 'border-gold-500 bg-gold-500/10 scale-102 shadow-[0_0_15px_rgba(212,171,21,0.2)]' 
                                : 'border-byz-blue-800 hover:border-gold-500/40 bg-byz-blue-950/30 hover:bg-byz-blue-950/60'
                            }`}
                          >
                            {uploadingPhoto ? (
                              <>
                                <Loader2 size={20} className="text-gold-400 animate-spin mb-1.5" />
                                <span className="text-[11px] text-byz-blue-400">Se încarcă...</span>
                              </>
                            ) : (
                              <>
                                <Upload size={18} className={`mb-1.5 transition-colors ${isDragging ? 'text-gold-400 animate-bounce' : 'text-byz-blue-400 group-hover:text-gold-400'}`} />
                                <span className="text-[10px] text-byz-blue-300 font-semibold uppercase tracking-wider">
                                  {isDragging ? 'Dă drumul imaginii!' : 'Alege sau trage fișierul'}
                                </span>
                                <span className="text-[9px] text-byz-blue-500 mt-0.5">JPEG, PNG</span>
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
                        <div className="border border-byz-blue-800/60 bg-byz-blue-950/30 p-3 rounded-xl space-y-2 h-24 flex flex-col justify-between">
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-byz-blue-300 block leading-tight">Sau direct prin adresa web (URL)</span>
                          <input
                            type="text"
                            value={photoUrlInput}
                            onChange={(e) => setPhotoUrlInput(e.target.value)}
                            className="bg-byz-blue-950 border border-byz-blue-800 rounded-lg px-2 py-1 text-[10px] text-byz-blue-100 focus:outline-none w-full"
                            placeholder="Adresa imaginii (https://...)"
                          />
                          <button
                            type="button"
                            onClick={handleAddPhotoByUrl}
                            disabled={galleryPhotos.length >= 20}
                            className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 font-bold px-3 py-1 text-[10px] uppercase tracking-wider rounded-lg transition-colors w-full cursor-pointer shadow-sm"
                          >
                            Adaugă Link Foto
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* List of Photos */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold text-byz-blue-300 flex items-center space-x-1.5">
                      <ImageIcon size={12} />
                      <span>Fotografii Existente ({galleryPhotos.length})</span>
                    </span>

                    {galleryPhotos.length === 0 ? (
                      <div className="text-center py-8 bg-byz-blue-950/20 border border-byz-blue-900 rounded-xl">
                        <p className="font-serif italic text-byz-blue-400 text-xs text-center">Nicio fotografie adăugată încă.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                        {galleryPhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="relative aspect-video rounded-lg overflow-hidden border border-byz-blue-800/80 group bg-byz-blue-950"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption || 'Parish'}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            {photo.caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-byz-blue-950/90 py-1 px-1.5 text-[9px] font-sans truncate text-byz-blue-200">
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
                  <div className="bg-byz-blue-950/40 border border-byz-blue-900/80 p-5 rounded-2xl space-y-4">
                    <h3 className="text-sm font-semibold text-byz-blue-100 mb-2 flex items-center space-x-2">
                      <VideoIcon size={14} className="text-gold-400" />
                      <span>Adăugare Material Video YouTube</span>
                    </h3>
                    
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-byz-blue-300 font-medium mb-1.5 font-semibold">Titlu Înregistrare Video</label>
                      <input
                        type="text"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-100 focus:outline-none font-semibold"
                        placeholder="Ex: Slujba Sfintei Liturghii și Te Deum"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-byz-blue-300 font-medium mb-1.5 font-semibold">Link / URL YouTube (Unlisted/Public)</label>
                      <input
                        type="text"
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs text-byz-blue-100 focus:outline-none font-semibold"
                        placeholder="Ex: https://www.youtube.com/watch?v=... sau https://youtu.be/..."
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddVideo}
                      className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-xs uppercase w-full shadow-md"
                    >
                      <Plus size={14} />
                      <span>Adaugă Legătură Video</span>
                    </button>
                  </div>

                  {/* List of Videos */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold text-byz-blue-300 flex items-center space-x-1.5">
                      <VideoIcon size={12} />
                      <span>Videoclipuri Existente ({galleryVideos.length})</span>
                    </span>

                    {galleryVideos.length === 0 ? (
                      <div className="text-center py-8 bg-byz-blue-950/20 border border-byz-blue-900 rounded-xl">
                        <p className="font-serif italic text-byz-blue-400 text-xs text-center">Niciun material video adăugat încă.</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                        {galleryVideos.map((video) => {
                          const yid = getYoutubeId(video.url);

                          return (
                            <div
                              key={video.id}
                              className="bg-byz-blue-950/40 border border-byz-blue-800 p-2 rounded-xl flex items-center justify-between gap-3 hover:border-gold-500/30 transition-all group"
                            >
                              <div className="flex items-center space-x-3 truncate">
                                <div className="relative aspect-video w-16 bg-byz-blue-950 rounded overflow-hidden flex-shrink-0 flex items-center justify-center border border-byz-blue-800">
                                  {yid ? (
                                    <img
                                      src={`https://img.youtube.com/vi/${yid}/default.jpg`}
                                      alt="Thumbnail"
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <VideoIcon size={12} className="text-byz-blue-400" />
                                  )}
                                  <div className="absolute inset-0 bg-byz-blue-950/20 flex items-center justify-center">
                                    <Play size={10} fill="currentColor" className="text-white" />
                                  </div>
                                </div>
                                <div className="truncate">
                                  <p className="text-xs font-semibold text-byz-blue-100 select-all leading-tight truncate">{video.title}</p>
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[9px] text-byz-blue-400 hover:text-gold-400 flex items-center space-x-1 mt-0.5 truncate"
                                  >
                                    <span className="truncate">{video.url}</span>
                                    <ExternalLink size={8} />
                                  </a>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeleteVideo(video.id)}
                                className="p-2 text-byz-blue-400 hover:text-red-500 rounded-lg hover:bg-byz-blue-900/40 transition-colors cursor-pointer"
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
            className="inline-flex items-center space-x-2 text-byz-blue-400 hover:text-gold-400 text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Înapoi la Site-ul Principal</span>
          </button>
        </div>

      </div>
    </div>
  );
}
