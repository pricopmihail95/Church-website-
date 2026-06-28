import fs from 'fs';
const files = ['src/components/HistorySection.tsx', 'src/components/PangarDonations.tsx', 'src/components/LiturgicalCalendar.tsx', 'src/components/GallerySection.tsx', 'src/components/ExplanatoryCards.tsx', 'src/components/IntroductionSection.tsx', 'src/components/SpiritualQuotes.tsx'];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/className=\"py-(\d+) bg-white/g, 'className=\"py-$1 bg-transparent');
  c = c.replace(/className=\"py-(\d+) bg-byz-blue-50\/\d+/g, 'className=\"py-$1 bg-transparent');
  c = c.replace(/className=\"py-(\d+) bg-gradient-to-b from-byz-blue-50\/20 to-byz-blue-100\/30/g, 'className=\"py-$1 bg-transparent');
  fs.writeFileSync(f, c);
});
