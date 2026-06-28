import fs from 'fs';
import path from 'path';

function fixHeadings(filepath: string) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // For h3 and h4 tags inside the dark cards, they currently have text-white.
  // The user requested: "auriu pe la titluri"
  content = content.replace(/className="font-display([^"]*) text-white (dark:text-[a-z0-9-]+)/g, 'className="font-display$1 text-gold-400 $2');
  content = content.replace(/className="font-display([^"]*) text-white"/g, 'className="font-display$1 text-gold-400"');

  // Also catch where text-white is before font-display
  content = content.replace(/className="([^"]*)text-white([^"]*) font-display/g, 'className="$1text-gold-400$2 font-display');

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Updated headings in ${filepath}`);
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

walkDir('./src/components', fixHeadings);
