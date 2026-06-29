import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ArchdioceseLogo from './ArchdioceseLogo';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  mainLogoUrl?: string;
}

export default function Navbar({ lang, setLang, darkMode, setDarkMode, mainLogoUrl }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const navItems = [
    { label: t.navHome, href: '#home' },
    { label: t.navServices, href: '#services' },
    { label: t.navHistory, href: '#history' },
    { label: t.navGallery, href: '#gallery-page' },
    { label: t.navSupport, href: '#support' },
    { label: t.navContact, href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === '#gallery-page') {
      window.location.hash = '#gallery-page';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const wasOnGalleryPage = window.location.hash === '#gallery-page';
    window.location.hash = href;
    
    if (wasOnGalleryPage) {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b bg-[#DFD5C4]/90 border-byz-blue-900/10 dark:bg-byz-blue-950/85 dark:border-byz-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Archdiocese Seal */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-stone-950 text-white border border-gold-500/40 shadow-md">
              {mainLogoUrl ? (
                <img src={mainLogoUrl} alt="Logo" className="w-10 h-10 rounded-full object-contain" />
              ) : (
                <ArchdioceseLogo className="w-10 h-10 text-white" />
              )}
              <div className="absolute top-0 left-0 w-full h-full rounded-full border border-gold-400/15 animate-pulse pointer-events-none" />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-display text-sm xs:text-base tracking-widest font-semibold text-byz-blue-950 dark:text-gold-100 uppercase">
                {lang === 'RO' ? 'ANTIOCHIA' : 'ANTIOCH'}
              </span>
              <span className="font-serif text-xs text-byz-blue-600 dark:text-byz-blue-300 -mt-0.5 italic">
                Scunthorpe
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Entries */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="font-sans text-xs uppercase tracking-widest text-byz-blue-950 dark:text-byz-blue-100 hover:text-gold-600 dark:hover:text-gold-400 transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Languages, DarkMode, Socials & Toggle Menus */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Language Switcher Button */}
            <div className="flex bg-byz-blue-100/50 dark:bg-byz-blue-900 border border-byz-blue-200 dark:border-byz-blue-800 rounded-lg p-0.5">
              <button
                onClick={() => setLang('RO')}
                className={`px-2.5 py-1 text-xs tracking-wider rounded-md transition-all duration-350 cursor-pointer font-semibold ${
                  lang === 'RO'
                    ? 'bg-gold-500 text-stone-950 shadow-md'
                    : 'text-byz-blue-800 dark:text-byz-blue-300 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                RO
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 text-xs tracking-wider rounded-md transition-all duration-350 cursor-pointer font-semibold ${
                  lang === 'EN'
                    ? 'bg-gold-500 text-stone-950 shadow-md'
                    : 'text-byz-blue-800 dark:text-byz-blue-300 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                EN
              </button>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-byz-blue-950 dark:text-byz-blue-300 hover:bg-byz-blue-100 dark:hover:bg-byz-blue-900 rounded-full transition-all cursor-pointer border border-byz-blue-200/20"
              aria-label="Toggle Theme"
            >
              {!darkMode ? <Sun size={17} className="text-gold-500" /> : <Moon size={17} className="text-byz-blue-300" />}
            </button>
            
            <div className="text-[10px] uppercase font-mono tracking-wider text-amber-600 dark:text-amber-400 flex items-center bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full space-x-1.5">
              <Sparkles size={10} className="animate-spin-slow text-gold-500" />
              <span>{t.byzantineStyle}</span>
            </div>

            {/* Social Buttons Parity block */}
            <div className="flex items-center space-x-1.5 border-l border-byz-blue-200 dark:border-byz-blue-800 pl-3">
              <a 
                href="https://www.facebook.com/groups/712395697330554/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 flex items-center justify-center text-[10px] font-bold font-mono rounded bg-byz-blue-200 dark:bg-byz-blue-900 hover:bg-gold-500 dark:hover:bg-gold-500 text-byz-blue-900 dark:text-white hover:text-stone-950 dark:hover:text-stone-950 transition-all shadow-sm"
                title="Facebook Group"
              >
                FB
              </a>
              <a 
                href="https://www.youtube.com/@AntiochianOrthodoxArchdiocese" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 flex items-center justify-center text-[10px] font-bold font-mono rounded bg-byz-blue-200 dark:bg-byz-blue-900 hover:bg-gold-500 dark:hover:bg-gold-500 text-byz-blue-900 dark:text-white hover:text-stone-950 dark:hover:text-stone-950 transition-all shadow-sm"
                title="YouTube Channel"
              >
                YT
              </a>
              <a 
                href="https://wa.me/447525019441" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 flex items-center justify-center text-[10px] font-bold font-mono rounded bg-byz-blue-200 dark:bg-byz-blue-900 hover:bg-gold-500 dark:hover:bg-gold-500 text-byz-blue-900 dark:text-white hover:text-stone-950 dark:hover:text-stone-950 transition-all shadow-sm"
                title="WhatsApp Contact"
              >
                WA
              </a>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Theme switcher for mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-byz-blue-950 dark:text-byz-blue-300 hover:bg-byz-blue-100 dark:hover:bg-byz-blue-900 rounded-full cursor-pointer"
            >
              {!darkMode ? <Sun size={17} className="text-gold-500" /> : <Moon size={17} className="text-byz-blue-300" />}
            </button>

            {/* Language switcher for mobile */}
            <button
              onClick={() => setLang(lang === 'RO' ? 'EN' : 'RO')}
              className="px-2 py-1 border border-byz-blue-200 dark:border-byz-blue-800 text-xs rounded font-bold text-byz-blue-900 dark:text-byz-blue-200 bg-byz-blue-100 dark:bg-byz-blue-900 hover:bg-byz-blue-200"
            >
              {lang}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-byz-blue-950 dark:text-byz-blue-300 hover:bg-byz-blue-100 dark:hover:bg-byz-blue-900 rounded-full focus:outline-none"
              id="mobile-menu-btn"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel with Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-byz-blue-100 dark:border-byz-blue-900 bg-byz-blue-50 dark:bg-byz-blue-950"
            id="mobile-drawer"
          >
            <div className="px-3 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="block px-4 py-3 text-sm font-medium tracking-widest uppercase text-byz-blue-900 dark:text-byz-blue-200 hover:bg-byz-blue-100 dark:hover:bg-byz-blue-900 rounded-lg text-center border border-transparent hover:border-gold-500/20"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col items-center space-y-3">
                <div className="text-[10px] uppercase font-mono tracking-wider text-amber-500 dark:text-amber-400 flex items-center bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full space-x-1.5">
                  <Sparkles size={11} />
                  <span>{t.byzantineStyle}</span>
                </div>
                
                {/* Mobile Social Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <a 
                    href="https://www.facebook.com/groups/712395697330554/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold font-mono rounded bg-byz-blue-200 dark:bg-byz-blue-900 text-byz-blue-900 dark:text-white"
                  >
                    FB
                  </a>
                  <a 
                    href="https://www.youtube.com/@AntiochianOrthodoxArchdiocese" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold font-mono rounded bg-byz-blue-200 dark:bg-byz-blue-900 text-byz-blue-900 dark:text-white"
                  >
                    YT
                  </a>
                  <a 
                    href="https://wa.me/447525019441" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold font-mono rounded bg-byz-blue-200 dark:bg-byz-blue-900 text-byz-blue-900 dark:text-white"
                  >
                    WA
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
