import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/components', function(filepath) {
  if (filepath.endsWith('.tsx')) {
    let content = fs.readFileSync(filepath, 'utf8');
    let newContent = content.replace(/\[#4D6D8A\]/g, '[#3644A5]');
    if (filepath.includes('Footer.tsx')) {
      newContent = newContent.replace(/bg-byz-blue-950/g, 'bg-[#3644A5] dark:bg-byz-blue-950');
    }
    if (content !== newContent) {
      fs.writeFileSync(filepath, newContent);
      console.log(`Updated ${filepath}`);
    }
  }
});
