const fs = require('fs');
let content = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');

content = content.replace(
  /interface LiturgicalCalendarProps \{[\s\S]*?canonicalLogoUrl\?: string;\n\}/,
  `interface LiturgicalCalendarProps {
  lang: Language;
  services?: any[];
  canonicalLogoUrl?: string;
  parishData?: any;
}`
);

content = content.replace(
  /export default function LiturgicalCalendar\(\{ lang, services, canonicalLogoUrl \}: LiturgicalCalendarProps\) \{/,
  `export default function LiturgicalCalendar({ lang, services, canonicalLogoUrl, parishData = {} }: LiturgicalCalendarProps) {`
);

fs.writeFileSync('src/components/LiturgicalCalendar.tsx', content);
