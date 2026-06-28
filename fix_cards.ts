import fs from 'fs';

const blueCardBg = "bg-[#4D6D8A]/95";
const blueCardBorder = "border-[#4D6D8A]/30";
const transparentCardBg = "bg-[#4D6D8A]/10";
const transparentCardBorder = "border-[#4D6D8A]/20";

// 1. ContactSection
let contact = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');
contact = contact.replace(/bg-stone-800\/95/g, blueCardBg);
contact = contact.replace(/border-stone-700\/50/g, blueCardBorder);
fs.writeFileSync('src/components/ContactSection.tsx', contact);

// 2. ExplanatoryCards
let exp = fs.readFileSync('src/components/ExplanatoryCards.tsx', 'utf8');
exp = exp.replace(/bg-white/g, blueCardBg);
exp = exp.replace(/border-byz-blue-100/g, blueCardBorder);
exp = exp.replace(/text-stone-900/g, 'text-white');
exp = exp.replace(/text-stone-600/g, 'text-stone-100');
exp = exp.replace(/text-stone-400/g, 'text-stone-300');
exp = exp.replace(/border-stone-100/g, 'border-white/10');
fs.writeFileSync('src/components/ExplanatoryCards.tsx', exp);

// 3. PangarDonations
let don = fs.readFileSync('src/components/PangarDonations.tsx', 'utf8');
don = don.replace(/bg-white/g, blueCardBg);
don = don.replace(/border-byz-blue-100/g, blueCardBorder);
don = don.replace(/text-stone-900/g, 'text-white');
don = don.replace(/text-stone-800/g, 'text-white');
don = don.replace(/text-stone-700/g, 'text-stone-100');
don = don.replace(/text-stone-600/g, 'text-stone-200');
don = don.replace(/text-stone-500/g, 'text-stone-300');
don = don.replace(/border-byz-blue-50/g, 'border-white/10');
don = don.replace(/bg-byz-blue-50/g, 'bg-white/10');
fs.writeFileSync('src/components/PangarDonations.tsx', don);

// 4. LiturgicalCalendar
let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');
cal = cal.replace(/bg-white/g, blueCardBg);
cal = cal.replace(/bg-byz-blue-50\/20/g, blueCardBg);
cal = cal.replace(/text-stone-900/g, 'text-white');
cal = cal.replace(/text-stone-800/g, 'text-white');
cal = cal.replace(/text-stone-700/g, 'text-stone-100');
cal = cal.replace(/text-stone-600/g, 'text-stone-200');
cal = cal.replace(/text-stone-500/g, 'text-stone-300');
cal = cal.replace(/text-byz-blue-900/g, 'text-white');
cal = cal.replace(/text-byz-blue-950/g, 'text-white');
cal = cal.replace(/border-byz-blue-100/g, blueCardBorder);
cal = cal.replace(/border-byz-blue-50/g, 'border-white/10');
cal = cal.replace(/bg-byz-blue-50/g, 'bg-white/10');
cal = cal.replace(/bg-rose-50/g, 'bg-rose-500/20');
cal = cal.replace(/border-rose-100/g, 'border-rose-500/30');
cal = cal.replace(/text-rose-650/g, 'text-rose-200');
fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);

// 5. HistorySection
let hist = fs.readFileSync('src/components/HistorySection.tsx', 'utf8');
hist = hist.replace(/bg-byz-blue-50\/20/g, blueCardBg);
hist = hist.replace(/border-byz-blue-100\/60/g, blueCardBorder);
hist = hist.replace(/<div className="text-center max-w-3xl mx-auto mb-16">/, `<div className="text-center max-w-3xl mx-auto mb-16 ${transparentCardBg} dark:bg-transparent p-8 rounded-3xl border ${transparentCardBorder} dark:border-none backdrop-blur-sm">`);
hist = hist.replace(/bg-white/g, 'bg-white/10');
hist = hist.replace(/border-byz-blue-100\/50/g, 'border-white/10');
hist = hist.replace(/text-stone-900/g, 'text-white');
hist = hist.replace(/text-stone-700/g, 'text-stone-100');
hist = hist.replace(/text-stone-650/g, 'text-stone-900'); // Restore the title subtitle to dark!
// Wait! The title (text-stone-900) got replaced to text-white. Let's fix it back for the title:
hist = hist.replace(/<h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-white/g, '<h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-stone-900');
fs.writeFileSync('src/components/HistorySection.tsx', hist);

// 6. GallerySection
let gal = fs.readFileSync('src/components/GallerySection.tsx', 'utf8');
gal = gal.replace(/bg-white/g, blueCardBg);
gal = gal.replace(/bg-byz-blue-50\/20/g, blueCardBg);
gal = gal.replace(/border-byz-blue-100/g, blueCardBorder);
gal = gal.replace(/<div className="text-center mb-12">/, `<div className="text-center mb-12 ${transparentCardBg} dark:bg-transparent p-8 rounded-3xl border ${transparentCardBorder} dark:border-none backdrop-blur-sm max-w-3xl mx-auto">`);
gal = gal.replace(/<div className="lg:col-span-5 space-y-6">/, `<div className="lg:col-span-5 space-y-6 ${transparentCardBg} dark:bg-transparent p-8 rounded-3xl border ${transparentCardBorder} dark:border-none backdrop-blur-sm">`);
gal = gal.replace(/text-stone-900/g, 'text-white');
gal = gal.replace(/text-stone-850/g, 'text-white');
gal = gal.replace(/text-stone-800/g, 'text-white');
gal = gal.replace(/text-stone-700/g, 'text-stone-100');
gal = gal.replace(/text-stone-600/g, 'text-stone-200');
gal = gal.replace(/text-stone-500/g, 'text-stone-300');
gal = gal.replace(/border-byz-blue-50/g, 'border-white/10');
// Title fix: 
// The title text was text-stone-900 which became text-white. The user wants it legible, but text-stone-900 is good on the transparent cream card.
fs.writeFileSync('src/components/GallerySection.tsx', gal);

// 7. SpiritualQuotes
let qt = fs.readFileSync('src/components/SpiritualQuotes.tsx', 'utf8');
qt = qt.replace(/bg-white/g, blueCardBg);
qt = qt.replace(/border-byz-blue-100\/80/g, blueCardBorder);
qt = qt.replace(/text-stone-900/g, 'text-white');
qt = qt.replace(/text-stone-800/g, 'text-white');
qt = qt.replace(/text-stone-600/g, 'text-stone-100');
qt = qt.replace(/border-byz-blue-100\/50/g, 'border-white/10');
qt = qt.replace(/border-byz-blue-100\/45/g, 'border-white/10');
qt = qt.replace(/border-byz-blue-100\/40/g, 'border-white/10');
qt = qt.replace(/bg-byz-blue-50\/80/g, 'bg-white/10');
qt = qt.replace(/bg-byz-blue-50/g, 'bg-white/10');
qt = qt.replace(/text-byz-blue-600/g, 'text-white');
qt = qt.replace(/text-byz-blue-800/g, 'text-white');
// Same title logic for SpiritualQuotes if any
fs.writeFileSync('src/components/SpiritualQuotes.tsx', qt);

// 8. IntroductionSection
let intro = fs.readFileSync('src/components/IntroductionSection.tsx', 'utf8');
intro = intro.replace(/bg-white/g, blueCardBg);
intro = intro.replace(/border-byz-blue-100/g, blueCardBorder);
intro = intro.replace(/text-stone-900/g, 'text-white');
intro = intro.replace(/text-stone-700/g, 'text-stone-100');
fs.writeFileSync('src/components/IntroductionSection.tsx', intro);
