import fs from 'fs';

let text = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const translations: Record<string, string> = {
  'Programul Sfintelor Slujbe': 'Holy Services Schedule',
  'Administrează în timp real slots, zile și ore pentru enoriași': 'Manage slots, days and times in real-time for parishioners',
  'Resetează la Implicite': 'Reset to Defaults',
  'Adaugă Slujbă': 'Add Service',
  'Sinergie Pagina Principală & Modul Sâmbătă': 'Main Page Synergy & Saturday Mode',
  'Pe pagina principală a site-ului, cele 4 sloturi de slujbe de bază (Vecernie, Utrenie, Sfânta Liturghie și Agapă/Tratații) sunt conectate în mod dinamic în funcție de prezența lor în listă.': 'On the main page, the 4 basic service slots (Vespers, Matins, Holy Liturgy and Agape/Refreshments) are dynamically connected based on their presence in the list.',
  'Orice slujbă pe care o marcați ca fiind invizibilă (folosind butonul Ochi) NU va apărea în modulul de pe prima pagină, permițându-vă să gestionați temporar o sâmbătă sau o duminică specifică fără a le șterge.': 'Any service marked as hidden (using the Eye button) will NOT appear in the front page module, allowing you to temporarily manage a specific Saturday or Sunday without deleting them.',
  'Dacă doriți să ascundeți total Sâmbăta (dacă nu aveți vecernie într-un weekend de exemplu), este suficient să debifați vizibilitatea la Vecernie, și secțiunea "Sâmbătă" va dispărea automat din prima pagină!': 'If you want to completely hide Saturday (if there is no Vespers on a weekend for example), just uncheck visibility on Vespers, and the "Saturday" section will automatically disappear from the front page!',
  'Pentru a fi detectate corect de pagina principală, sistemul caută după aceste cuvinte exacte în titlu: "Vecernie", "Utrenie", "Liturghie", "Agapă". Orice altceva adăugați va apărea sub "Alte Slujbe".': 'To be correctly detected by the main page, the system searches for these exact words in the title: "Vecernie", "Utrenie", "Liturghie", "Agapă". Anything else added will appear under "Other Services".',
  'Slujbă ascunsă': 'Hidden Service',
  'Ziua Slujbei': 'Service Day',
  'Nume Slujbă': 'Service Name',
  'Detalii Adiționale (Opțional)': 'Additional Details (Optional)',
  'Ora': 'Time',
  'Șterge': 'Delete',
  'Arată slujba': 'Show service',
  'Ascunde slujba': 'Hide service',
  'Nu există slujbe configurate. Adăugați una nouă.': 'No services configured. Add a new one.'
};

for (const [ro, en] of Object.entries(translations)) {
  text = text.split(ro).join(en);
}

fs.writeFileSync('src/components/AdminPanel.tsx', text);
