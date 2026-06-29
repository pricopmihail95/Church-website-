import fs from 'fs';

// 1. Update App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Add logos state
if (!app.includes('const [logos, setLogos]')) {
  app = app.replace(
    'const [servicesList, setServicesList] = useState<Service[]>(SERVICES_SCHEDULING);',
    'const [servicesList, setServicesList] = useState<Service[]>(SERVICES_SCHEDULING);\n  const [logos, setLogos] = useState<{mainLogoUrl?: string, canonicalLogoUrl?: string}>({ mainLogoUrl: "", canonicalLogoUrl: "" });'
  );
}

// Set logos on data fetch
if (!app.includes('setLogos(data.logos')) {
  app = app.replace(
    'setServicesList(data.services || SERVICES_SCHEDULING);',
    'setServicesList(data.services || SERVICES_SCHEDULING);\n        if (data.logos) setLogos(data.logos);'
  );
}

// Pass logos to Navbar
if (!app.includes('mainLogoUrl={logos.mainLogoUrl}')) {
  app = app.replace(
    /<Navbar \n\s*lang={lang} \n\s*setLang={setLang} \n\s*darkMode={darkMode} \n\s*setDarkMode={setDarkMode} \n\s*\/>/g,
    '<Navbar \n          lang={lang} \n          setLang={setLang} \n          darkMode={darkMode} \n          setDarkMode={setDarkMode}\n          mainLogoUrl={logos.mainLogoUrl} \n        />'
  );
}

// Pass logos to LiturgicalCalendar
if (!app.includes('canonicalLogoUrl={logos.canonicalLogoUrl}')) {
  app = app.replace(
    /<LiturgicalCalendar\n\s*lang={lang}\n\s*services={servicesList}\n\s*\/>/g,
    '<LiturgicalCalendar\n          lang={lang}\n          services={servicesList}\n          canonicalLogoUrl={logos.canonicalLogoUrl}\n        />'
  );
}
// For LiturgicalCalendar in mobile view
if (!app.includes('canonicalLogoUrl={logos.canonicalLogoUrl}') && app.includes('<LiturgicalCalendar lang={lang} services={servicesList} />')) {
  app = app.replace(
    /<LiturgicalCalendar lang={lang} services={servicesList} \/>/g,
    '<LiturgicalCalendar lang={lang} services={servicesList} canonicalLogoUrl={logos.canonicalLogoUrl} />'
  );
}


fs.writeFileSync('src/App.tsx', app);


// 2. Update Navbar.tsx
let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
if (!nav.includes('mainLogoUrl?: string;')) {
  nav = nav.replace(
    'setDarkMode: (d: boolean) => void;\n}',
    'setDarkMode: (d: boolean) => void;\n  mainLogoUrl?: string;\n}'
  );
  nav = nav.replace(
    'export default function Navbar({ lang, setLang, darkMode, setDarkMode }: NavbarProps) {',
    'export default function Navbar({ lang, setLang, darkMode, setDarkMode, mainLogoUrl }: NavbarProps) {'
  );
}

// Replace ArchdioceseLogo with custom image if provided
if (!nav.includes('mainLogoUrl ? (')) {
  nav = nav.replace(
    /<div className="mr-3 w-8 h-8 sm:w-10 sm:h-10 text-stone-900 dark:text-gold-400">[\s\S]*?<ArchdioceseLogo className="w-full h-full" \/>[\s\S]*?<\/div>/,
    `<div className="mr-3 w-8 h-8 sm:w-10 sm:h-10 text-stone-900 dark:text-gold-400 flex items-center justify-center">
              {mainLogoUrl ? (
                <img src={mainLogoUrl} alt="Logo" className="w-full h-full object-contain rounded-full" />
              ) : (
                <ArchdioceseLogo className="w-full h-full" />
              )}
            </div>`
  );
}
fs.writeFileSync('src/components/Navbar.tsx', nav);


// 3. Update LiturgicalCalendar.tsx
let cal = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');
if (!cal.includes('canonicalLogoUrl?: string;')) {
  cal = cal.replace(
    'services: Service[];\n}',
    'services: Service[];\n  canonicalLogoUrl?: string;\n}'
  );
  cal = cal.replace(
    'export default function LiturgicalCalendar({ lang, services }: LiturgicalCalendarProps) {',
    'export default function LiturgicalCalendar({ lang, services, canonicalLogoUrl }: LiturgicalCalendarProps) {'
  );
}

// Replace ArchdioceseLogo in LiturgicalCalendar
if (!cal.includes('canonicalLogoUrl ? (')) {
  cal = cal.replace(
    /<div className="mx-auto w-24 h-24 mb-4 text-white relative flex items-center justify-center bg-stone-950 rounded-full p-2 border border-gold-500\/30">[\s\S]*?<ArchdioceseLogo className="w-20 h-20 text-white" \/>[\s\S]*?<div className="absolute inset-0/m,
    `<div className="mx-auto w-24 h-24 mb-4 text-white relative flex items-center justify-center bg-stone-950 rounded-full p-2 border border-gold-500/30">
                {canonicalLogoUrl ? (
                  <img src={canonicalLogoUrl} alt="Canonical Logo" className="w-20 h-20 object-contain rounded-full" />
                ) : (
                  <ArchdioceseLogo className="w-20 h-20 text-white" />
                )}
                <div className="absolute inset-0`
  );
}
fs.writeFileSync('src/components/LiturgicalCalendar.tsx', cal);
