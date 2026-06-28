import fs from 'fs';
import path from 'path';

const ivoryBg = 'bg-[#DFD5C4]'; // Deep rich ivory/parchment
const ivoryBgTranslucent = 'bg-[#DFD5C4]/95';

function updateFile(filepath: string) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // 1. Page Backgrounds
  content = content.replace(/bg-\[#EAE4D3\]/g, ivoryBg);
  content = content.replace(/bg-\[#EAE4D3\]\/90/g, ivoryBgTranslucent);
  content = content.replace(/border-stone-700\/50/g, 'border-[#C8BCA6]/40'); // Soft ivory border
  
  // 2. Cards Backgrounds
  content = content.replace(/bg-stone-800\/80 backdrop-blur-md shadow-\[0_0_25px_rgba\(0,0,0,0\.15\)\]/g, 
                            'bg-stone-900/65 backdrop-blur-md shadow-[0_0_20px_rgba(212,171,21,0.12)]');

  // Also replace any remaining bg-[#3644A5]/95 (if any were missed)
  content = content.replace(/bg-\[#3644A5\]\/95/g, 'bg-stone-900/65 backdrop-blur-md shadow-[0_0_20px_rgba(212,171,21,0.12)]');
  
  // 3. Headings on the page (to Gold-900)
  // Look for text-stone-900 or text-white dark:text-gold-50 inside <h2> or <h3>
  // Usually they are like `text-stone-900 dark:text-gold-50` or `text-stone-900 dark:text-white`.
  content = content.replace(/text-stone-900 dark:text-gold-50/g, 'text-gold-900 dark:text-gold-50');
  content = content.replace(/text-white dark:text-gold-50/g, 'text-gold-900 dark:text-gold-50');
  content = content.replace(/text-stone-900 dark:text-white/g, 'text-gold-900 dark:text-white');

  // Small notes/accents
  // If there are gold-500/10 backgrounds or text-gold-700, they are fine.

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Updated ${filepath}`);
  }
}

['src/App.tsx', 'src/components/Navbar.tsx'].forEach(updateFile);

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

walkDir('./src/components', updateFile);
