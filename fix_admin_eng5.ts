import fs from 'fs';

let text = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const translations: Record<string, string> = {
  'Sfânta și Dumnezeiasca Liturghie': 'Holy and Divine Liturgy',
  'Anunț Important': 'Important Announcement',
  'Auto-save direct în Firestore': 'Auto-save direct to Firestore',
  '1. Simulare Banner Anunț Altar (Partea de Sus a Site-ului):': '1. Altar Announcement Banner Simulation (Top of Site):',
  'Bannerul de anunțuri este dezactivat în acest moment.': 'The announcement banner is currently disabled.',
  'Anunț Altar (Banner principal)': 'Altar Announcement (Main Banner)',
  'Titlu Anunț (RO)': 'Announcement Title (RO)',
  'Text Anunț / Conținut (RO)': 'Announcement Text / Content (RO)',
  'Slot 1 pe Prima Pagină (Vecernie Saturday)': 'Slot 1 on Main Page (Saturday Vespers)',
  'Sfânta Liturghie (Divine Liturgy)': 'Holy Liturgy (Divine Liturgy)',
  'Golește textul din toate câmpurile acestui slot': 'Clear text from all fields in this slot',
  'Golește Slotul (Wipe)': 'Clear Slot (Wipe)',
  'Ziua / Frecvența (RO)': 'Day / Frequency (RO)',
  'Sfânta Liturghie (Auriu / Gold)': 'Holy Liturgy (Gold)',
  'Ex: Slujba Sfintei Liturghii și Te Deum': 'Ex: Holy Liturgy Service and Te Deum'
};

for (const [ro, en] of Object.entries(translations)) {
  text = text.split(ro).join(en);
}

fs.writeFileSync('src/components/AdminPanel.tsx', text);
