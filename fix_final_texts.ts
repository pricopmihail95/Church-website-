import fs from 'fs';

let hist = fs.readFileSync('src/components/HistorySection.tsx', 'utf8');
hist = hist.replace(/text-gold-300 dark:text-gold-300 leading-relaxed/g, 'text-gold-400 dark:text-gold-400 leading-relaxed text-[13px] sm:text-sm font-semibold');
fs.writeFileSync('src/components/HistorySection.tsx', hist);

let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');
cal = cal.replace(/text-byz-blue-750/g, 'text-gold-400');
cal = cal.replace(/text-byz-blue-700/g, 'text-gold-400');
fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);
