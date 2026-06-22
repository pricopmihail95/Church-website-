import { Service, SpiritualQuote, TranslationSchema } from './types';

export const TRANSLATIONS: Record<'RO' | 'EN', TranslationSchema> = {
  RO: {
    navHome: 'Acasă',
    navServices: 'Sfinte Slujbe',
    navCandles: 'Pankar Virtual',
    navHistory: 'Tradiție și Istorie',
    navSupport: 'Susținere',
    navContact: 'Contact',
    navGallery: 'Foto & Video',
    heroTagline: 'Parohia Creștin Ortodoxă Sf. Hybald din Scunthorpe',
    heroTitle: 'Comunitatea Creștină Ortodoxă Antiochiană Sfântul Hybald',
    heroSubtitle: 'Suntem o comunitate ortodoxă restrânsă și călduroasă, la început de drum (înființată de 2-3 ani). Slujbele noastre de duminică sunt săvârșite în limba engleză, iar oricine, indiferent de etnie sau naționalitate, este primit cu toată inima în mica noastră familie.',
    heroSchedulesBtn: 'Programul Slujbelor',
    heroContactBtn: 'Localizare și Contact',
    liturgySectionTitle: 'Programul și Rânduiala Slujbelor',
    liturgySectionSubtitle: 'Te așteptăm în fiecare duminică la biserică. Toate naționalitățile sunt binevenite și binecuvântate! Slujbele sunt săvârșite în limba engleză.',
    allDays: 'Toate',
    sundayLabel: 'Duminică',
    saturdayLabel: 'Sâmbătă cu programare',
    weekdayLabel: 'Sfintele Taine',
    candleSectionTitle: 'Altarul Luminilor - Aprinde o Lumânare',
    candleSectionSubtitle: 'În tradiția ortodoxă, lumânarea reprezintă lumina credinței, jertfa curată și rugăciunea noastră care se înalță la Dumnezeu. Pomenește-i pe cei dragi aici.',
    candleFormTitle: 'Trimite un acatist sau rugăciune',
    candleFormDesc: 'Completează numele celor dragi pentru a aprinde o lumânare virtuală. Rugăciunile și acatistele tale vor fi citite în cadrul Sfintelor Slujbe de către preot.',
    candleNameLabel: 'Nume',
    candleNamePlaceholder: 'Ex: Preotul Mihai, Maria, Vasile...',
    candleTypeLabel: 'Pomenire pentru',
    candleTypeHealth: 'Sănătate și Ocrotire (Vii)',
    candleTypeMemorial: 'Pomenirea celor Adormiți (Morți)',
    candleMessageLabel: 'Gând de rugăciune / Cerere specială',
    candleMessagePlaceholder: 'Ex: Ajutor în examene, însănătoșire de boală, mulțumire, pomenire...',
    candleSubmitBtn: 'Aprinde lumânarea și trimite la Altar',
    candleActiveTitle: 'Lumânări aprinse în paraclis',
    candleActiveDesc: 'Lumânările active ale comunității noastre. Alătura-te clipelor de reculegere rugându-te pentru fiecare suflet pomenit.',
    noCandlesLit: 'Nicio lumânare nu este aprinsă acum. Fii tu primul care aduce o jertfă de lumină!',
    historySectionTitle: 'Mărturia Noastră Ortodoxă',
    historySectionSubtitle: 'O mică familie creștină unită în rugăciune, adunată în jurul acelei credințe neschimbate de două mii de ani.',
    historyPatriarchateTitle: 'Patriarhia Apostolică a Antiohiei',
    historyPatriarchateDesc: 'Fondată în anul 34 d.Hr. de către Sfinții Apostoli Petru și Pavel, Biserica Antiohiei este locul în care ucenicii lui Iisus au fost numiți „creștini” pentru prima dată (Fapte 11:26). Ca una dintre cele cinci patriarhii istorice antice (Pentarhia), Antiohia a oferit lumii mari teologi și sfinți, precum Sfântul Ioan Gură de Aur, Sfântul Ignatie Teoforul și Sfântul Ioan Damaschin.',
    historyParishTitle: 'Misiunea Sfântul Hybald din Scunthorpe',
    historyParishDesc: 'Parohia noastră din Scunthorpe s-a născut din dorința de a oferi o casă spirituală credincioșilor ortodocși din nordul Lincolnshire. Sub oblăduirea canonică a Arhiepiscopiei Antiochiane a Insulelor Britanice și Irlandei, adunăm laolaltă credincioși de diverse naționalități, uniți în aceeași credință curată, săvârșind slujbe pline de pace și căldură sufletească în limba engleză.',
    historyHierarchyTitle: 'Ierarhia Noastră Canonică',
    historyHierarchyMetropolitanName: 'Înaltpreasfințitul Mitropolit Silouan (Oner)',
    historyHierarchyMetropolitanDesc: 'Mitropolitul Silouan este episcopul rânduit și Păstorul Cel Bun care conduce oficial Arhiepiscopia Creștină Ortodoxă Antiochiană a Insulelor Britanice și Irlandei, oferind oblăduire canonică și îndrumare duhovnicească parohiei noastre.',
    wisdomTitle: 'Cuvântul Sfinților Părinți',
    wisdomSubtitle: 'Călăuze duhovnicești pentru viața de zi cu zi în lumea modernă.',
    supportTitle: 'Susținerea și Lucrarea Misiunii',
    supportSubtitle: 'May God reward you for your sacrifice of offering. / Dumnezeu să vă răsplătească jertfa pentru prinosul de dragoste adus misiunii noastre.',
    supportBankTransfers: 'Date pentru donații bancare',
    supportBankName: 'St Hybald\'s Antiochian Orthodox Christian Community',
    supportSortCode: 'Sort Code: 30-99-50',
    supportAccount: 'Număr Cont: 30072363',
    supportGiftAidTitle: 'Facilitatea Gift Aid & Charity no. 1208759',
    supportGiftAidDesc: 'Suntem înregistrați oficial ca asociație caritabilă cu numărul de caritate 1208759. Dacă ești plătitor de taxe în Marea Britanie (UK taxpayer), statul adaugă 25% la orice donație pe care o faci, gratuit.',
    supportWishlistTitle: 'Sprijin Material și Liturgic',
    supportWishlistDesc: 'Dacă dorești să aduci prescuri sau ofrande de alimente la duminica binecuvântării, ulei curat de măsline pentru candele ori tămâie naturală, te rugăm să iei legătura direct cu părintele nostru.',
    contactTitle: 'Rămâi în legătură cu noi',
    contactSubtitle: 'Biserica este deschisă tuturor ucenicilor. Dacă vrei să vorbești cu preotul, ai nevoie de Spovedanie, Botez, Cununie sau o sfințire de casă, ne poți apela oricând.',
    contactNameLabel: 'Nume Complet',
    contactEmailLabel: 'Adresă de Email',
    contactMessageLabel: 'Mesaj sau Solicitare duhovnicească',
    contactSendBtn: 'Trimite către Parohie',
    contactSuccessMsg: 'Mesajul tău a fost trimis spre altar! Părintele Mihai te va contacta în cel mai scurt timp.',
    contactInfoTitle: 'Informații de Contact',
    contactAddress: 'Adresă slujire: Methodist Church, Old Brumby United Church, 185 Ashby Rd, Scunthorpe DN16 2AQ',
    contactPhone: 'Telefon Părinte: 07525 019441',
    contactEmail: 'Email: sthybaldorthodoxchurch@gmail.com / cerghitmihai@gmail.com',
    mapSimTitle: 'Harta de orientare Scunthorpe',
    mapSimDesc: 'Ne găsești în fiecare duminică în cladirea Methodist Church / Old Brumby United Church din Ashby Road.',
    byzantineStyle: 'Tezaur Bizantin'
  },
  EN: {
    navHome: 'Home',
    navServices: 'Sacred Services',
    navCandles: 'Virtual Altar',
    navHistory: 'Tradition & History',
    navSupport: 'Support',
    navContact: 'Contact',
    navGallery: 'Photos & Videos',
    heroTagline: 'St Hybald\'s Antiochian Orthodox Christian Community',
    heroTitle: 'Preserving the Apostolic Faith in Scunthorpe',
    heroSubtitle: 'We are a small, warm mission parish community, founded 2-3 years ago. Our Sunday services are held in English, and everyone, regardless of background or nationality, is welcome to pray with us in our humble spiritual family.',
    heroSchedulesBtn: 'Service Schedules',
    heroContactBtn: 'How to Find Us',
    liturgySectionTitle: 'Schedules of Sacred Services',
    liturgySectionSubtitle: 'We invite you to join our communal liturgical Sundays. ALL NATIONALITIES ARE WELCOME. Services are held in the English language.',
    allDays: 'All',
    sundayLabel: 'Sunday',
    saturdayLabel: 'By Appointment',
    weekdayLabel: 'Sacraments & Prayers',
    candleSectionTitle: 'Altar of Lights - Light a Candle',
    candleSectionSubtitle: 'In Orthodox tradition, the candle represents the light of faith, our pure sacrifice, and our prayer rising to God. Direct your prayer for loved ones here.',
    candleFormTitle: 'Submit a Prayer Request',
    candleFormDesc: 'Fill in the names of your loved ones to light a virtual candle. Your prayers and requests will be read during the Divine Services by the priest.',
    candleNameLabel: 'Names',
    candleNamePlaceholder: 'E.g., Priest Mihai, Mary, Basil...',
    candleTypeLabel: 'Commemoration for',
    candleTypeHealth: 'For the Living (Health)',
    candleTypeMemorial: 'For the Departed (Memorial)',
    candleMessageLabel: 'Prayer intention / Special request',
    candleMessagePlaceholder: 'E.g., Healing, guidance in exams, safe travels, thanksgiving...',
    candleSubmitBtn: 'Light Candle & Send to Altar',
    candleActiveTitle: 'Active candles in the chapel',
    candleActiveDesc: 'The active prayers of our parish community. Spend a quiet moment praying for each soul mentioned.',
    noCandlesLit: 'No candles are currently lit. Be the first to light a candle of pure prayer!',
    historySectionTitle: 'Our Orthodox Testimony',
    historySectionSubtitle: 'A small Christian family united in prayer, gathering around the ancient faith unchanged for two thousand years.',
    historyPatriarchateTitle: 'The Apostolic Patriarchate of Antioch',
    historyPatriarchateDesc: 'Founded in 34 AD by the Holy Apostles Peter and Paul, the Church of Antioch is where the disciples of Jesus were first called "Christians" (Acts 11:26). As one of the five ancient historical patriarchates (the Pentarchy), Antioch gave the world legendary theologians and saints, such as Saint John Chrysostom, Saint Ignatius the God-bearer, and Saint John of Damascus.',
    historyParishTitle: 'St Hybald\'s Orthodox Mission',
    historyParishDesc: 'Our community in Scunthorpe was born out of a desire to provide a spiritual home for Orthodox Christians in North Lincolnshire. Under the spiritual care of the Antiochian Orthodox Archdiocese of the British Isles and Ireland, we bring together believers of all nationalities — united in the same pristine faith, holding peaceful and warm services.',
    historyHierarchyTitle: 'Our Canonical Hierarchy',
    historyHierarchyMetropolitanName: 'Metropolitan Archbishop Silouan (Oner)',
    historyHierarchyMetropolitanDesc: 'He is the appointed bishop and Chief Shepherd, officially leading the Antiochian Orthodox Christian Archdiocese of the British Isles and Ireland, providing canonical care and spiritual guidance to our community.',
    wisdomTitle: 'Words of the Church Fathers',
    wisdomSubtitle: 'Spiritual guides for daily life in the modern world.',
    supportTitle: 'Supporting the Mission',
    supportSubtitle: '“May God reward you for your sacrifice of offering.” Support our Orthodox mission to preach, sustain our liturgical needs, and serve the local Scunthorpe community.',
    supportBankTransfers: 'Bank Transfer Details',
    supportBankName: 'St Hybald\'s Antiochian Orthodox Christian Community',
    supportSortCode: 'Sort Code: 30-99-50',
    supportAccount: 'Account No: 30072363',
    supportGiftAidTitle: 'Gift Aid & Registered Charity no. 1208759',
    supportGiftAidDesc: 'We are officially registered as Charity No. 1208759. If you are a UK taxpayer, the government adds 25p to every £1 you donate at no extra cost to you. Please ask for a digital Gift Aid declaration form.',
    supportWishlistTitle: 'Material & Liturgical Offerings',
    supportWishlistDesc: 'All are welcome to bring food to be Blessed and shared during our Sunday refreshments. If you wish to donate premium oil, incense, or liturgical items, contact Father Mihai directly.',
    contactTitle: 'Get in Touch',
    contactSubtitle: 'Should you wish to speak to Father Mihai, require Confession, Baptism, Weddings, or house blessings, please reach out to us at any time.',
    contactNameLabel: 'Full Name',
    contactEmailLabel: 'Email Address',
    contactMessageLabel: 'Message / Spiritual request',
    contactSendBtn: 'Send to Parish',
    contactSuccessMsg: 'Your message has been sent successfully! Father Mihai will contact you as soon as possible.',
    contactInfoTitle: 'Mission Site & Contact info',
    contactAddress: 'Address: Methodist Church, Old Brumby United Church, 185 Ashby Rd, Scunthorpe DN16 2AQ',
    contactPhone: 'Priest Phone: 07525 019441',
    contactEmail: 'Email: sthybaldorthodoxchurch@gmail.com / cerghitmihai@gmail.com',
    mapSimTitle: 'Scunthorpe Location Guide',
    mapSimDesc: 'You will find us at the Methodist Church building on Old Brumby United Church every Sunday.',
    byzantineStyle: 'Byzantine Heritage'
  }
};

