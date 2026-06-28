import fs from 'fs';

let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');

footer = footer.replace(/text-byz-blue-200/g, 'text-stone-300');
footer = footer.replace(/text-byz-blue-300/g, 'text-stone-400');
footer = footer.replace(/text-byz-blue-400/g, 'text-stone-400');
footer = footer.replace(/text-byz-blue-500/g, 'text-stone-500');
footer = footer.replace(/border-byz-blue-900\/60/g, 'border-stone-800');
footer = footer.replace(/border-byz-blue-900/g, 'border-stone-800');
footer = footer.replace(/bg-byz-blue-900\/30/g, 'bg-stone-800/30');

fs.writeFileSync('src/components/Footer.tsx', footer);
