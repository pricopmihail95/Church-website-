import fs from 'fs';

let don = fs.readFileSync('src/components/PangarDonations.tsx', 'utf8');
don = don.replace(/text-white dark:text-gold-50/g, 'text-stone-900 dark:text-gold-50');
fs.writeFileSync('src/components/PangarDonations.tsx', don);

let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');
cal = cal.replace(/text-white dark:text-gold-50/g, 'text-stone-900 dark:text-gold-50');
fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);

let sq = fs.readFileSync('src/components/SpiritualQuotes.tsx', 'utf8');
sq = sq.replace(/text-white dark:text-gold-50/g, 'text-stone-900 dark:text-gold-50');
fs.writeFileSync('src/components/SpiritualQuotes.tsx', sq);

let hist = fs.readFileSync('src/components/HistorySection.tsx', 'utf8');
hist = hist.replace(/text-white dark:text-gold-50/g, 'text-stone-900 dark:text-gold-50');
fs.writeFileSync('src/components/HistorySection.tsx', hist);

let gal = fs.readFileSync('src/components/GallerySection.tsx', 'utf8');
gal = gal.replace(/text-white dark:text-gold-50/g, 'text-stone-900 dark:text-gold-50');
fs.writeFileSync('src/components/GallerySection.tsx', gal);
