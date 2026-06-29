import fs from 'fs';

// 1. Fix Canonical Authority Card in LiturgicalCalendar.tsx
let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');
cal = cal.replace(
  'className="bg-gradient-to-br from-byz-blue-900 to-byz-blue-950 border border-gold-500/25 p-6 rounded-2xl text-center relative overflow-hidden group"',
  'className="bg-stone-900 shadow-xl border border-stone-800 p-6 rounded-3xl text-center relative overflow-hidden group"'
);
// Also the text color inside canonical authority card should adapt to the stone-900 background
cal = cal.replace(
  '<h4 className="font-display text-xs font-bold text-white leading-tight uppercase tracking-wider mb-2">',
  '<h4 className="font-display text-xs font-bold text-stone-100 leading-tight uppercase tracking-wider mb-2">'
);
fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);

// 2. Fix main title in Hero.tsx
let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
// The user wants it dark/black (culoarea cardurilor = stone-900).
// Wait, the main title is:
// className="font-display text-3xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-white font-medium tracking-tight leading-[1.1] mb-6"
// It's already text-stone-900. Wait, maybe the user means on mobile it doesn't look dark?
// Ah! "Titlul principal de pe pagina nu se vede prea bine, este auriu poate crem : St Hybald's Antiochian Orthodox Christian Community"
// Wait, is there another title? Let's check src/data.ts for "St Hybald's Antiochian"
// It is `heroTitle`. So it IS in Hero.tsx.
// Let's ensure it's text-stone-900.
hero = hero.replace(
  /className="font-display text-3xl sm:text-5xl lg:text-6xl text-gold-400 dark:text-white font-medium tracking-tight leading-\[1\.1\] mb-6"/,
  'className="font-display text-3xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight leading-[1.1] mb-6"'
);
hero = hero.replace(
  /className="font-display text-3xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-white font-medium tracking-tight leading-\[1\.1\] mb-6"/,
  'className="font-display text-3xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight leading-[1.1] mb-6"'
);
// Also tagline "St Hybald's..."
hero = hero.replace(
  /className="font-sans text-xs sm:text-sm tracking-\[0\.25em\] font-semibold text-gold-400 uppercase mb-3"/,
  'className="font-sans text-xs sm:text-sm tracking-[0.25em] font-semibold text-stone-900 uppercase mb-3"'
);
hero = hero.replace(
  /className="font-sans text-xs sm:text-sm tracking-\[0\.25em\] font-semibold text-stone-900 dark:text-gold-400 uppercase mb-3"/,
  'className="font-sans text-xs sm:text-sm tracking-[0.25em] font-semibold text-stone-900 uppercase mb-3"'
);

fs.writeFileSync('src/components/Hero.tsx', hero);

// 3. Fix "The Shepherd's welcome" card in IntroductionSection.tsx
let intro = fs.readFileSync('src/components/IntroductionSection.tsx', 'utf8');
// Look for bg-gradient-to-br or any other blue gradient
intro = intro.replace(
  /className="bg-gradient-to-br from-byz-blue-900 to-byz-blue-950 border border-gold-500\/30 p-8 sm:p-10 rounded-3xl shadow-xl mb-12 relative overflow-hidden text-stone-100"/g,
  'className="bg-stone-900 shadow-xl border border-stone-800 p-8 sm:p-10 rounded-3xl mb-12 relative overflow-hidden text-stone-100"'
);

// We should also replace the main bg-gradient of that card if it's there
intro = intro.replace(
  /className="bg-stone-900 shadow-xl dark:bg-byz-blue-900\/40 border border-stone-800 dark:border-byz-blue-800\/60 p-8 sm:p-10 rounded-3xl mb-12 relative overflow-hidden text-stone-100"/g,
  'className="bg-stone-900 shadow-xl border border-stone-800 p-8 sm:p-10 rounded-3xl mb-12 relative overflow-hidden text-stone-100"'
);

fs.writeFileSync('src/components/IntroductionSection.tsx', intro);
