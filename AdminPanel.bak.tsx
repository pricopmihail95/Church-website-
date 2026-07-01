import React, { useState, useEffect } from 'react';
import { Service, GalleryPhoto, GalleryVideo } from '../types';
import { fetchParishData, saveParishData } from '../lib/cloudinaryData';
import { storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
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
  Image as ImageIcon, ChevronDown, ChevronUp,
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
  Sun,
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
    day: { RO: 'Saturday Evening', EN: 'Saturday Evening' },
    description: {
      RO: "The Saturday evening service entering the Lord's day, opening the Sunday program.",
      EN: 'The traditional evening service on Saturdays opening the Lord\'s Day.'
    },
    type: 'vespers' as const
  },
  {
    id: 'matins',
    name: { RO: 'Matins (Morning Service)', EN: 'Matins (Morning Service)' },
    time: { RO: '09:00', EN: '09:00' },
    day: { RO: 'Every Sunday', EN: 'Every Sunday' },
    description: {
      RO: 'Spiritual preparation of hearts through morning praises before the Holy Liturgy.',
      EN: 'The beautiful morning service of praise and preparation preceding the Holy Liturgy.'
    },
    type: 'liturgy' as const
  },
  {
    id: 'liturgy',
    name: { RO: 'Holy and Divine Liturgy', EN: 'The Holy Liturgy' },
    time: { RO: '10:00', EN: '10:00' },
    day: { RO: 'Every Sunday', EN: 'Every Sunday' },
    description: {
      RO: 'The Holy Eucharistic Sacrifice, the heart of our community. Served in English.',
      EN: 'Our central Eucharistic worship. English language service - all are welcome to pray with us.'
    },
    type: 'liturgy' as const
  },
  {
    id: 'refreshments',
    name: { RO: 'Fellowship Agape (Snack / Socializing)', EN: 'Refreshments for All' },
    time: { RO: '12:00', EN: '12:00' },
    day: { RO: 'Every Sunday', EN: 'Every Sunday' },
    description: {
      RO: 'Everyone is welcome to bring food to be blessed and shared together at the agape.',
      EN: 'We gather after Liturgy. All are welcome to bring food to be Blessed and shared!'
    },
    type: 'special' as const
  }
];

const safeConfirm = (message: string): boolean => {
  if (typeof window !== 'undefined') {
    const isIframe = window.self !== window.top;
    if (isIframe) {
      console.warn("window.confirm bypassed in sandbox iframe, action auto-confirmed:", message);
      return true;
    }
    try {
      if (window.confirm) {
        return window.confirm(message);
      }
    } catch (e) {
      console.warn("window.confirm blocked or unavailable, auto-confirming.", e);
      return true;
    }
  }
  return true;
};

