import React from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { BookOpen, Map, Landmark, Scroll, Shield, Crown } from 'lucide-react';

interface HistorySectionProps {
  lang: Language;
}

export default function HistorySection({ lang }: HistorySectionProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="history" className="py-24 bg-transparent text-stone-900 dark:bg-byz-blue-950 dark:text-byz-blue-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 bg-stone-900 shadow-xl dark:bg-transparent p-8 rounded-3xl border border-stone-800 dark:border-none backdrop-blur-sm">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 dark:bg-gold-500/15 text-gold-700 dark:text-gold-300 font-mono text-[10px] uppercase tracking-widest border border-gold-500/20 mb-4 font-semibold font-semibold">
            <Scroll size={12} className="text-gold-500" />
            <span>{lang === 'RO' ? 'Tradiție Apostolică' : 'Apostolic Tradition'}</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-gold-400 dark:text-gold-50">
            {t.historySectionTitle}
          </h2>
          
          <p className="font-serif text-stone-300 dark:text-byz-blue-200 text-sm sm:text-base italic max-w-2xl mx-auto leading-relaxed">
            "{t.historySectionSubtitle}"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Dynamic split column list */}
        <div className="max-w-3xl mx-auto">
          
          {/* Antioch Historical column card (Left) */}
          <div className="relative group bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/50 p-8 sm:p-10 rounded-3xl flex flex-col justify-between hover:border-gold-500/30 transition-all duration-350 ">
            
            {/* Top gold line */}
            <div className="absolute top-0 left-10 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
            
            <div>
              <div className="w-12 h-12 bg-amber-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Landmark size={22} />
              </div>

              <h3 className="font-display text-2xl font-bold text-gold-400 dark:text-gold-100 mb-4">
                {t.historyPatriarchateTitle}
              </h3>

              <p className="font-serif text-sm text-stone-100 dark:text-byz-blue-200 italic mb-8 leading-relaxed">
                {t.historyPatriarchateDesc}
              </p>
            </div>

            {/* Fapte scriptural quotation */}
            <div className="bg-stone-800/50 p-4 rounded-2xl border border-stone-700/50 dark:border-byz-blue-900/60 text-xs font-serif italic text-gold-400 dark:text-gold-400 leading-relaxed text-[13px] sm:text-sm font-semibold">
              {lang === 'RO'
                ? '„Și un an întreg s-au adunat în biserică și au învățat mult popor. Și în Antiohia, întâia oară, ucenicii s-au numit creștini.” — Faptele Apostolilor 11:26'
                : '“And the disciples were first called Christians in Antioch.” — Acts of the Apostles 11:26'}
            </div>
          </div>

        </div>

        {/* Canonical Hierarchy Block */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="relative overflow-hidden bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/50 p-8 sm:p-10 rounded-3xl hover:border-gold-500/30 transition-all duration-350 ">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start md:items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Crown size={22} />
                </div>
                <div>
                  <span className="font-display text-[10px] uppercase tracking-widest text-gold-650 dark:text-gold-400 font-semibold block mb-1">
                    {t.historyHierarchyTitle}
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-gold-400 dark:text-gold-100">
                    {t.historyHierarchyMetropolitanName}
                  </h4>
                </div>
              </div>
            </div>

            <p className="mt-6 font-serif text-sm text-stone-100 dark:text-byz-blue-200 italic leading-relaxed md:max-w-4xl">
              {t.historyHierarchyMetropolitanDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