export const SERVICES_SCHEDULING: Service[] = [
  {
    id: 'matins',
    name: { RO: 'Utrenia (Slujba de Dimineață)', EN: 'Matins (Morning Service)' },
    time: '09:00',
    day: { RO: 'În fiecare Duminică', EN: 'Every Sunday' },
    description: {
      RO: 'Pregătirea duhovnicească a inimilor prin laude de dimineață înaintea Sfintei Liturghii.',
      EN: 'The beautiful morning service of praise and preparation preceding the Holy Liturgy.'
    },
    type: 'liturgy'
  },
  {
    id: 'liturgy',
    name: { RO: 'Sfânta și Dumnezeiasca Liturghie', EN: 'The Holy Liturgy' },
    time: '10:00',
    day: { RO: 'În fiecare Duminică', EN: 'Every Sunday' },
    description: {
      RO: 'Sfânta Jertfă Euharistică, inima comunității noastre. Săvârșită în limba engleză.',
      EN: 'Our central Eucharistic worship. English language service - all are welcome to pray with us.'
    },
    type: 'liturgy'
  },
  {
    id: 'refreshments',
    name: { RO: 'Agapa Frățească (Gustare / Socializare)', EN: 'Refreshments for All' },
    time: '12:00',
    day: { RO: 'În fiecare Duminică', EN: 'Every Sunday' },
    description: {
      RO: 'Fiecare este binevenit să aducă alimente pentru a fi binecuvântate și împărtășite împreună la agapă.',
      EN: 'We gather after Liturgy. All are welcome to bring food to be Blessed and shared!'
    },
    type: 'special'
  },
  {
    id: 'confessive',
    name: { RO: 'Taina Spovedaniei (Mărturisirea)', EN: 'Confessions on Appointment' },
    time: { RO: 'La cerere / Progr.', EN: 'Upon Request / By Appt.' },
    day: { RO: 'După înțelegere', EN: 'By Appointment' },
    description: {
      RO: 'Spovadania aduce vindecarea sufletului. Vă rugăm să faceți o programare cu preotul.',
      EN: 'Laying down spiritual burdens. Available on appointment by contacting Father Mihai.'
    },
    type: 'sacrament'
  },
  {
    id: 'sacramental',
    name: { RO: 'Botezuri și Cununii (Nuntă)', EN: 'Baptism & Weddings' },
    time: { RO: 'Stabilire comună', EN: 'By Appointment' },
    day: { RO: 'Duminicile', EN: 'Sundays' },
    description: {
      RO: 'Vă rugăm să asistați la Sfânta Liturghie de duminică și vom discuta detaliile la final.',
      EN: 'Please attend the Holy Liturgy and we will gladly speak in person afterwards.'
    },
    type: 'sacrament'
  },
  {
    id: 'parastase',
    name: { RO: 'Panihida - Parastase (Pomenirea Celor Adormiți)', EN: 'Panikhida / Memorial (Remembrance)' },
    time: { RO: 'La cerere', EN: 'Upon Request' },
    day: { RO: 'Sâmbăta / Duminica', EN: 'On Request' },
    description: {
      RO: 'Pomenirea celor dragi ai noștri mutați la Domnul întru nădejdea Învierii la cerere.',
      EN: 'Remembrance of our beloved departed family members, administered on request.'
    },
    type: 'special'
  }
];

