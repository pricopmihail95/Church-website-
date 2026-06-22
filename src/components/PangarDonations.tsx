import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Coins, Copy, Check, ShieldCheck, HeartHandshake, Package, Landmark } from 'lucide-react';

interface PangarDonationsProps {
  lang: Language;
}

export default function PangarDonations({ lang }: PangarDonationsProps) {
  const t = TRANSLATIONS[lang];
  
  const sortCode = '30-99-50';
  const accountNum = '30072363';
  const charityNum = '1208759';
  const accountName = "St Hybald's Antiochian Orthodox Christian Community";

  const [copiedField, setCopiedField] = useState<'name' | 'sort' | 'account' | 'charity' | null>(null);

  const handleCopy = (text: string, field: 'name' | 'sort' | 'account' | 'charity') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const wishListItems = lang === 'RO' ? [
    { name: 'Ceară curată de albine (pentru lumânări)', spec: '100% naturală' },
    { name: 'Ulei de măsline virgin (pentru candele)', spec: 'Fără aditivi' },
    { name: 'Tămâie naturală (Muntele Athos)', spec: 'Arome curate de iasomie/trandafir' },
    { name: 'Cărți liturgice bilingve (RO/EN)', spec: 'Acatistiere, Ceasloave' },
  ] : [
    { name: 'Pure Beeswax (for candles)', spec: '100% natural, unscented' },
    { name: 'Extra Virgin Olive Oil (for oil lamps)', spec: 'Additive-free' },
    { name: 'Athonite Incense (Mount Athos)', spec: 'Jasmine, Rose, or Byzantine fragrances' },
    { name: 'Bilingual Liturgical Books (RO/EN)', spec: 'Horologion, Service books' },
  ];

  return (
    <section id="support" className="py-24 bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-850 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 dark:bg-gold-500/15 text-gold-700 dark:text-gold-300 font-mono text-[10px] uppercase tracking-widest border border-gold-500/20 mb-4 font-semibold">
            <Coins size={12} className="text-gold-500 animate-pulse" />
            <span>{lang === 'RO' ? 'Zeciuială & Milostenie' : 'Stewardship & Alms'}</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 animate-fade-in">
            {t.supportTitle}
          </h2>
          
          <p className="font-serif text-stone-600 dark:text-stone-400 text-sm sm:text-base italic max-w-2xl mx-auto leading-relaxed">
            "{t.supportSubtitle}"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Support Grid Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Box 1: Bank Transfer with Copy parameters */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between group hover:border-gold-500/30 transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-amber-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Landmark size={20} />
              </div>

              <h3 className="font-display text-xl font-semibold mb-3">
                {t.supportBankTransfers}
              </h3>
              
              <p className="font-serif text-xs text-stone-500 dark:text-stone-400 italic mb-6 leading-relaxed">
                {lang === 'RO' 
                  ? 'Donațiile pot fi efectuate direct prin transfer bancar către contul oficial al asociației noastre.'
                  : 'If you want to make a donation to support our Orthodox mission in Scunthorpe you can do it at:'}
              </p>

              <div className="space-y-4">
                {/* Beneficiary Row */}
                <div className="bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-850 p-3 rounded-xl flex flex-col space-y-1.5 text-xs text-left">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-stone-500 dark:text-stone-400 uppercase font-mono tracking-wider font-semibold text-[10px]">Beneficiary Name</span>
                    <button
                      onClick={() => handleCopy(accountName, 'name')}
                      className="p-1 text-stone-400 hover:text-gold-500 hover:bg-stone-200 dark:hover:bg-stone-800 rounded transition-all cursor-pointer"
                      title="Copy Name"
                    >
                      {copiedField === 'name' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                  <span className="font-sans font-bold text-stone-800 dark:text-stone-200 text-xs tracking-wide leading-normal">{accountName}</span>
                </div>

                {/* Sort Code Row */}
                <div className="bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-850 p-3 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-stone-500 dark:text-stone-400 uppercase font-mono tracking-wider font-semibold text-[10px]">Sort Code</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{sortCode}</span>
                    <button
                      onClick={() => handleCopy(sortCode, 'sort')}
                      className="p-1 text-stone-400 hover:text-gold-500 hover:bg-stone-200 dark:hover:bg-stone-800 rounded transition-all cursor-pointer"
                      title="Copy Sort Code"
                    >
                      {copiedField === 'sort' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                {/* Account Number Row */}
                <div className="bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-850 p-3 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-stone-500 dark:text-stone-400 uppercase font-mono tracking-wider font-semibold text-[10px]">Account No</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{accountNum}</span>
                    <button
                      onClick={() => handleCopy(accountNum, 'account')}
                      className="p-1 text-stone-400 hover:text-gold-500 hover:bg-stone-200 dark:hover:bg-stone-800 rounded transition-all cursor-pointer"
                      title="Copy Account Number"
                    >
                      {copiedField === 'account' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                {/* Charity Row */}
                <div className="bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-850 p-3 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-stone-500 dark:text-stone-400 uppercase font-mono tracking-wider font-semibold text-[10px]">Charity No</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{charityNum}</span>
                    <button
                      onClick={() => handleCopy(charityNum, 'charity')}
                      className="p-1 text-stone-400 hover:text-gold-500 hover:bg-stone-200 dark:hover:bg-stone-800 rounded transition-all cursor-pointer"
                      title="Copy Charity Registration"
                    >
                      {copiedField === 'charity' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] text-center uppercase tracking-wider text-stone-500 font-mono italic">
              * UK Registered Charity
            </div>
          </div>

          {/* Box 2: Gift Aid UK explanation */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between group hover:border-gold-500/30 transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={20} />
              </div>

              <h3 className="font-display text-xl font-semibold mb-3">
                {t.supportGiftAidTitle}
              </h3>
              
              <div className="font-serif text-sm text-stone-600 dark:text-stone-400 italic leading-relaxed space-y-4 mb-6">
                <p>{t.supportGiftAidDesc}</p>
                
                <p>
                  {lang === 'RO'
                    ? 'Pentru fiecare £10 donați, parohia primește £12.50 direct de la fisc, cu condiția să fii plătitor de Income Tax în Marea Britanie.'
                    : 'For every £10 you donate, the parish will receive £12.50 from HMRC, provided you pay UK Income Tax/Capital Gains Tax.'}
                </p>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl flex items-center space-x-3 text-xs text-emerald-800 dark:text-emerald-300 font-sans">
              <HeartHandshake size={24} className="flex-shrink-0" />
              <span>
                {lang === 'RO' 
                  ? 'Apasă în secțiunea Contact pentru a cere un mandat Gift Aid de la preot.'
                  : 'Submit a message in the Contact form to request a digital Gift Aid declaration form.'}
              </span>
            </div>
          </div>

          {/* Box 3: Wishlist items */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between group hover:border-gold-500/30 transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Package size={20} />
              </div>

              <h3 className="font-display text-xl font-semibold mb-3">
                {t.supportWishlistTitle}
              </h3>
              
              <p className="font-serif text-xs text-stone-500 dark:text-stone-400 italic mb-6 leading-relaxed">
                {t.supportWishlistDesc}
              </p>

              <div className="space-y-3.5">
                {wishListItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 text-xs">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                    <div>
                      <p className="font-sans font-bold text-stone-800 dark:text-stone-200">{item.name}</p>
                      <p className="font-serif text-[10px] text-stone-500 italic mt-0.5">{item.spec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-100 dark:border-stone-900 pt-5 mt-6 text-center text-xs font-serif italic text-gold-600 dark:text-gold-400">
              {lang === 'RO' ? '„Dumnezeu iubește pe cel care dă cu bucurie.”' : '“God loves a cheerful giver.” — 2 Cor 9:7'}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