export default function AdminPanel({ darkMode, setDarkMode }: { darkMode?: boolean, setDarkMode?: (val: boolean) => void }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Data States
  const [announcement, setAnnouncement] = useState<AnnouncementData>({
    roTitle: 'Important Announcement',
    roText: 'Our Sunday services begin with Matins at 09:00 and Holy Liturgy at 10:00.',
    enTitle: 'Important Announcement',
    enText: 'Our Sunday services begin with Matins at 09:00 and Holy Liturgy at 10:00.',
    active: false,
  });
  
  const [services, setServices] = useState<Service[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([]);
  const [logos, setLogos] = useState({ mainLogoUrl: "", canonicalLogoUrl: "" });
  const [mainPhotoUrl, setMainPhotoUrl] = useState<string>("");
  const [uploadingMainPhoto, setUploadingMainPhoto] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Gallery Inputs States
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoUrlInput, setPhotoUrlInput] = useState(''); // manually paste url fallback
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState<"main" | "canonical" | null>(null);
  const [galleryStatus, setGalleryStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  // Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);

  // Live Preview State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLogosOpen, setIsLogosOpen] = useState(false);
  const [isMainPhotoOpen, setIsMainPhotoOpen] = useState(false);
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Load from Cloudinary/localStorage
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchParishData();
      
      setAnnouncement(data.announcement);
      setServices(data.services);
      setGalleryPhotos(data.galleryPhotos);
      setGalleryVideos(data.galleryVideos);
      if (data.logos) { setLogos({ mainLogoUrl: data.logos.mainLogoUrl || "", canonicalLogoUrl: data.logos.canonicalLogoUrl || "" }); }
      if (data.mainPhotoUrl) { setMainPhotoUrl(data.mainPhotoUrl); }
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
      setErrorMsg('Incorrect password!');
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setPassword('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveSuccess(false);

      const success = await saveParishData({
        announcement,
        services,
        galleryPhotos,
        galleryVideos,
        logos,
        mainPhotoUrl
      });

      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (e) {
      console.error('Error saving settings to Firestore:', e);
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
      name: { RO: 'New Service', EN: 'New Service' },
      time: { RO: '18:00', EN: '18:00' },
      day: { RO: 'Saturday', EN: 'Saturday' },
      description: { RO: 'Descrierea slujbei noi.', EN: 'Description of the new service.' },
      type: 'special'
    };
    setServices([...services, newService]);
  };

  const deleteService = (index: number) => {
    if (safeConfirm('Are you sure you want to delete this service?')) {
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
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
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
          const base64 = canvas.toDataURL('image/jpeg', 0.65);
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

    if (galleryPhotos.length >= 500) {
      setGalleryStatus({ type: 'error', message: 'The maximum limit of 500 parish photos has been reached. Please delete old ones.' });
      return;
    }

    try {
      setUploadingPhoto(true);
      setGalleryStatus({ type: '', message: '' });

      const compressedDataUrl = await compressImage(file);
      
      let finalUrl = '';
      try {
        const photoId = Date.now().toString();
        const storageRef = ref(storage, `gallery/${photoId}.jpg`);
        await uploadString(storageRef, compressedDataUrl, 'data_url');
        finalUrl = await getDownloadURL(storageRef);
      } catch (uploadError) {
        console.warn('Firebase Storage upload failed, falling back to local base64 compression:', uploadError);
        finalUrl = compressedDataUrl;
      }

      const newPhoto: GalleryPhoto = {
        id: Date.now().toString(),
        url: finalUrl,
        caption: photoCaption.trim() || '',
        createdAt: Date.now()
      };

      const updatedPhotos = [...galleryPhotos, newPhoto];
      setGalleryPhotos(updatedPhotos);
      localStorage.setItem('parish_gallery_photos', JSON.stringify(updatedPhotos));
      
      // Auto-save direct to Firestore to appear immediately on site:
      await saveParishData({ announcement, services, galleryPhotos: updatedPhotos, galleryVideos, logos });
      
      setPhotoCaption('');
      setGalleryStatus({ 
        type: 'success', 
        message: 'Photo successfully uploaded and is visible on the site!' 
      });
    } catch (err) {
      console.error('Error handling file upload:', err);
      setGalleryStatus({ type: 'error', message: 'Eroare la procesare: ' + (err instanceof Error ? err.message : String(err)) });
    } finally {
      setUploadingPhoto(false);
      if (e.target) e.target.value = '';
    }
  };

  
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'canonical') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLogo(type);
      setGalleryStatus({ type: '', message: '' });

      const compressedDataUrl = await compressImage(file);
      
      let finalUrl = '';
      try {
        const photoId = type + '_' + Date.now().toString();
        const storageRef = ref(storage, `gallery/${photoId}.jpg`);
        await uploadString(storageRef, compressedDataUrl, 'data_url');
        finalUrl = await getDownloadURL(storageRef);
      } catch (uploadError) {
        console.warn('Firebase Storage upload failed, falling back to local base64 compression:', uploadError);
        finalUrl = compressedDataUrl;
      }

      const newLogos = { ...logos };
      if (type === 'main') newLogos.mainLogoUrl = finalUrl;
      if (type === 'canonical') newLogos.canonicalLogoUrl = finalUrl;
      setLogos(newLogos);
      
      // Auto-save direct to Firestore
      await saveParishData({ announcement, services, galleryPhotos, galleryVideos, logos: newLogos, mainPhotoUrl });
      setGalleryStatus({ type: 'success', message: 'Logo successfully uploaded and saved online!' });
    } catch (err) {
      console.error('Error handling logo upload:', err);
      setGalleryStatus({ type: 'error', message: 'Eroare la procesare: ' + (err instanceof Error ? err.message : String(err)) });
    } finally {
      setUploadingLogo(null);
      if (e.target) e.target.value = '';
    }
  };

  const handleSaveLogoUrl = async (type: 'main' | 'canonical') => {
    await saveParishData({ announcement, services, galleryPhotos, galleryVideos, logos, mainPhotoUrl });
    setGalleryStatus({ type: 'success', message: 'Logoul a fost salvat online cu succes!' });
  };

  const handleMainPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingMainPhoto(true);
      setGalleryStatus({ type: '', message: '' });

      const compressedDataUrl = await compressImage(file);
      
      let finalUrl = '';
      try {
        const photoId = 'mainPhoto_' + Date.now().toString();
        const storageRef = ref(storage, `gallery/${photoId}.jpg`);
        await uploadString(storageRef, compressedDataUrl, 'data_url');
        finalUrl = await getDownloadURL(storageRef);
      } catch (uploadError) {
        console.warn('Firebase Storage upload failed, falling back to local base64 compression:', uploadError);
        finalUrl = compressedDataUrl;
      }

      setMainPhotoUrl(finalUrl);
      
      // Auto-save direct to Firestore
      await saveParishData({ announcement, services, galleryPhotos, galleryVideos, logos, mainPhotoUrl: finalUrl });
      setGalleryStatus({ type: 'success', message: 'Main photo successfully uploaded and saved online!' });
    } catch (err) {
      console.error('Error handling main photo upload:', err);
      setGalleryStatus({ type: 'error', message: 'Eroare la procesare: ' + (err instanceof Error ? err.message : String(err)) });
    } finally {
      setUploadingMainPhoto(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSaveMainPhotoUrl = async () => {
    await saveParishData({ announcement, services, galleryPhotos, galleryVideos, logos, mainPhotoUrl });
    setGalleryStatus({ type: 'success', message: 'Main photo successfully saved online!' });
  };

  const handleAddPhotoByUrl = async () => {
    if (!photoUrlInput) {
      setGalleryStatus({ type: 'error', message: 'Please add a valid URL link.' });
      return;
    }
    if (galleryPhotos.length >= 500) {
      setGalleryStatus({ type: 'error', message: 'Maximum limit is 500 parish photos.' });
      return;
    }
    const newPhoto: GalleryPhoto = {
      id: Date.now().toString(),
      url: photoUrlInput.trim(),
      caption: photoCaption.trim() || '',
      createdAt: Date.now()
    };
    
    const updatedPhotos = [...galleryPhotos, newPhoto];
    setGalleryPhotos(updatedPhotos);
    localStorage.setItem('parish_gallery_photos', JSON.stringify(updatedPhotos));
    
    // Auto-save direct to Firestore
    await saveParishData({ announcement, services, galleryPhotos: updatedPhotos, galleryVideos, logos });
    
    setPhotoUrlInput('');
    setPhotoCaption('');
    setGalleryStatus({ type: 'success', message: 'Photo successfully added and saved online!' });
  };

  const handleDeletePhoto = async (photo: GalleryPhoto) => {
    const updatedPhotos = galleryPhotos.filter(p => p.id !== photo.id);
    setGalleryPhotos(updatedPhotos);
    localStorage.setItem('parish_gallery_photos', JSON.stringify(updatedPhotos));
    
    await saveParishData({ announcement, services, galleryPhotos: updatedPhotos, galleryVideos, logos });
    
    setGalleryStatus({ type: 'success', message: 'Photo deleted from list.' });
  };

  const handleAddVideo = async () => {
    if (!newVideoUrl) {
      setGalleryStatus({ type: 'error', message: 'Please enter the YouTube video link.' });
      return;
    }
    const yid = getYoutubeId(newVideoUrl);
    if (!yid) {
      setGalleryStatus({ type: 'error', message: 'Video address seems incorrect. Ensure it is a valid YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...).' });
      return;
    }
    const cleanTitle = newVideoTitle.trim() || `Material Video - ${new Date().toLocaleDateString()}`;
    const newVideo: GalleryVideo = {
      id: Date.now().toString(),
      url: newVideoUrl.trim(),
      title: cleanTitle,
      createdAt: Date.now()
    };
    
    const updatedVideos = [...galleryVideos, newVideo];
    setGalleryVideos(updatedVideos);
    await saveParishData({ announcement, services, galleryPhotos, galleryVideos: updatedVideos, logos });
    
    setNewVideoUrl('');
    setNewVideoTitle('');
    setGalleryStatus({ type: 'success', message: 'Video added and saved successfully!' });
  };

  const handleDeleteVideo = async (id: string) => {
    const updatedVideos = galleryVideos.filter(v => v.id !== id);
    setGalleryVideos(updatedVideos);
    await saveParishData({ announcement, services, galleryPhotos, galleryVideos: updatedVideos, logos, mainPhotoUrl });
    setGalleryStatus({ type: 'success', message: 'Video-ul a fost retras.' });
  };

  const goBack = () => {
    window.location.hash = '';
    window.location.pathname = '/';
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen dark:bg-byz-blue-950 bg-[#e4d8c1] flex items-center justify-center p-4 selection:bg-gold-500/30 selection:text-gold-200 relative" style={{ backgroundImage: !darkMode ? "url(\'https://www.transparenttextures.com/patterns/church.png\')" : "none" }}>
        {setDarkMode && (
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-6 right-6 p-3 dark:text-byz-blue-100 text-[#4a3b3b] hover:dark:bg-byz-blue-900 bg-[#d8c8ac] rounded-full transition-all cursor-pointer border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 hover:border-gold-500/30 z-50"
            aria-label="Toggle Theme"
          >
            {!darkMode ? <Sun size={20} className="text-gold-500" /> : <Moon size={20} className="dark:text-byz-blue-300 text-[#7d6969]" />}
          </button>
        )}
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#d4ab15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md dark:bg-byz-blue-900 bg-[#d8c8ac] border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl z-10"
        >
          {/* Altar Golden Cross header style */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-400 mb-4 shadow-[0_0_15px_rgba(212,171,21,0.2)]">
              <Lock size={24} />
            </div>
            <h1 className="font-display text-2xl font-semibold dark:text-white text-[#3b2f2f] tracking-wider uppercase text-center">
              Administrare Misiune
            </h1>
            <p className="font-serif dark:text-byz-blue-200 text-[#5a4a4a] text-xs text-center mt-2 italic">
              Enter the access password to edit the schedule or announcements.
            </p>
          </div>

          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-mono dark:text-byz-blue-300 text-[#7d6969] font-semibold mb-2 text-center">
                Access Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500 rounded-xl pl-4 pr-12 py-3 dark:text-byz-blue-100 text-[#4a3b3b] placeholder-byz-blue-600/50 focus:outline-none transition-all duration-300 font-mono text-center tracking-widest"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 dark:text-byz-blue-400 text-[#9c8989] hover:dark:text-byz-blue-200 text-[#5a4a4a] transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
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
              className="w-full bg-gold-500 hover:bg-gold-400 text-byz-blue-950 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(212,171,21,0.2)] hover:shadow-[0_0_25px_rgba(212,171,21,0.4)]"
            >
              <span>Autentificare</span>
              <Unlock size={16} />
            </button>
          </form>


          <button
            onClick={goBack}
            className="w-full mt-6 flex items-center justify-center space-x-2 dark:text-byz-blue-400 text-[#9c8989] hover:dark:text-byz-blue-200 text-[#5a4a4a] transition-colors text-xs font-mono tracking-wider uppercase cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Back to Site</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-byz-blue-950 bg-[#e4d8c1] dark:text-byz-blue-100 text-[#4a3b3b] pb-24 selection:bg-gold-500/30 selection:text-gold-200" style={{ backgroundImage: !darkMode ? "url('https://www.transparenttextures.com/patterns/church.png')" : "none" }}>
      <div className="absolute inset-0 z-0 opacity-[0.04] bg-[radial-gradient(#d4ab15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Top Header Controls Bar */}
      <header className="sticky top-0 dark:bg-byz-blue-950 bg-[#e4d8c1]/95 border-b dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            <button
              onClick={goBack}
              className="p-2 dark:bg-byz-blue-900 bg-[#d8c8ac] hover:dark:bg-byz-blue-800 bg-[#cca87d] border dark:border-byz-blue-800 border-[#c5a682] hover:border-gold-500/30 dark:text-byz-blue-100 text-[#4a3b3b] rounded-xl transition-all cursor-pointer"
              title="Back to Site"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="font-display text-sm sm:text-lg font-bold text-gold-400 tracking-wider uppercase">
                Mission Control Panel
              </h1>
              <p className="font-serif text-[10px] dark:text-byz-blue-300 text-[#7d6969] italic hidden sm:block">
                Edit announcements and service schedule in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3">
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 sm:p-2.5 dark:text-byz-blue-100 text-[#4a3b3b] hover:dark:bg-byz-blue-900 bg-[#d8c8ac] rounded-full transition-all cursor-pointer border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 hover:border-gold-500/30"
                aria-label="Toggle Theme"
              >
                {!darkMode ? <Sun size={18} className="text-gold-500" /> : <Moon size={18} className="dark:text-byz-blue-300 text-[#7d6969]" />}
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all"
            >
              <Unlock size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
            {saveSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center space-x-1.5 text-xs text-green-400 bg-green-950/60 border border-green-500/30 px-3 py-2 rounded-xl"
              >
                <CheckCircle2 size={13} />
                <span>Changes saved!</span>
              </motion.div>
            )}

            <button
              onClick={() => {
                if (safeConfirm('Are you sure you want to discard unsaved changes and reload data from the Cloud?')) {
                  loadData();
                }
              }}
              disabled={saving || loading}
              className="dark:bg-byz-blue-900 bg-[#d8c8ac] hover:dark:bg-byz-blue-850 bg-[#d8c8ac] border dark:border-byz-blue-800 border-[#c5a682] dark:text-byz-blue-100 text-[#4a3b3b] font-medium px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 text-xs uppercase disabled:opacity-50"
              title="Discard unsaved changes"
            >
              <RotateCcw size={14} />
              <span className="hidden md:inline">Discard Changes</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="bg-gold-500 hover:bg-gold-400 font-medium px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl text-byz-blue-950 transition-all cursor-pointer flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider disabled:opacity-50"
            >
              <Save size={14} />
              <span className="whitespace-nowrap">{saving ? 'Saving...' : 'Save'}</span>
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
            <span>Changes saved to Firestore server!</span>
          </motion.div>
        )}

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
            <p className="font-serif dark:text-byz-blue-300 text-[#7d6969] italic text-sm">Loading data from Firestore database...</p>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* REAL-TIME PREVIEW SECTION */}
            <section className="dark:bg-byz-blue-900 bg-[#d8c8ac]/30 border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 rounded-3xl overflow-hidden transition-all duration-300">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                className="w-full flex items-center justify-between p-5 sm:p-6 dark:bg-byz-blue-900 bg-[#d8c8ac]/60 hover:dark:bg-byz-blue-900 bg-[#d8c8ac]/80 hover:text-gold-400 dark:text-byz-blue-100 text-[#4a3b3b] font-display font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer border-b dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60"
              >
                <div className="flex items-center space-x-2.5">
                  <Sparkles size={16} className="text-gold-400 animate-pulse" />
                  <span>Real-time Preview (Direct Synergy with Public Page)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono dark:text-byz-blue-300 text-[#7d6969] font-normal normal-case">
                  <span>{isPreviewOpen ? 'Hide preview' : 'Show preview'}</span>
                  {isPreviewOpen ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                </div>
              </button>

              {isPreviewOpen && (
                <div className="p-6 sm:p-8 dark:bg-byz-blue-950 bg-[#e4d8c1]/95 space-y-8 animate-fade-in">
                  <p className="text-xs dark:text-byz-blue-300 text-[#7d6969] font-serif italic mb-2">
                    * This section simulates how the announcement and services will look on the site main page with current changes (even unsaved ones).
                  </p>

                  {/* Simulated Announcement Banner */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest dark:text-byz-blue-400 text-[#9c8989] block font-semibold">1. Altar Announcement Banner Simulation (Top of Site):</span>
                    {announcement.active ? (
                      <div className="bg-gradient-to-r from-gold-950/25 via-gold-500/15 to-gold-950/25 border border-gold-500/35 rounded-xl p-4 flex items-center space-x-3">
                        <div className="p-1.5 bg-gold-500/15 text-gold-400 border border-gold-500/20 rounded-lg animate-pulse flex-shrink-0">
                          <Megaphone size={14} />
                        </div>
                        <div className="text-xs sm:text-sm leading-relaxed">
                          <span className="font-display font-bold text-gold-200 uppercase tracking-wider mr-2">
                            {announcement.roTitle}:
                          </span>
                          <span className="font-serif italic dark:text-byz-blue-100 text-[#4a3b3b]">
                            {announcement.roText}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="border dark:border-byz-blue-800 border-[#c5a682]/30 dark:bg-byz-blue-900 bg-[#d8c8ac]/10 rounded-xl p-4 text-center">
                        <p className="text-xs dark:text-byz-blue-400 text-[#9c8989] font-serif italic">The announcement banner is currently disabled.</p>
                      </div>
                    )}
                  </div>

                  {/* Simulated Liturgical Calendar Cards */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest dark:text-byz-blue-400 text-[#9c8989] block font-semibold">2. Service Cards Simulation (1-to-1 Synergy with Main Page):</span>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Romanian Card Preview */}
                      <div className="dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] border dark:border-byz-blue-100/10 border-[#c5a682]/70 dark:border-byz-blue-900/60 rounded-3xl p-6 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.05),transparent_70%) pointer-events-none" />
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-byz-blue-900/80">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-gold-400 dark:bg-byz-blue-950 bg-[#e4d8c1] px-2.5 py-1 rounded-full border border-byz-blue-900">
                            Romanian / RO
                          </span>
                          <div className="p-1.5 rounded-lg dark:bg-byz-blue-950 bg-[#e4d8c1] text-gold-400 border border-byz-blue-900">
                            <Calendar size={12} />
                          </div>
                        </div>
                        <h3 className="font-display text-base font-semibold text-gold-100 mb-5">Service Schedule</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {(() => {
                            const activeServicesRO = services.filter((s) => {
                              if (s.hidden === true) return false;
                              const nameVal = getFieldVal(s.name, 'RO');
                              return nameVal && nameVal.trim() !== '';
                            });
                            const halfLength = Math.ceil(activeServicesRO.length / 2);
                            const leftServices = activeServicesRO.slice(0, halfLength);
                            const rightServices = activeServicesRO.slice(halfLength);

                            if (activeServicesRO.length === 0) {
                              return <div className="col-span-2 text-center py-4 font-serif text-xs dark:text-byz-blue-400 text-[#9c8989] italic">All services are hidden or no data exists.</div>;
                            }

                            return (
                              <>
                                <div className="space-y-4">
                                  {leftServices.map((service, idx) => (
                                    <div key={service.id || `preview-ro-left-${idx}`} className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                      <span className="font-semibold dark:text-white text-[#3b2f2f]">{getFieldVal(service.day, 'RO')}:</span>
                                      <span className="text-right dark:text-byz-blue-300 text-[#7d6969] font-mono text-[11px] font-semibold">
                                        {getFieldVal(service.time, 'RO')} - {getFieldVal(service.name, 'RO')}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div className="space-y-4">
                                  {rightServices.map((service, idx) => (
                                    <div key={service.id || `preview-ro-right-${idx}`} className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                      <span className="font-semibold dark:text-white text-[#3b2f2f]">{getFieldVal(service.day, 'RO')}:</span>
                                      <span className="text-right dark:text-byz-blue-300 text-[#7d6969] font-mono text-[11px] font-semibold">
                                        {getFieldVal(service.time, 'RO')} - {getFieldVal(service.name, 'RO')}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* English Card Preview */}
                      <div className="dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] border dark:border-byz-blue-100/10 border-[#c5a682]/70 dark:border-byz-blue-900/60 rounded-3xl p-6 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.05),transparent_70%) pointer-events-none" />
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-byz-blue-900/80">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-gold-400 dark:bg-byz-blue-950 bg-[#e4d8c1] px-2.5 py-1 rounded-full border border-byz-blue-900">
                            English / EN
                          </span>
                          <div className="p-1.5 rounded-lg dark:bg-byz-blue-950 bg-[#e4d8c1] text-gold-400 border border-byz-blue-900">
                            <Calendar size={12} />
                          </div>
                        </div>
                        <h3 className="font-display text-base font-semibold text-gold-100 mb-5">Schedule of Services</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {(() => {
                            const activeServicesEN = services.filter((s) => {
                              if (s.hidden === true) return false;
                              const nameVal = getFieldVal(s.name, 'EN');
                              return nameVal && nameVal.trim() !== '';
                            });
                            const halfLength = Math.ceil(activeServicesEN.length / 2);
                            const leftServices = activeServicesEN.slice(0, halfLength);
                            const rightServices = activeServicesEN.slice(halfLength);

                            if (activeServicesEN.length === 0) {
                              return <div className="col-span-2 text-center py-4 font-serif text-xs dark:text-byz-blue-400 text-[#9c8989] italic">All services are hidden or there is no data.</div>;
                            }

                            return (
                              <>
                                <div className="space-y-4">
                                  {leftServices.map((service, idx) => (
                                    <div key={service.id || `preview-en-left-${idx}`} className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                      <span className="font-semibold dark:text-white text-[#3b2f2f]">{getFieldVal(service.day, 'EN')}:</span>
                                      <span className="text-right dark:text-byz-blue-300 text-[#7d6969] font-mono text-[11px] font-semibold">
                                        {getFieldVal(service.time, 'EN')} - {getFieldVal(service.name, 'EN')}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div className="space-y-4">
                                  {rightServices.map((service, idx) => (
                                    <div key={service.id || `preview-en-right-${idx}`} className="flex justify-between items-start text-xs border-b border-byz-blue-900/50 pb-2">
                                      <span className="font-semibold dark:text-white text-[#3b2f2f]">{getFieldVal(service.day, 'EN')}:</span>
                                      <span className="text-right dark:text-byz-blue-300 text-[#7d6969] font-mono text-[11px] font-semibold">
                                        {getFieldVal(service.time, 'EN')} - {getFieldVal(service.name, 'EN')}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* ANNOUNCEMENT EDIT BLOCK */}
            <section className="dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 p-6 sm:p-8 rounded-3xl shadow-md animate-fade-in">
              <div 
                className="flex items-center justify-between cursor-pointer group mb-2" 
                onClick={() => setIsAnnouncementsOpen(!isAnnouncementsOpen)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                    <Megaphone size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-gold-400">Altar Announcement (Main Banner)</h2>
                    <p className="font-serif text-xs dark:text-byz-blue-300 text-[#7d6969] italic">Displayed at the top of the calendar section for parishioners</p>
                  </div>
                </div>
                <div className="text-gold-400 p-2 border border-transparent group-hover:border-gold-500/30 rounded-lg transition-colors">
                  {isAnnouncementsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {isAnnouncementsOpen && (<div className="pt-4 mt-4 border-t dark:border-byz-blue-800 border-[#c5a682]/60 space-y-6">
                {/* Active Toggle Switch */}
                <div className="flex items-center justify-between p-4 dark:bg-byz-blue-950 bg-[#e4d8c1]/50 border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 rounded-xl">
                  <div>
                    <h4 className="font-display font-semibold text-sm dark:text-byz-blue-100 text-[#4a3b3b]">Enable Announcement on Site</h4>
                    <p className="text-[11px] dark:text-byz-blue-400 text-[#9c8989] font-serif italic mt-0.5">Check for announcement to appear on screen, uncheck to hide it.</p>
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
                  <div className="space-y-4 dark:bg-byz-blue-950 bg-[#e4d8c1]/30 p-4 rounded-2xl border border-byz-blue-900/50">
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-semibold">Romanian</span>
                    
                    <div>
                      <label className="block text-xs dark:text-byz-blue-200 text-[#5a4a4a] font-medium mb-1.5 font-sans">Announcement Title (RO)</label>
                      <input
                        type="text"
                        value={announcement.roTitle}
                        onChange={(e) => setAnnouncement({ ...announcement, roTitle: e.target.value })}
                        className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs dark:text-byz-blue-100 text-[#4a3b3b] placeholder-byz-blue-600/50 focus:outline-none"
                        placeholder="Ex: Schimbare de Program"
                      />
                    </div>

                    <div>
                      <label className="block text-xs dark:text-byz-blue-200 text-[#5a4a4a] font-medium mb-1.5 font-sans">Announcement Text / Content (RO)</label>
                      <textarea
                        rows={3}
                        value={announcement.roText}
                        onChange={(e) => setAnnouncement({ ...announcement, roText: e.target.value })}
                        className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs dark:text-byz-blue-100 text-[#4a3b3b] placeholder-byz-blue-600/50 focus:outline-none font-serif italic leading-relaxed"
                        placeholder="Announcement content in Romanian..."
                      />
                    </div>
                  </div>

                  {/* English Column */}
                  <div className="space-y-4 dark:bg-byz-blue-950 bg-[#e4d8c1]/30 p-4 rounded-2xl border border-byz-blue-900/50">
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-byz-blue-500/15 dark:text-byz-blue-300 text-[#7d6969] border border-byz-blue-500/30 px-2 py-0.5 rounded-full font-semibold">English</span>
                    
                    <div>
                      <label className="block text-xs dark:text-byz-blue-200 text-[#5a4a4a] font-medium mb-1.5 font-sans">Announcement Title (EN)</label>
                      <input
                        type="text"
                        value={announcement.enTitle}
                        onChange={(e) => setAnnouncement({ ...announcement, enTitle: e.target.value })}
                        className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs dark:text-byz-blue-100 text-[#4a3b3b] placeholder-byz-blue-600/50 focus:outline-none"
                        placeholder="Ex: Schedule Update"
                      />
                    </div>

                    <div>
                      <label className="block text-xs dark:text-byz-blue-200 text-[#5a4a4a] font-medium mb-1.5 font-sans">Announcement Message / Description (EN)</label>
                      <textarea
                        rows={3}
                        value={announcement.enText}
                        onChange={(e) => setAnnouncement({ ...announcement, enText: e.target.value })}
                        className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs dark:text-byz-blue-100 text-[#4a3b3b] placeholder-byz-blue-600/50 focus:outline-none font-serif italic leading-relaxed"
                        placeholder="Announcement content in English..."
                      />
                    </div>
                  </div>
                </div>
              </div>)}
            </section>

            {/* SERVICES EDIT BLOCK */}
            <section className="dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 p-6 sm:p-8 rounded-3xl shadow-md">
              <div 
                className="flex items-center justify-between cursor-pointer group mb-2" 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-gold-400">Holy Services Schedule</h2>
                    <p className="font-serif text-xs dark:text-byz-blue-300 text-[#7d6969] italic">Manage slots, days and times in real-time for parishioners</p>
                  </div>
                </div>
                <div className="text-gold-400 p-2 border border-transparent group-hover:border-gold-500/30 rounded-lg transition-colors">
                  {isServicesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {isServicesOpen && (<div className="pt-4 mt-4 border-t dark:border-byz-blue-800 border-[#c5a682]/60">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (safeConfirm('Are you sure you want to reset the service schedule to the default canonical schedule? Changes are not permanently saved until you click "Save Changes" in the header.')) {
                        setServices(SERVICES_SCHEDULING);
                        setGalleryStatus({
                          type: 'success',
                          message: 'Service schedule reset in memory! Click "Save Changes" at the top of the screen to push to Cloud.'
                        });
                      }
                    }}
                    className="dark:bg-byz-blue-950 bg-[#e4d8c1]/80 hover:dark:bg-byz-blue-900 bg-[#d8c8ac] dark:text-byz-blue-300 text-[#7d6969] hover:dark:text-white hover:text-[#4a3b3b] border dark:border-byz-blue-800 border-[#c5a682] px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-xs uppercase"
                    title="Reset schedule to default"
                  >
                    <RotateCcw size={12} />
                    <span>Reset to Defaults</span>
                  </button>

                  <button
                    type="button"
                    onClick={addService}
                    className="dark:bg-byz-blue-950 bg-[#e4d8c1]/90 hover:dark:bg-byz-blue-900 hover:bg-[#d8c8ac] hover:text-gold-500 dark:hover:text-gold-400 border dark:border-byz-blue-800 border-[#c5a682] dark:text-byz-blue-200 text-[#5a4a4a] font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-xs uppercase"
                  >
                    <Plus size={14} />
                    <span>Add Service</span>
                  </button>
                </div>
              {/* Informative Help Box */}
              <div className="bg-gradient-to-r from-gold-950/15 via-byz-blue-950/50 to-gold-950/15 border border-gold-500/20 p-4.5 rounded-2xl mb-8">
                <h4 className="text-xs uppercase font-display font-bold text-gold-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Main Page Synergy & Saturday Mode</span>
                </h4>
                <p className="text-[11.5px] leading-relaxed dark:text-byz-blue-200 text-[#5a4a4a] font-serif italic">
                  * On the main page, the 4 basic service slots (Vespers, Matins, Holy Liturgy and Agape/Refreshments) are dynamically connected based on their presence in the list.
                  <br />
                  * <span className="text-gold-300 font-semibold">If you do not need Saturday Vespers</span>, you can simply delete or disable it via the delete button (🗑️) on that service. To reactivate it, use the "Add Service" button and make sure the type is set to "Vespers".
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
                      className="relative dark:bg-byz-blue-950 bg-[#e4d8c1]/60 border dark:border-byz-blue-800 border-[#c5a682]/80 hover:border-gold-500/35 p-5 sm:p-6 rounded-2xl transition-all duration-300"
                    >
                      
                      {/* Floating Tools Controls */}
                      <div className="absolute top-4 right-4 flex items-center space-x-1 dark:bg-byz-blue-900 bg-[#d8c8ac] border border-byz-blue-850 rounded-lg p-1 shadow-md">
                        <button
                          onClick={() => moveService(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 dark:text-byz-blue-300 text-[#7d6969] hover:text-gold-400 disabled:opacity-20 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveService(index, 'down')}
                          disabled={index === services.length - 1}
                          className="p-1.5 dark:text-byz-blue-300 text-[#7d6969] hover:text-gold-400 disabled:opacity-20 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <div className="w-[1px] h-4 dark:bg-byz-blue-800 bg-[#cca87d] mx-1" />
                        <button
                          onClick={() => deleteService(index)}
                          className="p-1.5 text-red-400 hover:text-red-500 cursor-pointer"
                          title="Delete slujba"
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
                        
                        {service.hidden === true && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-red-300 bg-red-500/20 border border-red-500/40 px-2.5 py-1 rounded-full font-bold">
                            <span>HIDDEN</span>
                          </div>
                        )}
                        
                        {isVespersSlot && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full font-bold">
                            <Moon size={10} className="animate-pulse" />
                            <span>Slot 1 on Main Page (Saturday Vespers)</span>
                          </div>
                        )}
                        {isMatinsSlot && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-sky-300 bg-sky-500/15 border border-sky-500/30 px-2.5 py-1 rounded-full font-bold">
                            <Clock size={10} />
                            <span>Slot 2 on Main Page (Sunday Matins)</span>
                          </div>
                        )}
                        {isLiturgySlot && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-gold-300 bg-gold-500/15 border border-gold-500/30 px-2.5 py-1 rounded-full font-bold">
                            <Sparkles size={10} className="animate-pulse" />
                            <span>Slot 3 on Main Page (Holy Liturgy)</span>
                          </div>
                        )}
                        {isRefreshmentsSlot && (
                          <div className="flex items-center space-x-1.5 text-[9px] font-sans uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                            <HeartHandshake size={10} />
                            <span>Slot 4 on Main Page (Agape / Refreshments)</span>
                          </div>
                        )}
                      </div>

                      {/* Presets and Wipe Actions Bar */}
                      <div className="mb-5 p-3.5 dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] border dark:border-byz-blue-800 border-[#c5a682]/60 rounded-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="text-[10px] uppercase font-mono tracking-wider dark:text-byz-blue-300 text-[#7d6969] font-bold">
                              Load Preset:
                            </label>
                            <select
                              onChange={(e) => {
                                if (e.target.value) {
                                  applyPreset(index, e.target.value);
                                  e.target.value = ""; // reset selection
                                }
                              }}
                              defaultValue=""
                              className="dark:bg-byz-blue-950 bg-[#e4d8c1] border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500 rounded-lg px-2.5 py-1 text-xs dark:text-byz-blue-100 text-[#4a3b3b] cursor-pointer focus:outline-none"
                            >
                              <option value="">-- Alege un Model --</option>
                              <option value="vespers">Vecernie (Saturday Vespers)</option>
                              <option value="matins">Utrenie (Sunday Matins)</option>
                              <option value="liturgy">Holy Liturgy (Divine Liturgy)</option>
                              <option value="refreshments">Agape / Snack (Refreshments for All)</option>
                            </select>
                          </div>

                          <label className="flex items-center space-x-2 text-xs dark:text-byz-blue-100 text-[#4a3b3b] font-medium cursor-pointer select-none dark:bg-byz-blue-950 bg-[#e4d8c1]/40 hover:dark:bg-byz-blue-950 bg-[#e4d8c1]/80 px-3 py-1 rounded-lg border dark:border-byz-blue-800 border-[#c5a682]/80 transition-all">
                            <input
                              type="checkbox"
                              checked={service.hidden === true}
                              onChange={(e) => updateServiceField(index, 'hidden', e.target.checked)}
                              className="rounded dark:border-byz-blue-800 border-[#c5a682] text-gold-500 focus:ring-gold-500 focus:ring-offset-byz-blue-950 dark:bg-byz-blue-950 bg-[#e4d8c1] cursor-pointer w-4 h-4"
                            />
                            <span className="font-mono text-[11px] uppercase tracking-wider text-stone-200">
                              Ascunde / Hide
                            </span>
                          </label>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (safeConfirm('Are you sure you want to completely CLEAR all data from this slot? This will delete the text but keep the slot in the list for manual editing.')) {
                              wipeService(index);
                            }
                          }}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 px-3 py-1 rounded-lg transition-all text-xs font-mono font-semibold flex items-center justify-center space-x-1 cursor-pointer"
                          title="Clear text from all fields in this slot"
                        >
                          <Trash2 size={11} />
                          <span>Clear Slot (Wipe)</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* Time (RO) */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Time slujbei (RO)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.time, 'RO')}
                            onChange={(e) => updateServiceField(index, 'time', e.target.value, 'RO')}
                            className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none"
                            placeholder="Ex: 09:00 or Sunday"
                          />
                        </div>

                        {/* Time (EN) */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Time of service (EN)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.time, 'EN')}
                            onChange={(e) => updateServiceField(index, 'time', e.target.value, 'EN')}
                            className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none"
                            placeholder="Ex: 09:00 or Sunday"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* Ziua RO */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Day / Frequency (RO)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.day, 'RO')}
                            onChange={(e) => updateServiceField(index, 'day', e.target.value, 'RO')}
                            className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none"
                            placeholder="Ex: Every Sunday"
                          />
                        </div>

                        {/* Ziua EN */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Day / Frequency (EN)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.day, 'EN')}
                            onChange={(e) => updateServiceField(index, 'day', e.target.value, 'EN')}
                            className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none"
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
                            className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs font-semibold dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none"
                            placeholder="Name in Romanian..."
                          />
                        </div>

                        {/* Name EN */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Service Name (EN)</label>
                          <input
                            type="text"
                            value={getFieldVal(service.name, 'EN')}
                            onChange={(e) => updateServiceField(index, 'name', e.target.value, 'EN')}
                            className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs font-semibold dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none"
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
                            className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-200 text-[#5a4a4a] focus:outline-none"
                            placeholder="Liturgical details in Romanian..."
                          />
                        </div>

                        {/* DescEN */}
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Description / Details (EN)</label>
                          <textarea
                            rows={2}
                            value={getFieldVal(service.description, 'EN')}
                            onChange={(e) => updateServiceField(index, 'description', e.target.value, 'EN')}
                            className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-200 text-[#5a4a4a] focus:outline-none"
                            placeholder="Liturgical details in English..."
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] text-byz-blue-350 font-medium mb-1">Tipul Slujbei (pentru stil primar / culori)</label>
                          <select
                            value={service.type}
                            onChange={(e) => updateServiceField(index, 'type', e.target.value)}
                            className="dark:bg-byz-blue-950 bg-[#e4d8c1] border border-byz-blue-850 text-xs rounded-xl px-2.5 py-2 dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none focus:border-gold-500 cursor-pointer"
                          >
                            <option value="liturgy">Holy Liturgy (Gold)</option>
                            <option value="vespers">Vecernie (Indigo)</option>
                            <option value="sacrament">Holy Sacrament (Red / Crimson)</option>
                            <option value="special">Agape / Specific Services (Green / Emerald)</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  );
                })}

                {services.length === 0 && (
                  <div className="text-center py-12 dark:bg-byz-blue-950 bg-[#e4d8c1]/40 border border-byz-blue-900 rounded-2xl">
                    <p className="font-serif dark:text-byz-blue-400 text-[#9c8989] text-xs italic">No services in the list. Click "Add Service" above.</p>
                  </div>
                )}
              </div>
              </div>)}
            </section>

            {/* LOGOS MANAGEMENT SECTION */}
            <section className="dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 p-6 sm:p-8 rounded-3xl shadow-md mt-8">
                <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsLogosOpen(!isLogosOpen)}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                      <ImageIcon size={18} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-gold-400">Logos</h2>
                      <p className="font-serif text-xs dark:text-byz-blue-300 text-[#7d6969] italic">Manage application logos</p>
                    </div>
                  </div>
                  <div className="text-gold-400">
                    {isLogosOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                {isLogosOpen && (
                  <div className="mt-8 space-y-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-gold-400 uppercase tracking-widest mb-2">
                        Parish Logo (Same logo applied site-wide)
                      </label>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="URL-ul imaginii (ex: https://... din Firebase Storage)"
                          value={logos.mainLogoUrl}
                          onChange={(e) => setLogos({ mainLogoUrl: e.target.value, canonicalLogoUrl: e.target.value })}
                          className="flex-1 dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveLogoUrl('main')}
                          className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors whitespace-nowrap shadow-md"
                        >
                          Save Link
                        </button>
                      </div>

                      <p className="font-serif text-[10px] dark:text-byz-blue-400 text-[#9c8989] italic mt-1.5">Enter the image link. If left empty, the default emblem will be used. To display images from Firebase, Firebase Storage needs public read rules (allow read: if true;).</p>
                      {logos.mainLogoUrl && (
                        <img src={logos.mainLogoUrl} alt="Preview" className="mt-3 h-16 w-16 object-contain rounded-full border dark:border-byz-blue-800 border-[#c5a682] bg-[#3b2f2f]" />
                      )}
                    </div>
                  </div>
                )}
            </section>

            {/* MAIN PHOTO MANAGEMENT SECTION */}
            <section className="dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 p-6 sm:p-8 rounded-3xl shadow-md mt-8">
                <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsMainPhotoOpen(!isMainPhotoOpen)}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                      <ImageIcon size={18} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-gold-400">Main Photo</h2>
                      <p className="font-serif text-xs dark:text-byz-blue-300 text-[#7d6969] italic">Main image at top of page (Priest and Metropolitan)</p>
                    </div>
                  </div>
                  <div className="text-gold-400">
                    {isMainPhotoOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                {isMainPhotoOpen && (
                  <div className="mt-8 space-y-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-gold-400 uppercase tracking-widest mb-2">
                        Hero Main Photo
                      </label>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="URL-ul imaginii"
                          value={mainPhotoUrl}
                          onChange={(e) => setMainPhotoUrl(e.target.value)}
                          className="flex-1 dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={handleSaveMainPhotoUrl}
                          className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors whitespace-nowrap shadow-md"
                        >
                          Save Link
                        </button>
                      </div>

                      <div className="relative mt-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMainPhotoUpload}
                          className="hidden"
                          id="photo-main-upload"
                        />
                        <label
                          htmlFor="photo-main-upload"
                          className="flex items-center justify-center w-full dark:bg-byz-blue-900 bg-[#d8c8ac]/50 hover:dark:bg-byz-blue-800 bg-[#cca87d] border border-byz-blue-700 hover:border-gold-500/50 text-gold-200 py-3 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm space-x-2"
                        >
                          {uploadingMainPhoto ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold-400" />
                          ) : (
                            <>
                              <Upload size={18} />
                              <span>Upload Image (File)</span>
                            </>
                          )}
                        </label>
                      </div>

                      {mainPhotoUrl && (
                        <img src={mainPhotoUrl} alt="Preview" className="mt-3 h-24 w-auto object-cover rounded border dark:border-byz-blue-800 border-[#c5a682] bg-[#3b2f2f]" />
                      )}
                    </div>
                  </div>
                )}
            </section>

            {/* GALLERY MANAGEMENT SECTION */}
            <section className="dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] border dark:dark:border-byz-blue-800 border-[#c5a682]/70 border-[#c5a682]/60 p-6 sm:p-8 rounded-3xl shadow-md mt-8">
              <div 
                className="flex items-center justify-between cursor-pointer group mb-2" 
                onClick={() => setIsGalleryOpen(!isGalleryOpen)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-gold-400">Gallery Administration (Photos & Videos)</h2>
                    <p className="font-serif text-xs dark:text-byz-blue-300 text-[#7d6969] italic">Upload representative photos and add YouTube video links for parishioners</p>
                  </div>
                </div>
                <div className="text-gold-400 p-2 border border-transparent group-hover:border-gold-500/30 rounded-lg transition-colors">
                  {isGalleryOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {isGalleryOpen && (<div className="pt-4 mt-4 border-t dark:border-byz-blue-800 border-[#c5a682]/60">
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
                  <div className="dark:bg-byz-blue-950 bg-[#e4d8c1]/40 border border-byz-blue-900 p-5 rounded-2xl">
                    <h3 className="text-sm font-semibold dark:text-byz-blue-100 text-[#4a3b3b] mb-2 flex items-center space-x-2">
                       <Upload size={14} className="text-gold-400" />
                      <span>Photo Upload ({galleryPhotos.length}/20)</span>
                    </h3>
                    <p className="text-[11px] dark:text-byz-blue-400 text-[#9c8989] mb-4 leading-relaxed">
                      Select or drag image files. The system will automatically resize them to optimal dimensions (max 1000px) to reduce site load.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider dark:text-byz-blue-300 text-[#7d6969] font-medium mb-1.5 font-semibold">Photo Description / Caption (optional)</label>
                        <input
                          type="text"
                          value={photoCaption}
                          onChange={(e) => setPhotoCaption(e.target.value)}
                          className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-100 text-[#4a3b3b] placeholder-byz-blue-600/50 focus:outline-none"
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
                              if (uploadingPhoto || galleryPhotos.length >= 500) return;
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
                                : 'dark:border-byz-blue-800 border-[#c5a682] hover:border-gold-500/40 dark:bg-byz-blue-950 bg-[#e4d8c1]/30 hover:dark:bg-byz-blue-950 bg-[#e4d8c1]/60'
                            }`}
                          >
                            {uploadingPhoto ? (
                              <>
                                <Loader2 size={20} className="text-gold-400 animate-spin mb-1.5" />
                                <span className="text-[11px] dark:text-byz-blue-400 text-[#9c8989]">Loading...</span>
                              </>
                            ) : (
                              <>
                                <Upload size={18} className={`mb-1.5 transition-colors ${isDragging ? 'text-gold-400 animate-bounce' : 'dark:text-byz-blue-400 text-[#9c8989] group-hover:text-gold-400'}`} />
                                <span className="text-[10px] dark:text-byz-blue-300 text-[#7d6969] font-semibold uppercase tracking-wider">
                                  {isDragging ? 'Drop image!' : 'Choose or drag file'}
                                </span>
                                <span className="text-[9px] text-byz-blue-500 mt-0.5">JPEG, PNG</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              disabled={uploadingPhoto || galleryPhotos.length >= 500}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Paste URL Manual Fallback */}
                        <div className="border dark:border-byz-blue-800 border-[#c5a682]/60 dark:bg-byz-blue-950 bg-[#e4d8c1]/30 p-3 rounded-xl space-y-2 h-24 flex flex-col justify-between">
                          <span className="text-[9px] font-semibold uppercase tracking-wider dark:text-byz-blue-300 text-[#7d6969] block leading-tight">Sau direct prin adresa web (URL)</span>
                          <input
                            type="text"
                            value={photoUrlInput}
                            onChange={(e) => setPhotoUrlInput(e.target.value)}
                            className="dark:bg-byz-blue-950 bg-[#e4d8c1] border dark:border-byz-blue-800 border-[#c5a682] rounded-lg px-2 py-1 text-[10px] dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none w-full"
                            placeholder="Adresa imaginii (https://...)"
                          />
                          <button
                            type="button"
                            onClick={handleAddPhotoByUrl}
                            disabled={galleryPhotos.length >= 500}
                            className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 font-bold px-3 py-1 text-[10px] uppercase tracking-wider rounded-lg transition-colors w-full cursor-pointer shadow-sm"
                          >
                            Add Photo Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* List of Photos */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold dark:text-byz-blue-300 text-[#7d6969] flex items-center space-x-1.5">
                      <ImageIcon size={12} />
                      <span>Fotografii Existente ({galleryPhotos.length})</span>
                    </span>

                    {galleryPhotos.length === 0 ? (
                      <div className="text-center py-8 dark:bg-byz-blue-950 bg-[#e4d8c1]/20 border border-byz-blue-900 rounded-xl">
                        <p className="font-serif italic dark:text-byz-blue-400 text-[#9c8989] text-xs text-center">No photos added yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                        {galleryPhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="relative aspect-video rounded-lg overflow-hidden border dark:border-byz-blue-800 border-[#c5a682]/80 group dark:bg-byz-blue-950 bg-[#e4d8c1]"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption || 'Parish'}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            {photo.caption && (
                              <div className="absolute inset-x-0 bottom-0 dark:bg-byz-blue-950 bg-[#e4d8c1]/90 py-1 px-1.5 text-[9px] font-sans truncate dark:text-byz-blue-200 text-[#5a4a4a]">
                                {photo.caption}
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(photo)}
                              className="absolute top-1.5 right-1.5 p-1 bg-red-600 dark:text-white text-[#3b2f2f] rounded-md hover:bg-red-500 transition-colors shadow-md cursor-pointer"
                              title="Delete fotografia"
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
                  <div className="dark:bg-byz-blue-950 bg-[#e4d8c1]/40 border border-byz-blue-900/80 p-5 rounded-2xl space-y-4">
                    <h3 className="text-sm font-semibold dark:text-byz-blue-100 text-[#4a3b3b] mb-2 flex items-center space-x-2">
                      <VideoIcon size={14} className="text-gold-400" />
                      <span>Add YouTube Video Material</span>
                    </h3>
                    
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider dark:text-byz-blue-300 text-[#7d6969] font-medium mb-1.5 font-semibold">Video Recording Title</label>
                      <input
                        type="text"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none font-semibold"
                        placeholder="Ex: Holy Liturgy Service and Te Deum"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider dark:text-byz-blue-300 text-[#7d6969] font-medium mb-1.5 font-semibold">Link / URL YouTube (Unlisted/Public)</label>
                      <input
                        type="text"
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        className="w-full dark:bg-byz-blue-950 bg-[#e4d8c1]/80 border dark:border-byz-blue-800 border-[#c5a682] focus:border-gold-500/50 rounded-xl px-3 py-2 text-xs dark:text-byz-blue-100 text-[#4a3b3b] focus:outline-none font-semibold"
                        placeholder="Ex: https://www.youtube.com/watch?v=... sau https://youtu.be/..."
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddVideo}
                      className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 text-xs uppercase w-full shadow-md"
                    >
                      <Plus size={14} />
                      <span>Add Video Link</span>
                    </button>
                  </div>

                  {/* List of Videos */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold dark:text-byz-blue-300 text-[#7d6969] flex items-center space-x-1.5">
                      <VideoIcon size={12} />
                      <span>Videoclipuri Existente ({galleryVideos.length})</span>
                    </span>

                    {galleryVideos.length === 0 ? (
                      <div className="text-center py-8 dark:bg-byz-blue-950 bg-[#e4d8c1]/20 border border-byz-blue-900 rounded-xl">
                        <p className="font-serif italic dark:text-byz-blue-400 text-[#9c8989] text-xs text-center">No video material added yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                        {galleryVideos.map((video) => {
                          const yid = getYoutubeId(video.url);

                          return (
                            <div
                              key={video.id}
                              className="dark:bg-byz-blue-950 bg-[#e4d8c1]/40 border dark:border-byz-blue-800 border-[#c5a682] p-2 rounded-xl flex items-center justify-between gap-3 hover:border-gold-500/30 transition-all group"
                            >
                              <div className="flex items-center space-x-3 truncate">
                                <div className="relative aspect-video w-16 dark:bg-byz-blue-950 bg-[#e4d8c1] rounded overflow-hidden flex-shrink-0 flex items-center justify-center border dark:border-byz-blue-800 border-[#c5a682]">
                                  {yid ? (
                                    <img
                                      src={`https://img.youtube.com/vi/${yid}/default.jpg`}
                                      alt="Thumbnail"
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <VideoIcon size={12} className="dark:text-byz-blue-400 text-[#9c8989]" />
                                  )}
                                  <div className="absolute inset-0 dark:bg-byz-blue-950 bg-[#e4d8c1]/20 flex items-center justify-center">
                                    <Play size={10} fill="currentColor" className="dark:text-white text-[#3b2f2f]" />
                                  </div>
                                </div>
                                <div className="truncate">
                                  <p className="text-xs font-semibold dark:text-byz-blue-100 text-[#4a3b3b] select-all leading-tight truncate">{video.title}</p>
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[9px] dark:text-byz-blue-400 text-[#9c8989] hover:text-gold-400 flex items-center space-x-1 mt-0.5 truncate"
                                  >
                                    <span className="truncate">{video.url}</span>
                                    <ExternalLink size={8} />
                                  </a>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeleteVideo(video.id)}
                                className="p-2 dark:text-byz-blue-400 text-[#9c8989] hover:text-red-500 rounded-lg hover:dark:dark:bg-byz-blue-900 bg-[#d8c8ac]/40 bg-[#e4d8c1] transition-colors cursor-pointer"
                                title="Delete video"
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
              </div>)}
            </section>

          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={goBack}
            className="inline-flex items-center space-x-2 dark:text-byz-blue-400 text-[#9c8989] hover:text-gold-400 text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Back to Site-ul Principal</span>
          </button>
        </div>

      </div>
    </div>
  );
}
