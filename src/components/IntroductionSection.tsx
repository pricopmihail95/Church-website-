import React from 'react';
import { Language } from '../types';
import { Heart, Landmark, Compass, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface IntroductionSectionProps {
  lang: Language;
}

export default function IntroductionSection({ lang }: IntroductionSectionProps) {
  return (
    <section id="introduction" className="py-20 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-150 border-b border-stone-200 dark:border-stone-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Statement */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-8 sm:p-10 rounded-3xl shadow-sm mb-12 text-center relative overflow-hidden">
          {/* Subtle golden accent ribbon */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/20 via-gold-500 to-amber-500/20" />
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-gold-400 font-mono text-[10px] uppercase tracking-wider mb-4 font-semibold">
            <Heart size={11} className="text-amber-500" />
            <span>{lang === 'RO' ? 'Cine suntem' : 'Who we are'}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-4">
            {lang === 'RO' ? 'Bine ai venit în mica noastră familie' : 'Welcome to Our Small Family'}
          </h2>

          <p className="font-serif text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            {lang === 'RO' ? (
              <>
                Suntem o comunitate ortodoxă mică, aflată la început de drum în Scunthorpe (înființată de aproximativ 2-3 ani). Pe parcursul anului, suntem o mână de oameni calzi, adunând de la 6 la 30 de suflete într-o duminică obișnuită, însă ne bucurăm să fim peste 100 de credincioși la Slujba de Înviere. Aici nu vei găsi măreția unei catedrale grandioase, ci simplitatea și dragostea unei familii deschise pentru toți cei dornici să-L caute pe Dumnezeu.
              </>
            ) : (
              <>
                We are a small, warm Orthodox community in Scunthorpe, founded just 2-3 years ago. On most Sundays, we are a humble gathering of 6 to 30 people, growing to a vibrant congregation of 100 to 130 during Pascha (Easter). Here, you will not find the grand scale of a massive cathedral, but rather the warmth, honesty, and simplicity of a small missionary family open to anyone seeking God.
              </>
            )}
          </p>
        </div>

        {/* Modular Explanatory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* What is Orthodox Christianity? */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:border-gold-500/20 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-amber-500/10 text-gold-600 dark:text-gold-400 rounded-xl flex items-center justify-center mb-5 border border-gold-500/10">
                <HelpCircle size={18} />
              </div>
              
              <h3 className="font-display text-lg font-bold mb-3 tracking-tight text-stone-900 dark:text-gold-100">
                {lang === 'RO' ? 'Ce este Creștinismul Ortodox?' : 'What is Orthodox Christianity?'}
              </h3>
              
              <p className="font-serif text-xs sm:text-sm text-stone-600 dark:text-stone-400 italic leading-relaxed">
                {lang === 'RO' ? (
                  'Creștinismul Ortodox este Biserica istorică primară, ce păstrează neschimbată credința și rânduiala primilor creștini încă din secolul I. Nu este o asociație rigidă de reguli, ci o cale vie de tămăduire a sufletului prin dragostea lui Dumnezeu și rugăciunea curată.'
                ) : (
                  'Orthodox Christianity is the ancient, historic Christian Church, preserving the apostolic faith and liturgical traditions of the 1st century unaltered. Rather than a rigid set of rules, it is a living way of healing the soul through God’s love and pure prayer.'
                )}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-850 text-[10px] font-mono uppercase tracking-wider text-stone-400">
              {lang === 'RO' ? 'Tradiție neîntreruptă de 2000 ani' : '2000 years of unbroken lineage'}
            </div>
          </div>

          {/* What is Antiochian Orthodoxy? */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:border-gold-500/20 transition-all duration-300">
            <div>
              <div className="w-10 h-10 bg-amber-500/10 text-gold-600 dark:text-gold-400 rounded-xl flex items-center justify-center mb-5 border border-gold-500/10">
                <Landmark size={18} />
              </div>
              
              <h3 className="font-display text-lg font-bold mb-3 tracking-tight text-stone-900 dark:text-gold-100">
                {lang === 'RO' ? 'Ce înseamnă Ortodoxia Antiochiană?' : 'What is Antiochian Orthodoxy?'}
              </h3>
              
              <p className="font-serif text-xs sm:text-sm text-stone-600 dark:text-stone-400 italic leading-relaxed">
                {lang === 'RO' ? (
                  'Suntem o ramură a Patriarhiei Antiohiei — cetatea unde ucenicii lui Iisus au fost numiți creștini pentru prima dată (Fapte 11:26). Deși păstrăm tradiția Răsăritului, în parohia noastră slujbele se țin în limba engleză, fiind deschise cu simplitate și căldură oricărui om, indiferent de etnie.'
                ) : (
                  "Antiochian Orthodoxy traces its lineage directly to the ancient city of Antioch, where Jesus’s disciples were first called 'Christians' (Acts 11:26). While maintaining eastern traditions, our parish prays in English, welcoming people of all backgrounds with genuine warmth."
                )}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-850 text-[10px] font-mono uppercase tracking-wider text-stone-400">
              {lang === 'RO' ? 'Numele creștini s-a născut în Antiohia' : 'Where Christians were first named'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
