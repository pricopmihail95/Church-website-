import fs from 'fs';

let admin = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Replace the services header to be clickable to toggle
const servicesHeaderRegex = /<div className="flex items-center space-x-3">\s*<div className="p-2\.5 bg-gold-500\/10 text-gold-400 border border-gold-500\/20 rounded-xl">\s*<Calendar size=\{18\} \/>\s*<\/div>\s*<div>\s*<h2 className="font-display font-bold text-lg text-gold-400">Programul Sfintelor Slujbe<\/h2>\s*<p className="font-serif text-xs text-byz-blue-300 italic">Administrează în timp real slots, zile și ore pentru enoriași<\/p>\s*<\/div>\s*<\/div>/m;

const servicesHeaderReplacement = `<div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsServicesOpen(!isServicesOpen)}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-gold-400">Programul Sfintelor Slujbe</h2>
                      <p className="font-serif text-xs text-byz-blue-300 italic">Administrează în timp real slots, zile și ore pentru enoriași</p>
                    </div>
                  </div>
                  <div className="text-gold-400">
                    {isServicesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>`;

admin = admin.replace(servicesHeaderRegex, servicesHeaderReplacement);

// Wrap the contents of services
admin = admin.replace(
  '<div className="flex items-center space-x-2">',
  '{isServicesOpen && (<>\n                <div className="flex items-center space-x-2">'
);

// Find the end of the services section. It ends right before "Administrare Galerie"
// Let's insert the closing tag right before the gallery header wrapper.
const gallerySectionStartRegex = /<div className="p-6 sm:p-8 border-b border-byz-blue-800\/40 bg-byz-blue-950\/30">/g;

// There are multiple sections: Announcement, Services, Gallery.
// The Services section is wrapped in `<div className="p-6 sm:p-8 border-b border-byz-blue-800/40">`
// Let's just find the closing `</div>` before the next section.
admin = admin.replace(
  '              </div>\n\n              {/* 3. Galerie (Foto & Video) */}',
  '              </>)}\n              </div>\n\n              {/* 3. Galerie (Foto & Video) */}'
);

// Add the Logos Dropbar section before the gallery.
const logoSectionJSX = `
              {/* Logos Section */}
              <div className="p-6 sm:p-8 border-b border-byz-blue-800/40 bg-byz-blue-950/20">
                <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsLogosOpen(!isLogosOpen)}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                      <ImageIcon size={18} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-gold-400">Logo-uri</h2>
                      <p className="font-serif text-xs text-byz-blue-300 italic">Administrează logoul principal și cel al autorității canonice</p>
                    </div>
                  </div>
                  <div className="text-gold-400">
                    {isLogosOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                {isLogosOpen && (
                  <div className="mt-8 space-y-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-gold-400 uppercase tracking-widest mb-2">
                        Logo Principal (Stânga Sus)
                      </label>
                      <input
                        type="text"
                        placeholder="URL-ul imaginii (ex: https://...)"
                        value={logos.mainLogoUrl}
                        onChange={(e) => setLogos({...logos, mainLogoUrl: e.target.value})}
                        className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm text-byz-blue-100 focus:outline-none transition-all"
                      />
                      <p className="font-serif text-[10px] text-byz-blue-400 italic mt-1.5">Dacă este lăsat gol, se va folosi emblema implicită.</p>
                      {logos.mainLogoUrl && (
                        <img src={logos.mainLogoUrl} alt="Preview" className="mt-3 h-16 w-16 object-contain rounded-full border border-byz-blue-800" />
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gold-400 uppercase tracking-widest mb-2">
                        Logo Autoritate Canonică (Card Subsol)
                      </label>
                      <input
                        type="text"
                        placeholder="URL-ul imaginii (ex: https://...)"
                        value={logos.canonicalLogoUrl}
                        onChange={(e) => setLogos({...logos, canonicalLogoUrl: e.target.value})}
                        className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm text-byz-blue-100 focus:outline-none transition-all"
                      />
                      <p className="font-serif text-[10px] text-byz-blue-400 italic mt-1.5">Dacă este lăsat gol, se va folosi emblema implicită.</p>
                      {logos.canonicalLogoUrl && (
                        <img src={logos.canonicalLogoUrl} alt="Preview" className="mt-3 h-16 w-16 object-contain rounded-full border border-byz-blue-800" />
                      )}
                    </div>
                  </div>
                )}
              </div>
`;

admin = admin.replace(
  '{/* 3. Galerie (Foto & Video) */}',
  logoSectionJSX + '\n              {/* 3. Galerie (Foto & Video) */}'
);

fs.writeFileSync('src/components/AdminPanel.tsx', admin);
