import React from 'react';
import { Language } from '../types';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface IntroductionSectionProps {
  lang: Language;
}

export default function IntroductionSection({ lang }: IntroductionSectionProps) {
  return (
    <section id="introduction" className="py-20 bg-transparent text-stone-900 dark:bg-byz-blue-950 dark:text-byz-blue-100 border-b border-stone-800 dark:border-byz-blue-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Statement */}
        <div className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-800/60 p-8 sm:p-10 rounded-3xl  mb-12 text-center relative overflow-hidden">
          {/* Subtle golden accent ribbon */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/20 via-gold-500 to-amber-500/20" />
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-gold-400 font-mono text-[10px] uppercase tracking-wider mb-4 font-semibold">
            <Heart size={11} className="text-amber-500" />
            <span>{lang === 'RO' ? 'Cine suntem' : 'Who we are'}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-4">
            {lang === 'RO' ? 'Bine ai venit în mica noastră familie' : 'Welcome to Our Small Family'}
          </h2>

          <p className="font-serif text-stone-100 dark:text-byz-blue-100 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
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

        {/* Priest Welcome Message Card */}
        <div className="bg-stone-900 shadow-xl border border-stone-800 dark:bg-byz-blue-900/40 dark:border-byz-blue-900/60 p-8 sm:p-10 rounded-3xl mb-12 relative overflow-hidden text-stone-100">
          {/* Decorative Byzantine corner designs */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold-500/20 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold-500/20 rounded-bl-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
            {/* Visual Icon / Monogram */}
            <div className="flex-shrink-0 w-16 h-16 bg-gold-500/10 text-gold-400 border border-gold-500/35 rounded-full flex items-center justify-center font-display text-2xl shadow-inner font-semibold">
              IC
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                {lang === 'RO' ? 'Cuvântul Păstorului' : 'The Shepherd’s Welcome'}
              </span>
              
              <h3 className="font-display text-xl sm:text-2xl text-white font-medium mt-1 mb-4">
                {lang === 'RO' ? 'Părintele Paroh Mihai Cerghit' : 'Father Mihai Cerghit, Parish Priest'}
              </h3>
              
              <p className="font-serif text-sm sm:text-base text-byz-blue-100 italic leading-relaxed mb-6">
                {lang === 'RO' ? (
                  `„Dragi credincioși, vă întâmpin cu dragoste în Domnul pe pagina parohiei noastre din Scunthorpe. Hristos ne îndeamnă să fim lumina lumii și sarea pământului. În această mică misiune ortodoxă pe pământ britanic, ne străduim să păstrăm neatins tezaurul credinței noastre și să-l împărtășim tuturor cu inimă curată. Vă aștept la Sfânta Liturghie în fiecare duminică pentru a ne uni în rugăciune și Euharistie.”`
                ) : (
                  `“Dearly beloved, I welcome you with love in Christ to our mission parish in Scunthorpe. Christ calls us to be the light of the world and the salt of the earth. In this small Orthodox mission on British soil, we strive to preserve the pristine treasure of our Apostolic faith and welcome everyone with a warm and loving heart. I invite you to join us in prayer every Sunday, uniting in the Holy Liturgy and Eucharist.”`
                )}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-mono text-gold-400">
                <span className="flex items-center gap-1">
                  ✝ {lang === 'RO' ? 'Pace tuturor' : 'Peace be to all'}
                </span>
                <span className="text-stone-500">•</span>
                <span>{lang === 'RO' ? 'Misiunea Sf. Hybald' : 'St Hybald Mission'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
