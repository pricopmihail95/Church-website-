import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Mail, Phone, MapPin, Send, Compass, CheckCircle, Copy, ChevronDown } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <section id="contact" className="py-24 bg-transparent dark:bg-byz-blue-950 text-stone-900 dark:text-stone-100 border-b border-transparent dark:border-byz-blue-950 relative overflow-hidden transition-colors duration-300">
      
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-1/4 w-[400px].5 h-[400px] bg-gold-950/20 blur-[130px] rounded-full pointers-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mobile Drop Bar Header */}
        <div 
          className="lg:hidden bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-800/60 rounded-3xl p-5 sm:p-7  mb-8 flex flex-row items-center justify-between cursor-pointer transition-all active:scale-[0.98]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col text-left pr-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-gold-400 font-mono text-[10px] uppercase tracking-widest border border-amber-500/20 mb-3 w-fit">
              <Mail size={12} className="text-gold-400 rotate-12" />
              <span>{lang === 'RO' ? 'Misiune & Comunitate' : 'Mission & Fellowship'}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-white leading-tight">
              {t.contactTitle}
            </h2>
            <p className={`mt-2 text-xs text-stone-300/80 font-serif italic transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
              "{t.contactSubtitle}"
            </p>
          </div>
          <div className={`flex items-center justify-center w-12 h-12 flex-shrink-0 bg-gradient-to-tr from-gold-600 to-amber-500 rounded-full text-white shadow-lg shadow-gold-500/20 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
             <ChevronDown size={24} />
          </div>
        </div>

        {/* Desktop Title Header */}
        <div className="hidden lg:block text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-gold-400 font-mono text-[10px] uppercase tracking-widest border border-amber-500/20 mb-4">
            <Mail size={12} className="text-gold-400 rotate-12" />
            <span>{lang === 'RO' ? 'Misiune & Comunitate' : 'Mission & Fellowship'}</span>
          </div>
          
          <h2 className="font-display text-4xl lg:text-5xl font-medium tracking-tight text-gold-400 dark:text-white mb-4 animate-fade-in">
            {t.contactTitle}
          </h2>
          
          <p className="font-serif text-stone-700 dark:text-stone-300 text-base italic max-w-2xl mx-auto leading-relaxed">
            "{t.contactSubtitle}"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Info Grid Splitter */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 max-h-[2500px]' : 'opacity-0 max-h-0 overflow-hidden'} lg:opacity-100 lg:max-h-none lg:overflow-visible`}>
          
          {/* Left Block (5/12): Contact form */}
          <div className="lg:col-span-5 bg-stone-900 shadow-xl dark:bg-byz-blue-900/30 border border-stone-800 dark:border-byz-blue-800/50 p-6 sm:p-8 rounded-3xl ">
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
                    className="w-full px-4 py-3 bg-byz-blue-950 border border-byz-blue-800/60 focus:border-gold-500/50 rounded-xl text-stone-100 placeholder-byz-blue-400/50 text-sm focus:outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-byz-blue-950 border border-byz-blue-800/60 focus:border-gold-500/50 rounded-xl text-stone-100 placeholder-byz-blue-400/50 text-sm focus:outline-none transition-all"
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
                    className="w-full px-4 py-3 bg-byz-blue-950 border border-byz-blue-800/60 focus:border-gold-500/50 rounded-xl text-stone-100 placeholder-byz-blue-400/50 text-sm focus:outline-none transition-all resize-none"
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

          {/* Right Block (7/12): Contact information card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900 shadow-xl dark:bg-byz-blue-900/30 border border-stone-800 dark:border-byz-blue-800/50 rounded-3xl p-8 sm:p-10  h-full flex flex-col justify-center">
              {/* Info contacts list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-display font-semibold text-stone-400 text-xs uppercase tracking-widest mb-2 flex items-center gap-1">
                    <span>{lang === 'RO' ? 'Locația Bisericii' : 'Church Location'}</span>
                  </h4>
                  <p className="font-serif text-sm text-stone-100 leading-relaxed italic">
                    {addressText}
                  </p>
                  
                  {/* Copy ZIP button */}
                  <button
                    onClick={handleCopyZip}
                    className="mt-3.5 inline-flex items-center space-x-1.5 px-3 py-1.5 border border-byz-blue-800 bg-byz-blue-950 hover:bg-byz-blue-900 text-[10px] uppercase font-mono tracking-wider font-semibold rounded text-gold-400 select-none cursor-pointer transition-colors"
                  >
                    <Copy size={10} />
                    <span>{copiedZip ? (lang === 'RO' ? 'Copiat!' : 'Copied!') : 'DN16 2AQ'}</span>
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="font-display font-semibold text-stone-400 text-xs uppercase tracking-widest mb-1.5">
                      {lang === 'RO' ? 'Preot Paroh' : 'Parish Priest'}
                    </h4>
                    <p className="font-sans font-bold text-white text-sm mb-1.5">
                      Father Mihai Cerghit
                    </p>
                    <p className="font-mono text-xs text-gold-400 font-bold flex items-center gap-1.5">
                      <Phone size={11} />
                      {phoneText}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display font-semibold text-stone-400 text-xs uppercase tracking-widest mb-1.5">
                      {lang === 'RO' ? 'Adrese Email' : 'Email Addresses'}
                    </h4>
                    <p className="font-mono text-[11px] text-gold-400 flex items-center gap-1.5">
                      <Mail size={11} className="flex-shrink-0" />
                      <span className="truncate">{emailText1}</span>
                    </p>
                    <p className="font-mono text-[11px] text-gold-400 flex items-center gap-1.5 mt-1">
                      <Mail size={11} className="flex-shrink-0" />
                      <span className="truncate">{emailText2}</span>
                    </p>
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
