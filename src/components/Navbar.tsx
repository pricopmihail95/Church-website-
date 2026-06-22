import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
}

export default function Navbar({ lang, setLang, darkMode, setDarkMode }: NavbarProps) {
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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b bg-stone-50/80 border-stone-200/50 dark:bg-stone-950/80 dark:border-stone-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Byzantine Cross Graphic */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/10 dark:bg-gold-500/20 text-gold-600 dark:text-gold-400 border border-gold-500/30">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-gold-600 dark:text-gold-300 drop-shadow-[0_2px_8px_rgba(212,171,21,0.5)]"
              >
                {/* Orthodox Triple-Bar Byzantine Cross */}
                <path d="M12 2v18" />              {/* Main Vertical Bar */}
                <path d="M8 7h8" />                {/* Upper Horizontal Bar */}
                <path d="M6 11h12" />              {/* Main Horizontal Bar */}
                <path d="M9 17l6-2" />             {/* Footrest Slanted Bar */}
              </svg>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border border-gold-400/20 animate-pulse pointer-events-none" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display text-sm xs:text-base tracking-widest font-semibold text-stone-800 dark:text-gold-100 uppercase">
                {lang === 'RO' ? 'ANTIOCHIA' : 'ANTIOCH'}
              </span>
              <span className="font-serif text-xs text-stone-500 dark:text-stone-400 -mt-0.5 italic">
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
                className="font-sans text-xs uppercase tracking-widest text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Languages, DarkMode & Toggle Menus */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Language Switcher Button */}
            <div className="flex bg-stone-200/50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-0.5">
              <button
                onClick={() => setLang('RO')}
                className={`px-2.5 py-1 text-xs tracking-wider rounded-md transition-all duration-350 cursor-pointer font-semibold ${
                  lang === 'RO'
                    ? 'bg-gold-500 text-stone-950 shadow-md'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                RO
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 text-xs tracking-wider rounded-md transition-all duration-350 cursor-pointer font-semibold ${
                  lang === 'EN'
                    ? 'bg-gold-500 text-stone-950 shadow-md'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                EN
              </button>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-all cursor-pointer border border-stone-200/20"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={17} className="text-gold-400" /> : <Moon size={17} className="text-stone-600" />}
            </button>
            
            <div className="text-[10px] uppercase font-mono tracking-wider text-amber-600 dark:text-amber-400 flex items-center bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full space-x-1.5">
              <Sparkles size={10} className="animate-spin-slow text-gold-500" />
              <span>{t.byzantineStyle}</span>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Theme switcher for mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full cursor-pointer"
            >
              {darkMode ? <Sun size={17} className="text-gold-400" /> : <Moon size={17} />}
            </button>

            {/* Language switcher for mobile */}
            <button
              onClick={() => setLang(lang === 'RO' ? 'EN' : 'RO')}
              className="px-2 py-1 border border-stone-300 dark:border-stone-800 text-xs rounded font-bold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200"
            >
              {lang}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full focus:outline-none"
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
            className="md:hidden border-t border-stone-200 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-950"
            id="mobile-drawer"
          >
            <div className="px-3 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="block px-4 py-3 text-sm font-medium tracking-widest uppercase text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg text-center border border-transparent hover:border-gold-500/20"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex justify-center">
                <div className="text-[10px] uppercase font-mono tracking-wider text-amber-500 dark:text-amber-400 flex items-center bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full space-x-1.5">
                  <Sparkles size={11} />
                  <span>{t.byzantineStyle}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
