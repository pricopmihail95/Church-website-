import fs from 'fs';

let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');

cal = cal.replace(
  'services?: any[];\n}',
  'services?: any[];\n  canonicalLogoUrl?: string;\n}'
);

fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);
