/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Service } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroductionSection from './components/IntroductionSection';
import LiturgicalCalendar from './components/LiturgicalCalendar';
import SpiritualQuotes from './components/SpiritualQuotes';
import HistorySection from './components/HistorySection';
import GallerySection from './components/GallerySection';
import PangarDonations from './components/PangarDonations';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { db, handleFirestoreError, OperationType } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { SERVICES_SCHEDULING } from './data';
import { Megaphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('RO');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Firestore States
  const [announcement, setAnnouncement] = useState<{
    roTitle: string;
    roText: string;
    enTitle: string;
    enText: string;
    active: boolean;
  } | null>(null);
  
  const [servicesList, setServicesList] = useState<Service[]>(SERVICES_SCHEDULING);
  const [dismissedAnnouncement, setDismissedAnnouncement] = useState(false);

  // Route / Page Detection State
  const [isAdminView, setIsAdminView] = useState(
    window.location.pathname === '/admin' || window.location.hash === '#admin'
  );
  const [isGalleryView, setIsGalleryView] = useState(
    window.location.hash === '#gallery-page'
  );

  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminView(window.location.pathname === '/admin' || window.location.hash === '#admin');
      setIsGalleryView(window.location.hash === '#gallery-page');
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Sync dark theme class with document element for Tailwind dark prefixing to kick in
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Listen to Firestore real-time updates for announcement and services
  useEffect(() => {
    // 1. Get real-time updates for important announcement banner
    const annDocRef = doc(db, 'settings', 'announcement');
    const unsubAnn = onSnapshot(annDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as any;
        setAnnouncement(data);
        // Reset dismissed state if announcement text changed
        setDismissedAnnouncement(false);
      }
    }, (err) => {
      console.error('Error listening to announcement:', err);
      handleFirestoreError(err, OperationType.GET, 'settings/announcement');
    });

    // 2. Get real-time updates for listing of services
    const servDocRef = doc(db, 'settings', 'services');
    const unsubServ = onSnapshot(servDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as { list: Service[] };
        if (data && Array.isArray(data.list)) {
          setServicesList(data.list);
        }
      }
    }, (err) => {
      console.error('Error listening to services:', err);
      handleFirestoreError(err, OperationType.GET, 'settings/services');
    });

    return () => {
      unsubAnn();
      unsubServ();
    };
  }, []);

  if (isAdminView) {
    return <AdminPanel />;
  }

  if (isGalleryView) {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-sans transition-colors duration-300 antialiased overflow-x-hidden selection:bg-gold-500/30 selection:text-gold-200 pt-20">
        
        {/* Dynamic Header Navbar with bilingual and dark theme selectors */}
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />

        <main className="relative">
          <GallerySection lang={lang} isSeparatePage={true} />
        </main>

        {/* Footer and Canonical references */}
        <Footer lang={lang} />

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-sans transition-colors duration-300 antialiased overflow-x-hidden selection:bg-gold-500/30 selection:text-gold-200 pt-20">
      
      {/* Dynamic Header Navbar with bilingual and dark theme selectors */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      {/* Realtime Announcement Banner */}
      <AnimatePresence>
        {announcement && announcement.active && !dismissedAnnouncement && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-amber-600/10 via-gold-500/20 to-amber-600/10 border-b border-gold-500/35 relative z-40"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="p-1.5 bg-gold-500/15 text-gold-700 dark:text-gold-400 border border-gold-500/20 rounded-lg flex-shrink-0 animate-pulse">
                  <Megaphone size={14} />
                </div>
                <div className="text-xs sm:text-sm leading-relaxed">
                  <span className="font-display font-bold text-stone-900 dark:text-gold-200 uppercase tracking-wider mr-2">
                    {lang === 'RO' ? announcement.roTitle : announcement.enTitle}:
                  </span>
                  <span className="font-serif italic text-stone-700 dark:text-stone-300">
                    {lang === 'RO' ? announcement.roText : announcement.enText}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDismissedAnnouncement(true)}
                className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors rounded-lg cursor-pointer"
                title="Ascunde"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liturgical Hero and drift golden embers background */}
      <Hero lang={lang} />

      {/* Main Page Layout Wrapper */}
      <main className="relative">
        
        {/* Warm Mission Introduction Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <IntroductionSection lang={lang} />
        </motion.div>
        
        {/* Liturgical Schedules Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <LiturgicalCalendar lang={lang} services={servicesList} />
        </motion.div>

        {/* spiritual Quotes Wisdom and Reflections Widget */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SpiritualQuotes lang={lang} />
        </motion.div>

        {/* History and Tradition Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <HistorySection lang={lang} />
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <GallerySection lang={lang} isSeparatePage={false} />
        </motion.div>

        {/* Pangar Donations and Support Card Modules */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <PangarDonations lang={lang} />
        </motion.div>

        {/* Parish Contact and Map Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <ContactSection lang={lang} />
        </motion.div>

      </main>

      {/* Footer and Canonical references */}
      <Footer lang={lang} />

    </div>
  );
}
