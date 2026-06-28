import fs from 'fs';

let hist2 = fs.readFileSync('src/components/HistorySection.tsx', 'utf8');
hist2 = hist2.replace(/<h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-white">/, '<h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-stone-900 dark:text-gold-50">');
fs.writeFileSync('src/components/HistorySection.tsx', hist2);

let gal2 = fs.readFileSync('src/components/GallerySection.tsx', 'utf8');
gal2 = gal2.replace(/<h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white dark:text-gold-50">/, '<h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-gold-50">');
gal2 = gal2.replace(/<h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-white dark:text-gold-50">/, '<h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-stone-900 dark:text-gold-50">');
fs.writeFileSync('src/components/GallerySection.tsx', gal2);
