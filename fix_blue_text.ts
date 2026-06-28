import fs from 'fs';

let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');

// For the text inside cards
cal = cal.replace(/text-byz-blue-750/g, 'text-gold-400');
cal = cal.replace(/text-byz-blue-700 dark:text-byz-blue-300 border border-stone-800 dark:border-byz-blue-900/g, 'text-gold-400 dark:text-gold-400 border border-stone-800 dark:border-stone-800');
// The one on the main page (line 39)
cal = cal.replace(/bg-byz-blue-50 dark:bg-byz-blue-900\/60 text-byz-blue-700 dark:text-byz-blue-300/g, 'bg-gold-500/10 dark:bg-gold-500/15 text-gold-700 dark:text-gold-300');

fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);

let hist = fs.readFileSync('src/components/HistorySection.tsx', 'utf8');
hist = hist.replace(/text-gold-700 dark:text-gold-300 leading-relaxed/g, 'text-gold-300 dark:text-gold-300 leading-relaxed');
hist = hist.replace(/bg-white\/10 dark:bg-byz-blue-950\/80 p-4 rounded-2xl border border-white\/10/g, 'bg-stone-800/50 p-4 rounded-2xl border border-stone-700/50');
fs.writeFileSync('src/components/HistorySection.tsx', hist);
