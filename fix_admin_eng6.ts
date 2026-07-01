import fs from 'fs';

let text = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const translations: Record<string, string> = {
  'ASCUNSĂ / HIDDEN': 'HIDDEN',
  'Titlu Înregistrare Video': 'Video Recording Title'
};

for (const [ro, en] of Object.entries(translations)) {
  text = text.split(ro).join(en);
}

fs.writeFileSync('src/components/AdminPanel.tsx', text);
