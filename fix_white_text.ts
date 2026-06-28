import fs from 'fs';
import path from 'path';

function fixWhiteText(filepath: string) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Fix main section wrappers which had text-white (we want text-stone-900 on the main ivory background)
  content = content.replace(/<section(.*?)text-white/g, '<section$1text-stone-900');
  
  // Fix specific known text-white that should be text-stone-900 because they are not inside cards
  if (filepath.includes('HistorySection.tsx')) {
    content = content.replace(/text-white dark:text-byz-blue-200/g, 'text-stone-800 dark:text-byz-blue-200'); // Subtitle
  }

  // Cards are currently bg-stone-900/65. So text inside them MUST be text-white or text-stone-200.
  // The script previously changed things to text-white inside the cards, which is fine!
  // But wait, the mobile toggles for Contact and Donations are outside the cards or they are cards themselves?
  // "lg:hidden bg-stone-900/65 ... " those are cards. So text-white is correct there.

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Fixed section text in ${filepath}`);
  }
}

function walkDir(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.tsx')) callback(dirPath);
    }
  });
}

walkDir('./src/components', fixWhiteText);
