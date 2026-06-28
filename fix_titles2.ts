import fs from 'fs';

let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
// Fix heroTagline
hero = hero.replace('className="font-sans text-xs sm:text-sm tracking-[0.25em] font-semibold text-gold-400 uppercase mb-3"', 'className="font-sans text-xs sm:text-sm tracking-[0.25em] font-semibold text-stone-900 dark:text-gold-400 uppercase mb-3"');
// Fix heroTitle
hero = hero.replace('className="font-display text-3xl sm:text-5xl lg:text-6xl text-gold-400 dark:text-white font-medium tracking-tight leading-[1.1] mb-6"', 'className="font-display text-3xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-white font-medium tracking-tight leading-[1.1] mb-6"');

fs.writeFileSync('src/components/Hero.tsx', hero);

let intro = fs.readFileSync('src/components/IntroductionSection.tsx', 'utf8');
intro = intro.replace(
  'className="bg-gradient-to-br from-byz-blue-900 to-byz-blue-950 border border-gold-500/30 p-8 sm:p-10 rounded-3xl shadow-xl mb-12 relative overflow-hidden text-stone-100"',
  'className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-800/60 p-8 sm:p-10 rounded-3xl mb-12 relative overflow-hidden text-stone-100"'
);

fs.writeFileSync('src/components/IntroductionSection.tsx', intro);
