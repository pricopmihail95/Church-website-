import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Mail, Phone, MapPin, Send, Compass, CheckCircle, Navigation, Copy } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = TRANSLATIONS[lang];

  const addressText = 'Methodist Church / Old Brumby United Church, 185 Ashby Rd, Scunthorpe DN16 2AQ';
  const phoneText = '07525 019441';
  const emailText1 = 'sthybaldorthodoxchurch@gmail.com';
  const emailText2 = 'cerghitmihai@gmail.com';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedZip, setCopiedZip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    // Simulate parish server receiving mail
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Auto close/reset state after 5s
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const handleCopyZip = () => {
    navigator.clipboard.writeText('DN16 2AQ').then(() => {
      setCopiedZip(true);
      setTimeout(() => setCopiedZip(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-24 bg-stone-900 text-stone-100 border-b border-stone-950 relative overflow-hidden transition-colors duration-300">
      
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-1/4 w-[400px].5 h-[400px] bg-gold-950/20 blur-[130px] rounded-full pointers-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-gold-400 font-mono text-[10px] uppercase tracking-widest border border-amber-500/20 mb-4">
            <Mail size={12} className="text-gold-400 rotate-12" />
            <span>{lang === 'RO' ? 'Misiune & Comunitate' : 'Mission & Fellowship'}</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 animate-fade-in">
            {t.contactTitle}
          </h2>
          
          <p className="font-serif text-stone-300 text-sm sm:text-base italic max-w-2xl mx-auto leading-relaxed">
            "{t.contactSubtitle}"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Info Grid Splitter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Block (5/12): Contact form */}
          <div className="lg:col-span-5 bg-stone-950 border border-stone-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
            <h3 className="font-display text-lg sm:text-xl font-medium text-gold-400 mb-6 border-b border-stone-850 pb-4">
              {lang === 'RO' ? 'Laolaltă în rugăciune' : 'Parish Request Box'}
            </h3>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fade-in">
                <CheckCircle size={52} className="text-emerald-500 animate-pulse" />
                <h4 className="font-display font-semibold text-white tracking-wide text-md">
                  {lang === 'RO' ? 'Mesaj Trimis!' : 'Message Received!'}
                </h4>
                <p className="font-serif text-sm text-stone-400 italic max-w-xs leading-relaxed">
                  {t.contactSuccessMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full name input */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-stone-400 mb-1.5 font-semibold">
                    {t.contactNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., George Popa"
                    className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none transition-all"
                  />
                </div>

                {/* Email address input */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-stone-400 mb-1.5 font-semibold">
                    {t.contactEmailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g., george@gamil.com"
                    className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none transition-all"
                  />
                </div>

                {/* Message input */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-stone-400 mb-1.5 font-semibold">
                    {t.contactMessageLabel}
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={lang === 'RO' ? 'Scrie gândurile tale aici...' : 'Write your request here...'}
                    className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-gold-500/50 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Send action trigger */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-gold-600 to-amber-500 hover:from-gold-500 hover:to-gold-400 text-stone-950 font-semibold rounded-xl text-xs tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={13} className={isSubmitting ? 'animate-ping' : ''} />
                  <span>{isSubmitting ? (lang === 'RO' ? 'Se trimite...' : 'Sending...') : t.contactSendBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Block (7/12): Map simulator and coordinate targets */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-stone-950 border border-stone-800/80 rounded-2xl p-6 shadow-2xl flex flex-col h-full justify-between">
                         {/* Info contacts header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-stone-850 pb-6 mb-6">
                <div>
                  <h4 className="font-display font-semibold text-stone-400 text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <span>{lang === 'RO' ? 'Locația Bisericii' : 'Church Location'}</span>
                  </h4>
                  <p className="font-serif text-sm text-stone-100 leading-normal italic">
                    {addressText}
                  </p>
                  
                  {/* Copy ZIP button */}
                  <button
                    onClick={handleCopyZip}
                    className="mt-2.5 inline-flex items-center space-x-1 px-2 py-1 border border-stone-800 bg-stone-900 hover:bg-stone-850 text-[10px] uppercase font-mono tracking-wider font-semibold rounded text-gold-400 select-none cursor-pointer transition-colors"
                  >
                    <Copy size={10} />
                    <span>{copiedZip ? (lang === 'RO' ? 'Copiat!' : 'Copied!') : 'DN16 2AQ'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-display font-semibold text-stone-400 text-xs uppercase tracking-widest mb-1.5">
                      {lang === 'RO' ? 'Preot Paroh' : 'Parish Priest'}
                    </h4>
                    <p className="font-sans font-bold text-white text-sm mb-1">
                      Father Mihai Cerghit
                    </p>
                    <p className="font-mono text-xs text-gold-400 font-bold flex items-center gap-1.5">
                      <Phone size={11} />
                      {phoneText}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display font-semibold text-stone-400 text-xs uppercase tracking-widest mb-1">
                      {lang === 'RO' ? 'Adrese Email' : 'Email Addresses'}
                    </h4>
                    <p className="font-mono text-[11px] text-gold-400 flex items-center gap-1.5">
                      <Mail size={11} className="flex-shrink-0" />
                      <span className="truncate">{emailText1}</span>
                    </p>
                    <p className="font-mono text-[11px] text-gold-400 flex items-center gap-1.5 mt-0.5">
                      <Mail size={11} className="flex-shrink-0" />
                      <span className="truncate">{emailText2}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* simulated Map (Byzantine styled vector compass chart) */}
              <div className="relative flex-grow min-h-[220px] bg-stone-900/60 rounded-xl border border-stone-850 overflow-hidden p-4 flex flex-col justify-between">
                
                {/* Background layout cross grids resembling a true mapping interface */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:20px_20px]" />
                
                {/* Visual Landmark markers pins */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-[10px] font-mono tracking-widest text-stone-500 uppercase flex items-center gap-1">
                      <Compass size={11} className="animate-spin-slow" />
                      <span>53.5796° N, 0.6548° W</span>
                    </div>
                    
                    <span className="text-[9px] uppercase tracking-wider font-mono text-gold-500 bg-gold-400/10 border border-gold-500/20 px-2.5 py-0.5 rounded">
                      DN16 2AQ
                    </span>
                  </div>
 
                  {/* Centered Golden Altar Map Bullseye indicator */}
                  <div className="my-auto self-center text-center p-6 bg-stone-950/60 border border-stone-800 rounded-2xl max-w-sm shadow-xl flex items-center space-x-4">
                    <div className="relative p-3 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 flex-shrink-0">
                      <MapPin size={22} className="animate-bounce" />
                      <div className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-gold-400 border border-stone-950 flex items-center justify-center font-bold text-[8px] text-stone-950">
                        ✝
                      </div>
                    </div>
                    
                    <div className="text-left">
                      <h5 className="font-display font-semibold text-white tracking-wide text-xs uppercase text-gold-300">
                        {lang === 'RO' ? 'Biserica Metodistă' : 'Methodist Church'}
                      </h5>
                      <p className="font-serif text-[11px] text-stone-300 italic mt-0.5 leading-tight">
                        Old Brumby United Church, 185 Ashby Rd, Scunthorpe
                      </p>
                      <p className="font-sans text-[9px] text-stone-500 font-semibold mt-1">
                        * {lang === 'RO' ? 'În fiecare Duminică la slujbă' : 'Every Sunday for Liturgy'}
                      </p>
                    </div>
                  </div>

                  {/* Compass directions helper footer */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-850 pt-3 mt-3">
                    <div className="flex items-center gap-1">
                      <Navigation size={11} className="text-gold-500" />
                      <span className="font-serif italic text-stone-400">{lang === 'RO' ? 'Spre Centru / M181' : 'Towards Town Centre / M181'}</span>
                    </div>
                    
                    <cite className="not-italic font-mono text-[9px] text-stone-500 uppercase tracking-widest">
                      Orthodox Mission Map
                    </cite>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
