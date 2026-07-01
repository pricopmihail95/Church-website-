const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const mainPhotoLogic = `
  const handleSaveMainPhotoUrl = async () => {
    try {
      setSaving(true);
      await saveParishData({ mainPhotoUrl: mainPhotoUrl });
      showSuccess();
    } catch (error) {
      console.error('Error saving main photo URL:', error);
      alert('Failed to save link');
    } finally {
      setSaving(false);
    }
  };`;

const patronSaintLogic = `
  const handlePatronSaintUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingPatronSaint(true);
      setGalleryStatus({ type: '', message: '' });
      const compressedDataUrl = await compressImage(file);
      
      let finalUrl = '';
      try {
        const photoId = 'patronSaint_' + Date.now().toString();
        const storageRef = ref(storage, \`gallery/\${photoId}.jpg\`);
        await uploadString(storageRef, compressedDataUrl, 'data_url');
        finalUrl = await getDownloadURL(storageRef);
      } catch (uploadError) {
        console.warn('Firebase Storage upload failed, falling back to local base64 compression:', uploadError);
        finalUrl = compressedDataUrl;
      }
      
      const newPatron = { ...patronSaint, imageUrl: finalUrl };
      setPatronSaint(newPatron);
      await saveParishData({ patronSaint: newPatron });
      showSuccess();
    } catch (error) {
      console.error('Error uploading Patron Saint image:', error);
      alert('Failed to upload image. Image might be too large.');
    } finally {
      setUploadingPatronSaint(false);
    }
  };

  const handleSavePatronSaint = async () => {
    try {
      setSaving(true);
      await saveParishData({ patronSaint });
      showSuccess();
    } catch (error) {
      console.error('Error saving patron saint:', error);
      alert('Failed to save link');
    } finally {
      setSaving(false);
    }
  };
`;

content = content.replace(mainPhotoLogic, mainPhotoLogic + patronSaintLogic);
fs.writeFileSync('src/components/AdminPanel.tsx', content);
