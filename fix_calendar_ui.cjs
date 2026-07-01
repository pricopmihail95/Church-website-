const fs = require('fs');
let content = fs.readFileSync('src/components/LiturgicalCalendar.tsx', 'utf8');

content = content.replace(
  /\{parishData\.patronSaint\?\.imageUrl && \([\s\S]*?<\/div>\n                  \)\}/,
  `                    <div className="flex-shrink-0">
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
                    </div>`
);

content = content.replace(
  /\{parishData\.patronSaint\?\.moreInfoUrl && \([\s\S]*?<\/a>\n                    \)\}/,
  `                    <div className="mt-2">
                      <a 
                        href={parishData?.patronSaint?.moreInfoUrl || "#"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={\`inline-flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest transition-colors \${parishData?.patronSaint?.moreInfoUrl ? 'text-amber-500/80 hover:text-gold-400 dark:text-byz-blue-400 dark:hover:text-byz-blue-200' : 'text-stone-500 cursor-not-allowed'}\`}
                      >
                        <span>{lang === 'RO' ? 'Mai multe despre Sf. Hybald' : 'More about St. Hybald'}</span>
                        <ArrowRight size={12} />
                      </a>
                    </div>`
);

fs.writeFileSync('src/components/LiturgicalCalendar.tsx', content);
