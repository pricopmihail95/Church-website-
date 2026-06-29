import React from 'react';
import { TRANSLATIONS, SERVICES_SCHEDULING } from '../data';
import { Language, Service } from '../types';
import { Clock, BookOpen, Compass, ExternalLink, HeartHandshake, MapPin, Sparkles, MessageCircle, Calendar } from 'lucide-react';
import ArchdioceseLogo from './ArchdioceseLogo';

interface LiturgicalCalendarProps {
  lang: Language;
  services?: any[];
  canonicalLogoUrl?: string;
}

export default function LiturgicalCalendar({ lang, services, canonicalLogoUrl }: LiturgicalCalendarProps) {
  const t = TRANSLATIONS[lang];

  // Fallback to static defaults if database array is empty or not yet loaded
  const rawServices = (services && services.length > 0) ? services : SERVICES_SCHEDULING;
  
  // Filter out any service that has been completely wiped, has no name/time, or is marked as hidden
  const displayServices = rawServices.filter((s: Service) => {
    if (s.hidden === true) return false;
    const nameVal = typeof s.name === 'object' ? s.name[lang] : s.name;
    return nameVal && nameVal.trim() !== '';
  });

  const halfLength = Math.ceil(displayServices.length / 2);
  const leftServices = displayServices.slice(0, halfLength);
  const rightServices = displayServices.slice(halfLength);

  const handleOpenMap = () => {
    window.open('https://maps.google.com/?q=Old+Brumby+United+Church+Scunthorpe', '_blank');
  };

  return (
    <section id="services" className="py-24 bg-transparent text-stone-900 dark:bg-byz-blue-950 dark:text-byz-blue-100 border-b border-stone-800 dark:border-byz-blue-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 bg-stone-900 shadow-xl dark:bg-transparent p-8 rounded-3xl border border-stone-800 dark:border-none backdrop-blur-sm">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 dark:bg-gold-500/15 text-gold-700 dark:text-gold-300 font-mono text-[10px] uppercase tracking-widest border border-stone-800 dark:border-byz-blue-800/40 mb-4 font-semibold">
            <Sparkles size={12} className="text-gold-500 animate-pulse" />
            <span>{lang === 'RO' ? 'Viața Comunității' : 'Parish Fellowship'}</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-gold-400 dark:text-gold-50">
            {lang === 'RO' ? 'Slujbe & Comunitate' : 'Services & Community'}
          </h2>
          
          <p className="font-serif text-stone-200 dark:text-byz-blue-200 text-sm sm:text-base italic max-w-2xl mx-auto leading-relaxed">
            {lang === 'RO' 
              ? '„Să veghem unii asupra altora ca să ne îndemnăm la dragoste și la fapte bune.” (Evrei 10:24)'
              : '“Let us consider one another in order to stir up love and good works.” (Hebrews 10:24)'}
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Two-Column Layout Grid (2fr 1fr - exact parity with the provided model layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Welcome details & cards (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About Community Section */}
            <div className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/60 p-6 sm:p-8 rounded-3xl ">
              <h3 className="font-display text-xl sm:text-2xl font-medium text-gold-400 dark:text-gold-100 mb-4 border-b border-white/10 dark:border-byz-blue-900/80 pb-3">
                {lang === 'RO' ? 'Despre Comunitate' : 'About the Community'}
              </h3>
              
              <p className="font-serif text-sm sm:text-base text-stone-100 dark:text-byz-blue-200 leading-relaxed italic mb-4">
                {lang === 'RO' 
                  ? 'Parohia noastră din Scunthorpe s-a născut din dorința de a oferi o casă spirituală credincioșilor ortodocși din nordul Lincolnshire. Sub oblăduirea canonică a Arhiepiscopiei Antiochiane a Insulelor Britanice și Irlandei, adunăm laolaltă credincioși de diverse naționalități, uniți în aceeași credință curată, săvârșind slujbe pline de pace și căldură sufletească în limba engleză.'
                  : 'Our community in Scunthorpe was born out of a desire to provide a spiritual home for Orthodox Christians in North Lincolnshire. Under the spiritual care of the Antiochian Orthodox Archdiocese of the British Isles and Ireland, we bring together believers of all nationalities — united in the same pristine faith, holding peaceful and warm services.'}
              </p>
              
              <p className="font-sans text-xs sm:text-sm text-stone-200 dark:text-byz-blue-300 leading-relaxed">
                {lang === 'RO'
                  ? 'Deși suntem o misiune relativ mică pe pământ britanic, dragostea frățească și deschiderea către credincioși de orice origine ne oferă puterea de a crește frumos în Hristos Domnul. Vă așteptăm cu bucurie să fiți parte din mica noastră familie duhovnicească.'
                  : 'Although we are a relatively small mission on British soil, brotherly love and openness to believers of all origins give us the strength to grow beautifully in Christ our Lord. We joyfully welcome you to be part of our small spiritual family.'}
              </p>
            </div>

            {/* Schedule of Services Card */}
            <div className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/60 rounded-3xl p-6 sm:p-8  relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.05),transparent_70%) pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 dark:border-byz-blue-900/80">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 dark:text-byz-blue-300 bg-white/10 dark:bg-byz-blue-950 px-2.5 py-1 rounded-full border border-stone-800 dark:border-byz-blue-900">
                  {lang === 'RO' ? 'Program Slujbe' : 'Service Schedule'}
                </span>
                <div className="p-2 rounded-lg bg-white/10 dark:bg-byz-blue-950 text-gold-400 dark:text-gold-400 border border-stone-800 dark:border-stone-800">
                  <Calendar size={16} />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-medium text-gold-400 dark:text-gold-100 mb-6">
                {lang === 'RO' ? 'Programul Slujbelor' : 'Schedule of Services'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {leftServices.map((service, index) => (
                    <div key={service.id || `left-${index}`} className="flex justify-between items-start text-xs sm:text-sm border-b border-white/10 dark:border-byz-blue-950/40 pb-2.5">
                      <div className="font-semibold text-white dark:text-byz-blue-100">
                        {typeof service.day === 'object' ? service.day[lang] : service.day}:
                      </div>
                      <div className="text-right text-stone-200 dark:text-byz-blue-300 font-mono text-xs font-semibold">
                        {typeof service.time === 'object' ? service.time[lang] : service.time} - {typeof service.name === 'object' ? service.name[lang] : service.name}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {rightServices.map((service, index) => (
                    <div key={service.id || `right-${index}`} className="flex justify-between items-start text-xs sm:text-sm border-b border-white/10 dark:border-byz-blue-950/40 pb-2.5">
                      <div className="font-semibold text-white dark:text-byz-blue-100">
                        {typeof service.day === 'object' ? service.day[lang] : service.day}:
                      </div>
                      <div className="text-right text-stone-200 dark:text-byz-blue-300 font-mono text-xs font-semibold">
                        {typeof service.time === 'object' ? service.time[lang] : service.time} - {typeof service.name === 'object' ? service.name[lang] : service.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-stone-300 dark:text-byz-blue-300 text-[11px] sm:text-xs leading-relaxed italic mt-5 pt-4 border-t border-white/10 dark:border-byz-blue-900/50">
                {lang === 'RO'
                  ? '* Pentru sărbătorile din timpul săptămânii, urmăriți anunțurile de pe grupul de WhatsApp.'
                  : '* For weekday feast services, please follow the announcements on our parish WhatsApp group.'}
              </p>
            </div>

            {/* Grid of Custom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Services on Request / Sfinte Taine */}
              <div className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-gold-500/30 transition-all duration-300  relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.05),transparent_70%) pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 dark:text-byz-blue-300 bg-white/10 dark:bg-byz-blue-950 px-2.5 py-1 rounded-full border border-stone-800 dark:border-byz-blue-900">
                      {lang === 'RO' ? 'Servicii la Cerere' : 'Services on Request'}
                    </span>
                    <div className="p-2 rounded-lg bg-white/10 dark:bg-byz-blue-950 text-gold-400 dark:text-byz-blue-300 border border-stone-800 dark:border-byz-blue-900">
                      <BookOpen size={16} />
                    </div>
                  </div>

                  <h4 className="font-display text-lg font-semibold text-gold-400 dark:text-stone-100 mb-2.5 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {lang === 'RO' ? 'Sfintele Taine & Ierurgii' : 'Holy Sacraments & Prayers'}
                  </h4>

                  <p className="font-serif text-xs sm:text-sm text-stone-200 dark:text-byz-blue-200 leading-relaxed italic mb-4">
                    {lang === 'RO'
                      ? 'Părintele Paroh Mihai Cerghit este oricând disponibil pentru săvârșirea Sfintelor Taine: Sfânta Spovedanie, Sfântul Botez, Cununia Sfântă, precum și sfeștanii de casă, rugăciuni la boli și pomeniri.'
                      : 'Parish Priest Father Mihai Cerghit is always available for the Holy Sacraments: Confession, Holy Baptism, Holy Matrimony, as well as house blessings, prayers for healing, and memorials.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 dark:border-byz-blue-900/50 flex justify-between items-center text-xs font-mono text-gold-600 dark:text-gold-400">
                  <span>{lang === 'RO' ? '✝ Contactați Părintele' : '✝ Contact Priest'}</span>
                  <a href="#contact" className="hover:underline flex items-center gap-1 font-semibold">
                    {lang === 'RO' ? 'Detalii' : 'Details'} →
                  </a>
                </div>
              </div>

              {/* Card 2: Philanthropy Actions */}
              <div className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-gold-500/30 transition-all duration-300  relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.05),transparent_70%) pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-rose-200 dark:text-rose-450 bg-rose-500/20 dark:bg-rose-950 px-2.5 py-1 rounded-full border border-rose-500/30 dark:border-rose-900">
                      {lang === 'RO' ? 'Caritate & Sprijin' : 'Charity & Alms'}
                    </span>
                    <div className="p-2 rounded-lg bg-rose-500/20 dark:bg-rose-950 text-rose-200 dark:text-rose-450 border border-rose-500/30 dark:border-rose-900">
                      <HeartHandshake size={16} />
                    </div>
                  </div>

                  <h4 className="font-display text-lg font-semibold text-gold-400 dark:text-stone-100 mb-2.5 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {lang === 'RO' ? 'Acțiuni Filantropice' : 'Philanthropic Outreaches'}
                  </h4>

                  <p className="font-serif text-xs sm:text-sm text-stone-200 dark:text-byz-blue-200 leading-relaxed italic mb-4">
                    {lang === 'RO'
                      ? 'Cum ne organizăm pentru a întinde o mână de ajutor celor aflați în dificultate și a oferi sprijin material și sufletesc persoanelor defavorizate ori nou-venite în zona Doncaster / Scunthorpe.'
                      : 'How we organize as a parish family to extend a helping hand to those undergoing hardships, offering material and spiritual care for vulnerable people or newcomers in Scunthorpe.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 dark:border-byz-blue-900/50 flex justify-between items-center text-xs font-mono text-gold-600 dark:text-gold-400">
                  <span>{lang === 'RO' ? 'Registered Charity 1208759' : 'Charity No: 1208759'}</span>
                  <a href="#support" className="hover:underline flex items-center gap-1 font-semibold">
                    {lang === 'RO' ? 'Susține' : 'Sustain'} →
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Sidebar with canonical authority & live map (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box 0: Canonical Archdiocese Authority (Requested Logo in the Right Section) */}
            <div className="bg-stone-900 shadow-xl border border-stone-800 p-6 rounded-3xl text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-radial-gradient(ellipse_at_top_right,rgba(212,171,21,0.06),transparent_70%) pointer-events-none" />
              
              {/* Authentic representation of the uploaded black & white circular crest of the Archdiocese */}
              <div className="mx-auto w-24 h-24 mb-4 text-white relative flex items-center justify-center bg-stone-950 rounded-full p-2 border border-gold-500/30">
                {canonicalLogoUrl ? (
                  <img src={canonicalLogoUrl} alt="Canonical Logo" className="w-20 h-20 object-contain rounded-full" />
                ) : (
                  <ArchdioceseLogo className="w-20 h-20 text-white" />
                )}
                <div className="absolute inset-0 rounded-full border border-gold-500/10 group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
              </div>

              <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400 font-bold block mb-1">
                {lang === 'RO' ? 'Autoritate Canonică' : 'Canonical Authority'}
              </span>
              
              <h4 className="font-display text-xs font-bold text-stone-100 leading-tight uppercase tracking-wider mb-2">
                {lang === 'RO' 
                  ? 'Arhiepiscopia Ortodoxă Antiochiană' 
                  : 'Antiochian Orthodox Archdiocese'}
              </h4>
              <p className="font-serif text-[11px] text-stone-400 leading-normal italic mb-4">
                {lang === 'RO'
                  ? 'a Insulelor Britanice și Irlandei • Sub oblăduirea ÎPS Mitropolit Silouan'
                  : 'of the British Isles and Ireland • Under Metropolitan Silouan'}
              </p>
              
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-[9px] font-mono font-semibold text-gold-300">
                <span>PATRIARCHATE OF ANTIOCH</span>
              </div>
            </div>

            {/* Box 2: Unde ne găsiți (Google Maps box) */}
            <div className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/60 p-6 sm:p-7 rounded-3xl ">
              <h3 className="font-display text-lg font-semibold text-gold-400 dark:text-white mb-4">
                {lang === 'RO' ? 'Unde ne găsiți' : 'Where to Find Us'}
              </h3>
              
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-stone-200 dark:text-byz-blue-200 italic font-serif leading-relaxed mb-4">
                <MapPin size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <p>
                  Old Brumby United Church / Methodist Church, 185 Ashby Rd, Scunthorpe DN16 2AQ
                </p>
              </div>

              <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-stone-800 dark:border-byz-blue-900/60 mb-4 shadow-inner">
                <iframe
                  title="Google Map Location"
                  src="https://maps.google.com/maps?q=Old%20Brumby%20United%20Church,%20185%20Ashby%20Rd,%20Scunthorpe%20DN16%202AQ&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <p className="text-[11px] sm:text-xs text-stone-300 dark:text-byz-blue-300 leading-normal mb-5">
                {lang === 'RO'
                  ? 'Slujbele noastre se țin în format fizic la adresa comunității. Parcare auto gratuită disponibilă în zona din spate a clădirii.'
                  : 'Our services are held physically at the community address. Free car parking is available in the rear area of the church building.'}
              </p>

              <button
                onClick={handleOpenMap}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-byz-blue-650 text-white font-sans font-semibold rounded-xl text-xs hover:bg-gold-500 hover:text-stone-950 transition-all shadow-sm cursor-pointer"
              >
                <Compass size={14} />
                <span>{lang === 'RO' ? 'Deschide în Google Maps' : 'Open in Google Maps'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
