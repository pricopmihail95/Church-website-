const fs = require('fs');
let content = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');

// I will find the exact lines starting at '<div className="mt-6 pt-6 border-t border-white/10 dark:border-byz-blue-900/80">'
// and ending at the matching '</div>' for that section.

const startStr = '<div className="mt-6 pt-6 border-t border-white/10 dark:border-byz-blue-900/80">';
const idx = content.indexOf(startStr);
const endIdx = content.indexOf('</div>\n            </div>\n\n            {/* Schedule of Services Card */}');

const replacement = `<div className="mt-6 pt-6 border-t border-white/10 dark:border-byz-blue-900/80">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    {parishData?.patronSaint?.imageUrl ? (
                      <img 
                        src={parishData.patronSaint.imageUrl} 
                        alt="St. Hybald" 
                        className="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded-xl border border-stone-800 dark:border-byz-blue-800/50 shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-24 h-32 sm:w-32 sm:h-40 bg-stone-800/50 dark:bg-byz-blue-900/50 rounded-xl border border-dashed border-stone-700 dark:border-byz-blue-800/50 flex flex-col items-center justify-center text-stone-500 shadow-sm">
                         <span className="text-[10px] uppercase tracking-widest font-mono text-center px-2">Icon Space</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-display text-lg font-medium text-gold-400 dark:text-gold-200 mb-2">
                      {lang === 'RO' ? 'Ocrotitorul Nostru: Sfântul Hybald' : 'Our Patron: St. Hybald'}
                    </h4>
                    <p className="font-serif text-sm text-stone-200 dark:text-byz-blue-300 leading-relaxed italic mb-4">
                      {lang === 'RO' 
                        ? 'Sfântul Hybald de Lincolnshire, un monah smerit și îndrumător duhovnicesc din secolul al VII-lea, ne binecuvântează comunitatea cu rugăciunile sale. Sub ocrotirea sa, ne străduim să păstrăm candela dreptei credințe aprinsă, ducând mai departe moștenirea sfinților ortodocși de pe aceste meleaguri.'
                        : 'St. Hybald of Lincolnshire, a humble 7th-century monastic and spiritual guide, blesses our community with his prayers. Under his heavenly patronage, we strive to keep the flame of the Orthodox faith burning brightly, carrying forward the legacy of the local ancient saints.'}
                    </p>
                    <div className="mt-2">
                      <a 
                        href={parishData?.patronSaint?.moreInfoUrl || "#"} 
                        target={parishData?.patronSaint?.moreInfoUrl ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={\`inline-flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest transition-colors \${parishData?.patronSaint?.moreInfoUrl ? 'text-amber-500/80 hover:text-gold-400 dark:text-byz-blue-400 dark:hover:text-byz-blue-200' : 'text-stone-500 cursor-not-allowed'}\`}
                        onClick={(e) => { if (!parishData?.patronSaint?.moreInfoUrl) e.preventDefault(); }}
                      >
                        <span>{lang === 'RO' ? 'Mai multe despre Sf. Hybald' : 'More about St. Hybald'}</span>
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;

if (idx !== -1 && endIdx !== -1) {
    content = content.substring(0, idx) + replacement + content.substring(endIdx);
    fs.writeFileSync('src/components/LiturgicalCalendar.tsx', content);
}
