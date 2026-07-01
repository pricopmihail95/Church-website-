const fs = require('fs');
let content = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');

const target1 = `{parishData.patronSaint?.imageUrl && (
                    <div className="flex-shrink-0">
                      <img 
                        src={parishData.patronSaint.imageUrl} 
                        alt="St. Hybald" 
                        className="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded-xl border border-stone-800 dark:border-byz-blue-800/50 shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}`;

const replacement1 = `                    <div className="flex-shrink-0">
                      {parishData?.patronSaint?.imageUrl ? (
                        <img 
                          src={parishData.patronSaint.imageUrl} 
                          alt="St. Hybald" 
                          className="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded-xl border border-stone-800 dark:border-byz-blue-800/50 shadow-lg"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-24 h-32 sm:w-32 sm:h-40 bg-stone-800/50 dark:bg-byz-blue-900/50 rounded-xl border border-dashed border-stone-700 dark:border-byz-blue-800/50 flex flex-col items-center justify-center text-stone-500 shadow-sm">
                           <span className="text-xs uppercase tracking-widest font-mono text-center px-2">Icon Space</span>
                        </div>
                      )}
                    </div>`;

const target2 = `{parishData.patronSaint?.moreInfoUrl && (
                      <a 
                        href={parishData.patronSaint.moreInfoUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest text-amber-500/80 hover:text-gold-400 dark:text-byz-blue-400 dark:hover:text-byz-blue-200 transition-colors"
                      >
                        <span>{lang === 'RO' ? 'Mai multe despre Sf. Hybald' : 'More about St. Hybald'}</span>
                        <ArrowRight size={12} />
                      </a>
                    )}`;

const replacement2 = `                    <div className="mt-2">
                      <a 
                        href={parishData?.patronSaint?.moreInfoUrl || "#"} 
                        target={parishData?.patronSaint?.moreInfoUrl ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={\`inline-flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest transition-colors \${parishData?.patronSaint?.moreInfoUrl ? 'text-amber-500/80 hover:text-gold-400 dark:text-byz-blue-400 dark:hover:text-byz-blue-200' : 'text-stone-600 dark:text-stone-500 cursor-not-allowed'}\`}
                        onClick={(e) => { if (!parishData?.patronSaint?.moreInfoUrl) e.preventDefault(); }}
                      >
                        <span>{lang === 'RO' ? 'Mai multe despre Sf. Hybald' : 'More about St. Hybald'}</span>
                        <ArrowRight size={12} />
                      </a>
                    </div>`;

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);

fs.writeFileSync('src/components/LiturgicalCalendar.tsx', content);
