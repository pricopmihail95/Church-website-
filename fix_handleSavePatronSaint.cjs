const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const anchor = 'const handleSaveMainPhotoUrl = async () => {';

const insert = `  const handleSavePatronSaint = async () => {
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

content = content.replace(anchor, insert + anchor);
fs.writeFileSync('src/components/AdminPanel.tsx', content);
