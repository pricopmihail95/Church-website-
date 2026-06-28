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
    
    // The previous replace left things like `... shadow-[...] ... shadow-sm ...`
    // Let's strip out the redundant tailwind shadows where our custom shadow is present.
    content = content.replace(/shadow-\[0_0_25px_rgba\(0,0,0,0\.15\)\](.*?)shadow-(sm|md|lg|xl|2xl)/g, 'shadow-[0_0_25px_rgba(0,0,0,0.15)]$1');
    content = content.replace(/shadow-(sm|md|lg|xl|2xl)(.*?)shadow-\[0_0_25px_rgba\(0,0,0,0\.15\)\]/g, '$2shadow-[0_0_25px_rgba(0,0,0,0.15)]');

    fs.writeFileSync(filepath, content);
  }
});
