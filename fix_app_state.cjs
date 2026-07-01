const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add parishData state
content = content.replace(
  /const \[logos, setLogos\] = useState<\{mainLogoUrl\?: string, canonicalLogoUrl\?: string\}>\(\{ mainLogoUrl: "", canonicalLogoUrl: "" \}\);/,
  `const [logos, setLogos] = useState<{mainLogoUrl?: string, canonicalLogoUrl?: string}>({ mainLogoUrl: "", canonicalLogoUrl: "" });\n  const [parishData, setParishData] = useState<any>({});`
);

// Update state on fetch
content = content.replace(
  /if \(data.logos\) setLogos\(data.logos\);/,
  `if (data.logos) setLogos(data.logos);\n        setParishData(data);`
);

// Pass to LiturgicalCalendar
content = content.replace(
  /<LiturgicalCalendar lang=\{lang\} services=\{servicesList\} canonicalLogoUrl=\{logos.canonicalLogoUrl\} \/>/,
  `<LiturgicalCalendar lang={lang} services={servicesList} canonicalLogoUrl={logos.canonicalLogoUrl} parishData={parishData} />`
);

fs.writeFileSync('src/App.tsx', content);
