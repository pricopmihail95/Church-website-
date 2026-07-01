const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  /const handleSavePatronSaint = async \(\) => \{\n    try \{\n      setSaving\(true\);\n      await saveParishData\(\{ patronSaint \}\);\n      showSuccess\(\);\n    \} catch \(error\) \{\n      console\.error\('Error saving patron saint:', error\);\n      alert\('Failed to save link'\);\n    \} finally \{\n      setSaving\(false\);\n    \}\n  \};/,
  `const handleSavePatronSaint = async () => {
    try {
      setSaving(true);
      await saveParishData({ announcement, services, galleryPhotos, galleryVideos, logos, mainPhotoUrl, patronSaint });
      setGalleryStatus({ type: 'success', message: 'Patron saint successfully saved online!' });
    } catch (error) {
      console.error('Error saving patron saint:', error);
      setGalleryStatus({ type: 'error', message: 'Failed to save link' });
    } finally {
      setSaving(false);
    }
  };`
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
