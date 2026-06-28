import fs from 'fs';

const files = [
  'src/components/HistorySection.tsx',
  'src/components/GallerySection.tsx',
  'src/components/LiturgicalCalendar.tsx',
  'src/components/PangarDonations.tsx',
  'src/components/SpiritualQuotes.tsx'
];

files.forEach(filepath => {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/bg-\[#3644A5\]\/10/g, 'bg-[#3644A5]/95');
  content = content.replace(/border-\[#3644A5\]\/20/g, 'border-[#3644A5]/30');
  content = content.replace(/text-stone-900/g, 'text-white');
  // the p tags in header blocks used to be text-stone-700, so we changed them to text-white just now, 
  // but wait, some p tags were `text-stone-700` previously! Oh, I changed them in my previous `fix_cards.ts` to `text-stone-100` or `text-stone-200`.
  // Just in case, let's fix any text-stone-700 or text-stone-800 to text-stone-200
  content = content.replace(/text-stone-700/g, 'text-stone-200');
  content = content.replace(/text-stone-800/g, 'text-stone-100');
  fs.writeFileSync(filepath, content);
  console.log(`Fixed headers in ${filepath}`);
});

