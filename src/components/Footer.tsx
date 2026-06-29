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
    <footer className="bg-stone-900 dark:bg-byz-blue-950 text-stone-300 border-t border-stone-800 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Brand Banner Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 border-b border-stone-800 pb-12 mb-12">
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
                {lang === 'RO' ? 'Biserica Ortodoxă Sf. Hybald' : 'St Hybald Orthodox Church'}
              </span>
              <span className="font-serif text-xs text-stone-400 -mt-0.5 italic">
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

        {/* 3-Column Grid representing the Model Parish Footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-stone-800 pb-12 mb-10">
          
          {/* Column 1: Contact Box */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-gold-400 uppercase tracking-wider">
              {lang === 'RO' ? 'Contact' : 'Contact Us'}
            </h4>
            <div className="font-serif text-xs text-stone-300 space-y-2 italic">
              <p className="not-italic font-sans font-semibold text-white">
                St Hybald Antiochian Orthodox Mission
              </p>
              <p>Email: sthybaldorthodoxchurch@gmail.com</p>
              <p>Email: cerghitmihai@gmail.com</p>
              <p>{lang === 'RO' ? 'Telefon Părinte: 07525 019441' : 'Priest Phone: 07525 019441'}</p>
              <p>
                {lang === 'RO' 
                  ? 'Locație: Methodist Church, Old Brumby United Church, 185 Ashby Rd, Scunthorpe DN16 2AQ' 
                  : 'Location: Methodist Church, Old Brumby United Church, 185 Ashby Rd, Scunthorpe DN16 2AQ'}
              </p>
              <p className="pt-1.5">
                <a 
                  href="https://maps.google.com/?q=Old+Brumby+United+Church+Scunthorpe+DN16+2AQ" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gold-400 hover:text-gold-300 underline font-sans font-semibold inline-flex items-center gap-1 not-italic transition-colors"
                >
                  {lang === 'RO' ? 'Găsește-ne pe Google Maps' : 'Find us on Google maps'} →
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Mandatory UK Safeguarding Box */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-rose-400 uppercase tracking-wider">
              Safeguarding
            </h4>
            <div className="bg-white/5 border-l-4 border-rose-600/80 p-4 rounded-r-xl text-xs space-y-2.5">
              <p className="leading-relaxed text-byz-blue-100">
                {lang === 'RO' 
                  ? 'Suntem total dedicați protecției copiilor și a adulților vulnerabili. În conformitate cu regulamentele din UK:'
                  : 'We are fully committed to protecting children and vulnerable adults. In accordance with UK regulations:'}
              </p>
              <p className="font-sans font-semibold text-white">
                {lang === 'RO' ? 'Ofițer Safeguarding:' : 'Safeguarding Officer:'} <span className="text-gold-400 font-normal">MR Valentin Torcea</span>
              </p>
              <p>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); handleScroll('contact'); }}
                  className="text-gold-400 hover:text-gold-300 underline font-medium cursor-pointer"
                >
                  {lang === 'RO' ? 'Citește Politica de Safeguarding' : 'Read our Safeguarding Policy'}
                </a>
              </p>
            </div>
          </div>

          {/* Column 3: Useful Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-gold-400 uppercase tracking-wider">
              {lang === 'RO' ? 'Link-uri Utile' : 'Useful Links'}
            </h4>
            <div className="font-serif text-xs space-y-2 italic text-stone-300">
              <p>
                <a 
                  href="https://www.antiochian-orthodox.co.uk/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-gold-400 underline transition-colors"
                >
                  {lang === 'RO' ? 'Arhiepiscopia Ortodoxă Antiochiană' : 'Antiochian Orthodox Archdiocese'}
                </a>
              </p>
              <p>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); handleScroll('services'); }}
                  className="hover:text-gold-400 underline transition-colors"
                >
                  {lang === 'RO' ? 'Calendar Liturgic' : 'Liturgical Calendar'}
                </a>
              </p>
              <p>
                <a 
                  href="https://maps.google.com/?q=Old+Brumby+United+Church+Scunthorpe+DN16+2AQ" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-gold-400 underline transition-colors font-sans font-semibold text-gold-400 flex items-center gap-1.5 not-italic"
                >
                  {lang === 'RO' ? 'Găsește-ne pe Google Maps' : 'Find us on Google maps'} →
                </a>
              </p>
              <p className="not-italic font-mono text-[10px] text-stone-400 mt-4">
                Registered Charity No: <span className="text-gold-400 font-semibold">1208759</span>
              </p>
            </div>
          </div>

        </div>

        {/* Canonical Authority Block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400 text-center md:text-left">
          <div className="font-serif italic leading-relaxed space-y-1">
            <p>
              {lang === 'RO' 
                ? 'Misiunea Ortodoxă Antiochiană Scunthorpe activează în subordinea canonică a Arhiepiscopiei Antiochiane a Insulelor Britanice și Irlandei.'
                : 'The Antiochian Orthodox Mission of Scunthorpe operates under the canonical care of the Antiochian Archdiocese of the British Isles and Ireland.'}
            </p>
            <p className="text-[10px] text-stone-400">
              {lang === 'RO' 
                ? 'Sub păstorirea canonică a ÎPS Mitropolit Silouan (Oner)' 
                : 'Under the canonical care of His Eminence Metropolitan Silouan (Oner)'}
            </p>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400 flex-shrink-0 flex flex-wrap items-center justify-center md:justify-end gap-2">
            <span>© 2026 {lang === 'RO' ? 'Parohia Scunthorpe. Toate drepturile rezervate.' : 'Scunthorpe Parish. All rights reserved.'}</span>
            <span className="hidden sm:inline">•</span>
            <a href="#admin" className="hover:text-gold-400 text-stone-400 hover:underline transition-colors lowercase">admin</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
