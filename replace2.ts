import fs from 'fs';
let c = fs.readFileSync('src/components/Hero.tsx', 'utf8');
c = c.replace(/text-white/g, 'text-stone-900 dark:text-white');
fs.writeFileSync('src/components/Hero.tsx', c);
