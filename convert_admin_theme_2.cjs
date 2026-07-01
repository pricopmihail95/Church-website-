const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Fix bg-stone-100/80
content = content.replace(/bg-stone-100\/80/g, 'bg-stone-800');
content = content.replace(/bg-stone-100\/90/g, 'bg-stone-800');
content = content.replace(/bg-stone-100/g, 'bg-stone-800');

// Fix borders
content = content.replace(/border-stone-300/g, 'border-stone-700');
content = content.replace(/border-stone-200/g, 'border-stone-700');
content = content.replace(/border-amber-200\/70/g, 'border-stone-800');
content = content.replace(/border-amber-200\/60/g, 'border-stone-800');
content = content.replace(/border-amber-200/g, 'border-stone-800');
content = content.replace(/border-white\/50/g, 'border-stone-800');
content = content.replace(/border-white\/60/g, 'border-stone-800');

// Fix some specific bg left
content = content.replace(/bg-white\/60/g, 'bg-stone-800/60');
content = content.replace(/bg-white\/80/g, 'bg-stone-800/80');

// Ensure text is right
content = content.replace(/text-stone-600/g, 'text-stone-400');
content = content.replace(/text-stone-500/g, 'text-stone-400');

fs.writeFileSync('src/components/AdminPanel.tsx', content);
