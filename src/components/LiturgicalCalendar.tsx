import React, { useState } from 'react';
import { SERVICES_SCHEDULING, TRANSLATIONS } from '../data';
import { Language, Service } from '../types';
import { CalendarRange, Clock, BookOpen, Sparkles, Filter, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LiturgicalCalendarProps {
  lang: Language;
  services?: Service[];
}

export default function LiturgicalCalendar({ lang, services }: LiturgicalCalendarProps) {
  const t = TRANSLATIONS[lang];
  const [activeFilter, setActiveFilter] = useState<'all' | 'sunday' | 'saturday' | 'weekday'>('all');

  const servicesToUse = services || SERVICES_SCHEDULING;

  const filteredServices = servicesToUse.filter((service) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sunday') return service.day.EN.toLowerCase().includes('sunday');
    if (activeFilter === 'saturday') return service.day.EN.toLowerCase().includes('saturday');
    if (activeFilter === 'weekday') {
      const isSunday = service.day.EN.toLowerCase().includes('sunday');
      const isSaturday = service.day.EN.toLowerCase().includes('saturday');
      return !isSunday && !isSaturday;
    }
    return true;
  });

  // Categorize services to group them clearly
  const regularServices = filteredServices.filter((s) => {
    return s.id === 'matins' || s.id === 'liturgy' || s.id === 'refreshments' || s.type === 'liturgy';
  });

  const onRequestServices = filteredServices.filter((s) => {
    return s.id === 'confessive' || s.id === 'sacramental' || s.id === 'parastase' || s.type === 'sacrament' || (s.type === 'special' && s.id !== 'refreshments');
  });

  return (
    <section id="services" className="py-24 bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 dark:bg-gold-500/15 text-gold-700 dark:text-gold-300 font-mono text-[10px] uppercase tracking-widest border border-gold-500/20 mb-4">
            <CalendarRange size={12} className="text-gold-500 animate-pulse" />
            <span>{lang === 'RO' ? 'Liturgică' : 'Liturgical'}</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
            {t.liturgySectionTitle}
          </h2>
          
          <p className="font-serif text-stone-600 dark:text-stone-400 text-sm sm:text-base italic max-w-2xl mx-auto leading-relaxed">
            "{t.liturgySectionSubtitle}"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Live Vigil/Sunday Altar Reminder Alert Banner */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-600/10 via-gold-500/15 to-amber-600/10 border border-gold-500/30 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="absolute top-0 right-0 h-full w-32 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.15),transparent_70%) pointer-events-none" />
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-3 rounded-xl bg-gold-500/10 dark:bg-gold-500/20 text-gold-700 dark:text-gold-400 border border-gold-500/20 flex-shrink-0 animate-bounce">
                <BellRing size={20} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base tracking-wide">
                  {lang === 'RO' ? 'Pregătire pentru Sfânta Împărtășanie' : 'Preparation for Holy Communion'}
                </h4>
                <p className="font-serif text-xs text-stone-600 dark:text-stone-400 italic max-w-md mt-1">
                  {lang === 'RO' 
                    ? 'Pentru Sfintele Taine, credincioșii sunt sfătuiți să țină post liturgic de la miezul nopții și să ia binecuvântare pentru Spovedanie.'
                    : 'For Holy Sacraments, faithful are advised to keep the eucharistic fast from midnight and request Confession blessings.'}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="text-xs uppercase font-mono tracking-widest bg-stone-900/10 dark:bg-white/10 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 font-semibold">
                {lang === 'RO' ? 'Duminică 09:00 - Utrenie' : 'Sunday 09:00 - Matins'}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer border transition-all duration-200 ${
              activeFilter === 'all'
                ? 'bg-gold-500 border-gold-500 text-stone-950 shadow-md transform -translate-y-0.5'
                : 'bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-850 hover:border-gold-500/50 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            {t.allDays}
          </button>
          
          <button
            onClick={() => setActiveFilter('sunday')}
            className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer border transition-all duration-200 ${
              activeFilter === 'sunday'
                ? 'bg-gold-500 border-gold-500 text-stone-950 shadow-md transform -translate-y-0.5'
                : 'bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-850 hover:border-gold-500/50 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            {t.sundayLabel}
          </button>
          
          <button
            onClick={() => setActiveFilter('saturday')}
            className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer border transition-all duration-200 ${
              activeFilter === 'saturday'
                ? 'bg-gold-500 border-gold-500 text-stone-950 shadow-md transform -translate-y-0.5'
                : 'bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-850 hover:border-gold-500/50 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            {t.saturdayLabel}
          </button>

          <button
            onClick={() => setActiveFilter('weekday')}
            className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer border transition-all duration-200 ${
              activeFilter === 'weekday'
                ? 'bg-gold-500 border-gold-500 text-stone-950 shadow-md transform -translate-y-0.5'
                : 'bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-850 hover:border-gold-500/50 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            {t.weekdayLabel}
          </button>
        </div>

        {/* Regular Sunday Services Section */}
        {regularServices.length > 0 && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-1.5 h-6 bg-gold-500 rounded-full" />
              <h3 className="font-display font-semibold text-sm sm:text-base text-stone-900 dark:text-gold-100 uppercase tracking-widest text-[11px] sm:text-[13px]">
                {lang === 'RO' ? 'Programul de Duminică (Slujbe Regulate)' : 'Regular Sunday Liturgical Services'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {regularServices.map((service, index) => {
                  const iconColor = 'bg-gold-500/10 text-gold-600 dark:text-gold-400 border-gold-500/30';
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      key={service.id}
                      className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 hover:border-gold-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(212,171,21,0.05)] cursor-default group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-gold-600 dark:text-gold-400 bg-gold-400/10 px-2.5 py-1 rounded-full border border-gold-400/20">
                            {service.day[lang]}
                          </span>
                          
                          <div className={`p-2 rounded-lg border flex items-center justify-center ${iconColor}`}>
                            <Clock size={16} />
                          </div>
                        </div>

                        <h3 className="font-display text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                          {service.name[lang]}
                        </h3>

                        <p className="font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed italic mt-3 mb-6">
                          {service.description[lang]}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 dark:border-stone-900 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-stone-500 dark:text-stone-400 text-xs font-mono">
                          <Clock size={12} className="text-gold-500" />
                          <span className="font-semibold">
                            {typeof service.time === 'object' ? service.time[lang] : service.time}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5 opacity-30 group-hover:opacity-75 transition-opacity">
                          <svg viewBox="0 0 10 10" className="w-1.5 h-1.5 fill-gold-500">
                            <circle cx="5" cy="5" r="5" />
                          </svg>
                          <span className="text-[9px] uppercase tracking-wider font-mono">Antioch</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Services on Request / Sacraments Section with distinct stylistic layout (Providing individuality) */}
        {onRequestServices.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-1.5 h-6 bg-amber-600 rounded-full" />
              <h3 className="font-display font-semibold text-sm sm:text-base text-stone-900 dark:text-amber-400 uppercase tracking-widest text-[11px] sm:text-[13px]">
                {lang === 'RO' ? 'Sfintele Taine & Slujbe la Cerere (Cu Programare)' : 'Sacraments & Pastoral Services On Request'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {onRequestServices.map((service, index) => {
                  const iconColor = 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      key={service.id}
                      className="bg-stone-100/40 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 hover:border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(217,119,6,0.03)] cursor-default group relative overflow-hidden"
                    >
                      {/* Subtle elegant gradient backdrop highlight giving it high craft and clear individuality */}
                      <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.05),transparent_70%) pointer-events-none" />
                      
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 dark:text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded-full border border-amber-500/10">
                            {lang === 'RO' ? 'La Cerere' : 'Upon Request'}
                          </span>
                          
                          <div className={`p-2 rounded-lg border flex items-center justify-center ${iconColor}`}>
                            <BookOpen size={16} />
                          </div>
                        </div>

                        <h3 className="font-display text-lg sm:text-xl font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                          {service.name[lang]}
                        </h3>

                        <p className="font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed italic mt-3 mb-6">
                          {service.description[lang]}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/80 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-stone-500 dark:text-stone-400 text-xs font-mono">
                          <Clock size={12} className="text-amber-600" />
                          <span className="font-semibold text-amber-700 dark:text-amber-400">
                            {typeof service.time === 'object' ? service.time[lang] : service.time}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5 opacity-30 group-hover:opacity-75 transition-opacity">
                          <span className="text-[9px] uppercase tracking-wider font-mono text-amber-600">{lang === 'RO' ? 'Sfat' : 'Care'}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
