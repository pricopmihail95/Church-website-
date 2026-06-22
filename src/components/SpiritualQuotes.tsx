import React, { useState } from 'react';
import { SPIRITUAL_QUOTES, TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Quote, ChevronLeft, ChevronRight, Copy, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SpiritualQuotesProps {
  lang: Language;
}

export default function SpiritualQuotes({ lang }: SpiritualQuotesProps) {
  const t = TRANSLATIONS[lang];
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % SPIRITUAL_QUOTES.length);
    setCopied(false);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + SPIRITUAL_QUOTES.length) % SPIRITUAL_QUOTES.length);
    setCopied(false);
  };

  const activeQuote = SPIRITUAL_QUOTES[index];

  const handleCopy = () => {
    const rawText = `"${activeQuote.text[lang]}" — ${activeQuote.author[lang]} (${activeQuote.period})`;
    navigator.clipboard.writeText(rawText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-950 text-stone-900 dark:text-stone-100 border-b border-stone-250 dark:border-stone-850">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 dark:bg-gold-500/15 text-gold-700 dark:text-gold-300 font-mono text-[9px] uppercase tracking-widest border border-gold-500/20 mb-3">
            <Quote size={10} />
            <span>{lang === 'RO' ? 'Părinții Bisericii' : 'Patristic Wisdom'}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
            {t.wisdomTitle}
          </h3>
          <p className="font-serif text-stone-500 dark:text-stone-400 text-xs sm:text-sm italic mt-1.5">
            {t.wisdomSubtitle}
          </p>
        </div>

        {/* Sliding card */}
        <div className="relative bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-850/80 rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden">
          
          {/* Altar Corner Decors */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-500/30 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-500/30 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-500/30 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-500/30 rounded-br-xl pointer-events-none" />

          {/* Core Quote Content and Transitions */}
          <div className="relative min-h-[170px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -5 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="text-center"
              >
                {/* Liturgical graphic Quote Symbol */}
                <div className="text-gold-500/20 dark:text-gold-500/35 flex justify-center mb-6">
                  <Quote size={40} className="stroke-[1.5]" />
                </div>

                <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl text-stone-800 dark:text-stone-200 italic leading-relaxed px-2 sm:px-6 mb-6">
                  "{activeQuote.text[lang]}"
                </blockquote>

                <div className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-[1px] bg-gold-500/50" />
                  <cite className="not-italic font-display font-semibold text-stone-900 dark:text-gold-200 text-xs sm:text-sm tracking-wider uppercase">
                    {activeQuote.author[lang]}
                  </cite>
                  <span className="font-mono text-[9px] text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-2 py-0.5 rounded">
                    {activeQuote.period}
                  </span>
                  <span className="w-1.5 h-[1px] bg-gold-500/50" />
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Slide Action Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-stone-100 dark:border-stone-900">
              <button
                onClick={handlePrev}
                className="p-2 sm:p-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors border border-stone-200/40 dark:border-stone-800 cursor-pointer"
                aria-label="Previous quote"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Utility buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-[10px] uppercase font-mono tracking-widest font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-850 hover:text-stone-950 dark:hover:text-stone-100 text-stone-500 transition-colors border border-stone-200/40 dark:border-stone-800 cursor-pointer"
                >
                  {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                  <span>{copied ? (lang === 'RO' ? 'Copiat' : 'Copied') : (lang === 'RO' ? 'Copiază' : 'Copy')}</span>
                </button>
              </div>

              <button
                onClick={handleNext}
                className="p-2 sm:p-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors border border-stone-200/40 dark:border-stone-800 cursor-pointer"
                aria-label="Next quote"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
