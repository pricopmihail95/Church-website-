import fs from 'fs';

let admin = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Add state for uploadingLogo
if (!admin.includes('const [uploadingLogo, setUploadingLogo]')) {
  admin = admin.replace(
    'const [uploadingPhoto, setUploadingPhoto] = useState(false);',
    'const [uploadingPhoto, setUploadingPhoto] = useState(false);\n  const [uploadingLogo, setUploadingLogo] = useState<"main" | "canonical" | null>(null);'
  );
}

// Add handleLogoUpload function
const logoUploadCode = `
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
        const storageRef = ref(storage, \`gallery/\${photoId}.jpg\`);
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
      
      // Auto-save direct în Firestore
      await saveParishData({ announcement, services, galleryPhotos, galleryVideos, logos: newLogos });
      setGalleryStatus({ type: 'success', message: 'Logoul a fost încărcat și salvat online cu succes!' });
    } catch (err) {
      console.error('Error handling logo upload:', err);
      setGalleryStatus({ type: 'error', message: 'Eroare la procesare: ' + (err instanceof Error ? err.message : String(err)) });
    } finally {
      setUploadingLogo(null);
      if (e.target) e.target.value = '';
    }
  };

  const handleSaveLogoUrl = async (type: 'main' | 'canonical') => {
    await saveParishData({ announcement, services, galleryPhotos, galleryVideos, logos });
    setGalleryStatus({ type: 'success', message: 'Logoul a fost salvat online cu succes!' });
  };
`;

if (!admin.includes('handleLogoUpload')) {
  admin = admin.replace(
    'const handleAddPhotoByUrl = async () => {',
    logoUploadCode + '\n  const handleAddPhotoByUrl = async () => {'
  );
}

fs.writeFileSync('src/components/AdminPanel.tsx', admin);
