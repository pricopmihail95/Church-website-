import fs from 'fs';

let gal = fs.readFileSync('src/components/GallerySection.tsx', 'utf8');
gal = gal.replace(/text-white dark:text-stone-100/g, 'text-stone-900 dark:text-stone-100');
gal = gal.replace(/border-b border-stone-700\/50/g, 'border-b border-[#4D6D8A]/20');
fs.writeFileSync('src/components/GallerySection.tsx', gal);
