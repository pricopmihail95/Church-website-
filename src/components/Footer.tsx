import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 border-b border-stone-900 pb-12 mb-10">
          
          {/* Logo brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                className="w-5 h-5 text-gold-400"
              >
                <path d="M12 2v18" />
                <path d="M8 7h8" />
                <path d="M6 11h12" />
                <path d="M9 17l6-2" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-sm tracking-widest font-semibold text-white uppercase">
                {lang === 'RO' ? 'Biserica Ortodoxă' : 'Orthodox Church'}
              </span>
              <span className="font-serif text-xs text-stone-500 -mt-0.5 italic">
                Scunthorpe, UK
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest font-mono">
            <button 
              onClick={() => handleScroll('home')} 
              className="text-stone-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {lang === 'RO' ? 'Acasă' : 'Home'}
            </button>
            <button 
              onClick={() => handleScroll('services')} 
              className="text-stone-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {lang === 'RO' ? 'Slujbe' : 'Services'}
            </button>
            <button 
              onClick={() => handleScroll('candles')} 
              className="text-stone-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {lang === 'RO' ? 'Pangar' : 'Altar'}
            </button>
            <button 
              onClick={() => handleScroll('history')} 
              className="text-stone-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {lang === 'RO' ? 'Istorie' : 'History'}
            </button>
            <button 
              onClick={() => handleScroll('support')} 
              className="text-stone-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {lang === 'RO' ? 'Donat' : 'Donations'}
            </button>
          </div>

        </div>

        {/* Legal copyrights & canonical hierarchy descriptions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500 text-center md:text-left">
          
          <div className="font-serif italic leading-relaxed space-y-1">
            <p>
              {lang === 'RO' 
                ? 'Misiunea Ortodoxă Antiochiană Scunthorpe activează în subordinea canonică a Arhiepiscopiei Antiochiane a Insulelor Britanice și Irlandei.'
                : 'The Antiochian Orthodox Mission of Scunthorpe operates under the canonical care of the Antiochian Archdiocese of the British Isles and Ireland.'}
            </p>
            <p className="text-[10px] text-stone-600">
              {lang === 'RO' 
                ? 'Patriarhul Ioan al X-lea al Antiohiei și al Întregului Orient' 
                : 'His Beatitude Patriarch John X of Antioch and all the East'}
            </p>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-wider text-stone-600 flex-shrink-0 flex flex-wrap items-center justify-center md:justify-end gap-2">
            <span>© 2026 {lang === 'RO' ? 'Parohia Scunthorpe. Toate drepturile rezervate.' : 'Scunthorpe Parish. All rights reserved.'}</span>
            <span className="hidden sm:inline">•</span>
            <a href="#admin" className="hover:text-gold-450 text-stone-500 hover:underline transition-colors lowercase">admin</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
