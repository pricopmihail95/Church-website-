import React from 'react';
import { Language } from '../types';
import { HelpCircle } from 'lucide-react';

interface ExplanatoryCardsProps {
  lang: Language;
}

export default function ExplanatoryCards({ lang }: ExplanatoryCardsProps) {
  return (
    <section id="explanation" className="py-12 bg-transparent text-stone-900 dark:bg-byz-blue-950 dark:text-byz-blue-100 border-b border-stone-800 dark:border-byz-blue-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Single Card */}
        <div className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/60 border border-stone-800 dark:border-byz-blue-800/40 p-6 sm:p-8 rounded-3xl  flex flex-col justify-between hover:border-gold-500/20 transition-all duration-300">
          <div>
            <div className="w-10 h-10 bg-amber-500/10 text-gold-600 dark:text-gold-400 rounded-xl flex items-center justify-center mb-5 border border-gold-500/10">
              <HelpCircle size={18} />
            </div>
            
            <h3 className="font-display text-lg font-bold mb-3 tracking-tight text-gold-400 dark:text-gold-100">
              {lang === 'RO' ? 'Ce este Creștinismul Ortodox?' : 'What is Orthodox Christianity?'}
            </h3>
            
            <p className="font-serif text-xs sm:text-sm text-stone-100 dark:text-byz-blue-100 italic leading-relaxed">
              {lang === 'RO' ? (
                'Creștinismul Ortodox este Biserica istorică primară, ce păstrează neschimbată credința și rânduiala primilor creștini încă din secolul I. Nu este o asociație rigidă de reguli, ci o cale vie de tămăduire a sufletului prin dragostea lui Dumnezeu și rugăciunea curată.'
              ) : (
                'Orthodox Christianity is the ancient, historic Christian Church, preserving the apostolic faith and liturgical traditions of the 1st century unaltered. Rather than a rigid set of rules, it is a living way of healing the soul through God’s love and pure prayer.'
              )}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 dark:border-byz-blue-800 text-[10px] font-mono uppercase tracking-wider text-stone-300">
            {lang === 'RO' ? 'Tradiție neîntreruptă de 2000 ani' : '2000 years of unbroken lineage'}
          </div>
        </div>

      </div>
    </section>
  );
}
