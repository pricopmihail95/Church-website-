const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// 1. Fix main background
content = content.replace(/bg-gradient-to-br from-amber-50\/80 via-rose-50\/50 to-teal-50\/50/g, 'bg-[#DFD5C4]');

// 2. Fix cards (sections)
content = content.replace(/bg-stone-100\/50 backdrop-blur-md border dark:border-byz-blue-800 border-white\/60/g, 'bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/60');
// There's also some divs with bg-white/70 or similar
content = content.replace(/bg-white\/70/g, 'bg-stone-950');
content = content.replace(/border-white\/60/g, 'border-stone-800');

// 3. Fix text colors
// Currently text is text-stone-900, text-stone-800, text-stone-700, text-stone-500.
content = content.replace(/text-stone-900/g, 'text-stone-100');
content = content.replace(/text-stone-800/g, 'text-stone-200');
content = content.replace(/text-stone-700/g, 'text-stone-300');
content = content.replace(/text-stone-500/g, 'text-stone-400');
content = content.replace(/text-stone-400/g, 'text-stone-400');

// Buttons / headers background
content = content.replace(/bg-white/g, 'bg-stone-800');
content = content.replace(/border-stone-200/g, 'border-stone-700');

// Fix text-amber-700, dark:text-gold-400 -> text-gold-400 dark:text-gold-400
content = content.replace(/dark:text-gold-400 text-amber-700/g, 'text-gold-400 dark:text-gold-400');
content = content.replace(/dark:text-gold-500 text-amber-700/g, 'text-gold-500 dark:text-gold-500');

fs.writeFileSync('src/components/AdminPanel.tsx', content);
