import fs from 'fs';
let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');
cal = cal.replace(/\[#4D6D8A\]\/30\/80/g, '[#4D6D8A]/20');
fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);
