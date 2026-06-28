import fs from 'fs';

let hist = fs.readFileSync('src/components/HistorySection.tsx', 'utf8');
hist = hist.replace(/bg-\[#3644A5\]\/10/g, 'bg-[#3644A5]/95');
hist = hist.replace(/border-\[#3644A5\]\/20/g, 'border-[#3644A5]/30');
hist = hist.replace(/text-stone-900/g, 'text-white');
// The subtitle is text-stone-900, we need to change to text-stone-200
hist = hist.replace(/text-stone-900 dark:text-byz-blue-200/g, 'text-stone-200 dark:text-byz-blue-200');
fs.writeFileSync('src/components/HistorySection.tsx', hist);

let gal = fs.readFileSync('src/components/GallerySection.tsx', 'utf8');
gal = gal.replace(/bg-\[#3644A5\]\/10/g, 'bg-[#3644A5]/95');
gal = gal.replace(/border-\[#3644A5\]\/20/g, 'border-[#3644A5]/30');
gal = gal.replace(/text-stone-900/g, 'text-white');
gal = gal.replace(/text-stone-700/g, 'text-stone-200');
fs.writeFileSync('src/components/GallerySection.tsx', gal);

let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');
cal = cal.replace(/bg-\[#3644A5\]\/10/g, 'bg-[#3644A5]/95');
cal = cal.replace(/border-\[#3644A5\]\/20/g, 'border-[#3644A5]/30');
cal = cal.replace(/text-stone-900/g, 'text-white');
cal = cal.replace(/text-stone-700/g, 'text-stone-200');
fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);

let don = fs.readFileSync('src/components/PangarDonations.tsx', 'utf8');
don = don.replace(/bg-\[#3644A5\]\/10/g, 'bg-[#3644A5]/95');
don = don.replace(/border-\[#3644A5\]\/20/g, 'border-[#3644A5]/30');
don = don.replace(/text-stone-900/g, 'text-white');
don = don.replace(/text-stone-700/g, 'text-stone-200');
fs.writeFileSync('src/components/PangarDonations.tsx', don);

let qt = fs.readFileSync('src/components/SpiritualQuotes.tsx', 'utf8');
qt = qt.replace(/bg-\[#3644A5\]\/10/g, 'bg-[#3644A5]/95');
qt = qt.replace(/border-\[#3644A5\]\/20/g, 'border-[#3644A5]/30');
qt = qt.replace(/text-stone-900/g, 'text-white');
qt = qt.replace(/text-stone-700/g, 'text-stone-200');
fs.writeFileSync('src/components/SpiritualQuotes.tsx', qt);