export const SPIRITUAL_QUOTES: SpiritualQuote[] = [
  {
    text: {
      RO: 'Dacă nu ai pace în inima ta, oricâte lucruri bune ai face, totul va fi în zadar. Începe prin a-ți liniști cugetul în fața lui Hristos.',
      EN: 'If you do not have peace in your heart, no matter how many good things you do, all will be in vain. Begin by calming your mind before Christ.'
    },
    author: {
      RO: 'Sfântul Ioan Gură de Aur',
      EN: 'Saint John Chrysostom'
    },
    period: 'Sec. IV'
  },
  {
    text: {
      RO: 'Rugăciunea este respirația sufletului. Așa cum trupul moare fără oxigen, la fel și sufletul se vestejește fără pomenirea numelui lui Dumnezeu.',
      EN: 'Prayer is the breath of the soul. Just as the body dies without oxygen, so the soul withers away without remembering the name of God.'
    },
    author: {
      RO: 'Sfântul Dorotei din Gaza',
      EN: 'Saint Dorotheus of Gaza'
    },
    period: 'Sec. VI'
  },
  {
    text: {
      RO: 'Nu cere ca lucrurile să se întâmple așa cum le dorești tu, ci dorește ca ele să se întâmple așa cum dorește Dumnezeu. Astfel vei avea mereu pace.',
      EN: 'Do not demand that things happen as you wish, but wish them to happen as God wills. This way you will always find peace.'
    },
    author: {
      RO: 'Sfântul Antonie cel Mare',
      EN: 'Saint Anthony the Great'
    },
    period: 'Sec. IV'
  },
  {
    text: {
      RO: 'Nu există păcat pe care mila lui Dumnezeu să nu-l poată șterge. Tot ce se cere este un suflet zdrobit și o întoarcere sinceră acasă.',
      EN: 'There is no sin that the mercy of God cannot wash away. All that is required is a contrite heart and a sincere return home.'
    },
    author: {
      RO: 'Sfântul Efrem Sirul',
      EN: 'Saint Ephrem the Syrian'
    },
    period: 'Sec. IV'
  },
  {
    text: {
      RO: 'Iubește pe toată lumea fără excepție, din toată inima ta, dar nu-ți pune nădejdea în niciun om, ci doar în Dumnezeu.',
      EN: 'Love everyone without exception with all your heart, but put your hope in no man - put your ultimate trust in God alone.'
    },
    author: {
      RO: 'Sfântul Siluan Athonitul',
      EN: 'Saint Silouan the Athonite'
    },
    period: 'Sec. XX'
  }
];
