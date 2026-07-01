const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Replace all text-stone-300 with text-stone-700
content = content.replace(/text-stone-300/g, 'text-stone-700');

// Put it back to text-stone-300 for the preview cards text
content = content.replace(/dark:text-byz-blue-300 text-stone-700 font-mono text-\[11px\] font-semibold/g, 'dark:text-byz-blue-300 text-stone-300 font-mono text-[11px] font-semibold');

content = content.replace(/text-center py-4 font-serif text-xs dark:text-byz-blue-400 text-stone-\d00 italic/g, 'text-center py-4 font-serif text-xs dark:text-byz-blue-400 text-stone-400 italic');

fs.writeFileSync('src/components/AdminPanel.tsx', content);
