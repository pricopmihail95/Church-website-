import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/components', function(filepath) {
  if (filepath.endsWith('.tsx')) {
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;

    // Replace card backgrounds
    // Using a subtle shadow and backdrop-blur to give a glass/glow effect
    content = content.replace(/bg-\[#3644A5\]\/95/g, 'bg-stone-800/80 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.15)]');
    content = content.replace(/border-\[#3644A5\]\/30/g, 'border-stone-700/50');
    
    if (filepath.includes('Footer.tsx')) {
      content = content.replace(/bg-\[#3644A5\]/g, 'bg-stone-900');
    }

    if (content !== original) {
      fs.writeFileSync(filepath, content);
      console.log(`Updated ${filepath}`);
    }
  }
});

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/bg-\[#FDFBF7\]/g, 'bg-[#EAE4D3]');
fs.writeFileSync('src/App.tsx', app);

let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
nav = nav.replace(/bg-\[#FDFBF7\]\/90/g, 'bg-[#EAE4D3]/90');
fs.writeFileSync('src/components/Navbar.tsx', nav);
