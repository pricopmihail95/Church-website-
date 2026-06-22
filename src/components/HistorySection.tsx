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
    <section id="history" className="py-24 bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 dark:bg-gold-500/15 text-gold-700 dark:text-gold-300 font-mono text-[10px] uppercase tracking-widest border border-gold-500/20 mb-4 font-semibold">
            <Scroll size={12} className="text-gold-500" />
            <span>{lang === 'RO' ? 'Tradiție Apostolică' : 'Apostolic Tradition'}</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
            {t.historySectionTitle}
          </h2>
          
          <p className="font-serif text-stone-600 dark:text-stone-400 text-sm sm:text-base italic max-w-2xl mx-auto leading-relaxed">
            "{t.historySectionSubtitle}"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Dynamic split column list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Antioch Historical column card (Left) */}
          <div className="relative group bg-stone-50 dark:bg-stone-900 border border-stone-250/60 dark:border-stone-850 p-8 sm:p-10 rounded-3xl flex flex-col justify-between hover:border-gold-500/30 transition-all duration-350 shadow-sm">
            
            {/* Top gold line */}
            <div className="absolute top-0 left-10 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
            
            <div>
              <div className="w-12 h-12 bg-amber-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Landmark size={22} />
              </div>

              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-gold-100 mb-4">
                {t.historyPatriarchateTitle}
              </h3>

              <p className="font-serif text-sm text-stone-700 dark:text-stone-300 italic mb-8 leading-relaxed">
                {t.historyPatriarchateDesc}
              </p>
            </div>

            {/* Fapte scriptural quotation */}
            <div className="bg-white dark:bg-stone-950 p-4 rounded-2xl border border-stone-200/50 dark:border-stone-800 text-xs font-serif italic text-gold-700 dark:text-gold-300 leading-relaxed">
              {lang === 'RO'
                ? '„Și un an întreg s-au adunat în biserică și au învățat mult popor. Și în Antiohia, întâia oară, ucenicii s-au numit creștini.” — Faptele Apostolilor 11:26'
                : '“And the disciples were first called Christians in Antioch.” — Acts of the Apostles 11:26'}
            </div>
          </div>

          {/* Scunthorpe Parish Mission column card (Right) */}
          <div className="relative group bg-stone-50 dark:bg-stone-900 border border-stone-250/60 dark:border-stone-850 p-8 sm:p-10 rounded-3xl flex flex-col justify-between hover:border-gold-500/30 transition-all duration-350 shadow-sm">
            
            {/* Top crimson line */}
            <div className="absolute top-0 right-10 w-20 h-[2px] bg-gradient-to-r from-transparent via-crimson-500 to-transparent" />

            <div>
              <div className="w-12 h-12 bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Shield size={22} className="text-crimson-500" />
              </div>

              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-gold-100 mb-4">
                {t.historyParishTitle}
              </h3>

              <p className="font-serif text-sm text-stone-700 dark:text-stone-300 italic mb-8 leading-relaxed">
                {t.historyParishDesc}
              </p>
            </div>

            {/* Antiochian Diocese connection information */}
            <div className="bg-white dark:bg-stone-950 p-4 rounded-2xl border border-stone-200/50 dark:border-stone-800 text-xs font-serif italic text-stone-500 dark:text-stone-400 leading-relaxed">
              {lang === 'RO'
                ? 'Parohia promovează o viață de comunitate deosebit de fluidă, primind pe oricine dorește să afle mai multe despre învățătura nestricată a Răsăritului.'
                : 'The parish welcomes everyone, serving as an oasis of orthodox peace, liturgical prayer, and communal warm hospitality.'}
            </div>
          </div>

        </div>

        {/* Canonical Hierarchy Block */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="relative overflow-hidden bg-stone-50 dark:bg-stone-900 border border-stone-250/60 dark:border-stone-850 p-8 sm:p-10 rounded-3xl hover:border-gold-500/30 transition-all duration-350 shadow-sm">
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
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-gold-100">
                    {t.historyHierarchyMetropolitanName}
                  </h4>
                </div>
              </div>
            </div>

            <p className="mt-6 font-serif text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed md:max-w-4xl">
              {t.historyHierarchyMetropolitanDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
