import fs from 'fs';
import path from 'path';

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

function updateFile(filepath: string) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Change all card backgrounds to bg-stone-900
  content = content.replace(/bg-stone-900\/65 backdrop-blur-md shadow-\[0_0_20px_rgba\(212,171,21,0\.12\)\]/g, 'bg-stone-900 shadow-xl');
  content = content.replace(/bg-stone-900\/65 backdrop-blur-md/g, 'bg-stone-900 shadow-xl');
  
  // Also fix border to stone-800 to match footer
  content = content.replace(/border-\[#C8BCA6\]\/40/g, 'border-stone-800');

  // Fix section headers that are text-gold-900, because on bg-stone-900 they won't be visible.
  content = content.replace(/text-gold-900/g, 'text-gold-400');
  
  // Fix subtitles that are text-stone-800 inside these cards.
  content = content.replace(/text-stone-800 dark:text-byz-blue-200/g, 'text-stone-300 dark:text-byz-blue-200');
  
  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Updated cards in ${filepath}`);
  }
}

walkDir('./src/components', updateFile);
