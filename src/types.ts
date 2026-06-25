export type Language = 'RO' | 'EN';

export interface Service {
  id: string;
  name: { RO: string; EN: string };
  time: string | { RO: string; EN: string };
  day: { RO: string; EN: string };
  description: { RO: string; EN: string };
  type: 'liturgy' | 'vespers' | 'sacrament' | 'special';
  hidden?: boolean;
}

export interface SpiritualQuote {
  text: { RO: string; EN: string };
  author: { RO: string; EN: string };
  period: string;
}

export interface VirtualCandle {
  id: string;
  name: string;
  prayerType: 'health' | 'memorial'; // Vii (Sănătate) sau Adormiți (Pomenire)
  message: string;
  timestamp: string;
  isLit: boolean;
  glowColor: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string;
  createdAt: number;
}

export interface GalleryVideo {
  id: string;
  url: string;
  title: string;
  createdAt: number;
}

export interface TranslationSchema {
  navHome: string;
  navServices: string;
  navCandles: string;
  navHistory: string;
  navSupport: string;
  navContact: string;
  navGallery: string; // added
  heroSubtitle: string;
  heroTitle: string;
  heroTagline: string;
  heroSchedulesBtn: string;
  heroContactBtn: string;
  liturgySectionTitle: string;
  liturgySectionSubtitle: string;
  allDays: string;
  sundayLabel: string;
  saturdayLabel: string;
  weekdayLabel: string;
  candleSectionTitle: string;
  candleSectionSubtitle: string;
  candleFormTitle: string;
  candleFormDesc: string;
  candleNameLabel: string;
  candleNamePlaceholder: string;
  candleTypeLabel: string;
  candleTypeHealth: string;
  candleTypeMemorial: string;
  candleMessageLabel: string;
  candleMessagePlaceholder: string;
  candleSubmitBtn: string;
  candleActiveTitle: string;
  candleActiveDesc: string;
  noCandlesLit: string;
  historySectionTitle: string;
  historySectionSubtitle: string;
  historyPatriarchateTitle: string;
  historyPatriarchateDesc: string;
  historyParishTitle: string;
  historyParishDesc: string;
  historyHierarchyTitle: string;
  historyHierarchyMetropolitanName: string;
  historyHierarchyMetropolitanDesc: string;
  wisdomTitle: string;
  wisdomSubtitle: string;
  supportTitle: string;
  supportSubtitle: string;
  supportBankTransfers: string;
  supportBankName: string;
  supportSortCode: string;
  supportAccount: string;
  supportGiftAidTitle: string;
  supportGiftAidDesc: string;
  supportWishlistTitle: string;
  supportWishlistDesc: string;
  contactTitle: string;
  contactSubtitle: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactMessageLabel: string;
  contactSendBtn: string;
  contactSuccessMsg: string;
  contactInfoTitle: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  mapSimTitle: string;
  mapSimDesc: string;
  byzantineStyle: string;
}
