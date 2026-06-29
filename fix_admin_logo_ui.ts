import fs from 'fs';

let admin = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Replace the inputs with proper UI
const mainLogoRegex = /<input\s*type="text"\s*placeholder="URL-ul imaginii \(ex: https:\/\/...\)"\s*value=\{logos.mainLogoUrl\}\s*onChange=\{\(e\) => setLogos\(\{...logos, mainLogoUrl: e\.target\.value\}\)\}\s*className="w-full bg-byz-blue-950\/80 border border-byz-blue-800 focus:border-gold-500\/50 rounded-xl px-4 py-3 text-sm text-byz-blue-100 focus:outline-none transition-all"\s*\/>/g;

const mainLogoReplacement = `
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="URL-ul imaginii (ex: https://...)"
                          value={logos.mainLogoUrl}
                          onChange={(e) => setLogos({...logos, mainLogoUrl: e.target.value})}
                          className="flex-1 bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm text-byz-blue-100 focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveLogoUrl('main')}
                          className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors whitespace-nowrap shadow-md"
                        >
                          Salvează Link
                        </button>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-4">
                        <label className="cursor-pointer bg-byz-blue-950 hover:bg-byz-blue-900 border border-byz-blue-800 px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
                          {uploadingLogo === 'main' ? <Loader2 size={16} className="animate-spin text-gold-400" /> : <Upload size={16} className="text-gold-400" />}
                          <span className="text-xs uppercase font-bold tracking-wider text-byz-blue-100">Încarcă Poză (Fisier)</span>
                          <input type="file" accept="image/*" onChange={(e) => handleLogoUpload(e, 'main')} disabled={!!uploadingLogo} className="hidden" />
                        </label>
                      </div>
`;

admin = admin.replace(mainLogoRegex, mainLogoReplacement);

const canonicalLogoRegex = /<input\s*type="text"\s*placeholder="URL-ul imaginii \(ex: https:\/\/...\)"\s*value=\{logos.canonicalLogoUrl\}\s*onChange=\{\(e\) => setLogos\(\{...logos, canonicalLogoUrl: e\.target\.value\}\)\}\s*className="w-full bg-byz-blue-950\/80 border border-byz-blue-800 focus:border-gold-500\/50 rounded-xl px-4 py-3 text-sm text-byz-blue-100 focus:outline-none transition-all"\s*\/>/g;

const canonicalLogoReplacement = `
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="URL-ul imaginii (ex: https://...)"
                          value={logos.canonicalLogoUrl}
                          onChange={(e) => setLogos({...logos, canonicalLogoUrl: e.target.value})}
                          className="flex-1 bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm text-byz-blue-100 focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveLogoUrl('canonical')}
                          className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors whitespace-nowrap shadow-md"
                        >
                          Salvează Link
                        </button>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-4">
                        <label className="cursor-pointer bg-byz-blue-950 hover:bg-byz-blue-900 border border-byz-blue-800 px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
                          {uploadingLogo === 'canonical' ? <Loader2 size={16} className="animate-spin text-gold-400" /> : <Upload size={16} className="text-gold-400" />}
                          <span className="text-xs uppercase font-bold tracking-wider text-byz-blue-100">Încarcă Poză (Fisier)</span>
                          <input type="file" accept="image/*" onChange={(e) => handleLogoUpload(e, 'canonical')} disabled={!!uploadingLogo} className="hidden" />
                        </label>
                      </div>
`;

admin = admin.replace(canonicalLogoRegex, canonicalLogoReplacement);

fs.writeFileSync('src/components/AdminPanel.tsx', admin);
