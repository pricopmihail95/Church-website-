import fs from 'fs';

let text = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const translations: Record<string, string> = {
  'Parolă incorectă!': 'Incorrect password!',
  'Parolă Acces': 'Access Password',
  'Introdu parola...': 'Enter password...',
  'Ascunde parola': 'Hide password',
  'Arată parola': 'Show password',
  'Introduceți parola de acces pentru a edita programul sau anunțurile.': 'Enter the access password to edit the schedule or announcements.',
  'Autentificare securizată': 'Secure Login',
  'Intră în Panoul de Control': 'Enter Control Panel',
  'Înapoi la Site': 'Back to Site',
  'Panou Control Misiune': 'Mission Control Panel',
  'Editează în timp real anunțul și programul slujbelor': 'Edit announcements and service schedule in real-time',
  'Deconectare': 'Logout',
  'Modificări salvate!': 'Changes saved!',
  'Sigur doriți să anulați toate modificările nesalvate și să reîncărcați datele din Cloud?': 'Are you sure you want to discard unsaved changes and reload data from the Cloud?',
  'Anulează Modificări': 'Discard Changes',
  'Anulează modificările nesalvate': 'Discard unsaved changes',
  'Se salvează în Cloud...': 'Saving to Cloud...',
  'Salvează modificări': 'Save Changes',
  'Anunț Important Banner': 'Important Banner Announcement',
  'Vizibil pe pagina principală (Hero) în limba Română': 'Visible on the main page (Hero) in Romanian',
  'Vizibil pe pagina principală (Hero) în limba Engleză': 'Visible on the main page (Hero) in English',
  'Titlu (RO)': 'Title (RO)',
  'Text Anunț (RO)': 'Announcement Text (RO)',
  'Titlu (EN)': 'Title (EN)',
  'Text Anunț (EN)': 'Announcement Text (EN)',
  'Activ (Afișează banner-ul pe site)': 'Active (Show banner on site)',
  'Programul Slujbelor': 'Service Schedule',
  'Adaugă Slujbă Nouă': 'Add New Service',
  'Resetează programul la cel din fabrică': 'Reset schedule to default',
  'Sigur doriți să resetați programul slujbelor la programul canonic implicit? Modificările nu sunt salvate permanent până când nu apăsați "Salvează modificări" din header.': 'Are you sure you want to reset the service schedule to the default canonical schedule? Changes are not permanently saved until you click "Save Changes" in the header.',
  'Programul slujbelor a fost resetat în memorie! Apăsați pe „Salvează modificări” din partea de sus a ecranului pentru a trimite în Cloud.': 'Service schedule reset in memory! Click "Save Changes" at the top of the screen to push to Cloud.',
  'Salvează Link': 'Save Link',
  'Setări Embleme & Imagini (Cloudinary / Firebase / Imgur)': 'Logo & Image Settings (Cloudinary / Firebase / Imgur)',
  'Logo Parohie (Același logo se aplică pe toată pagina)': 'Parish Logo (Same logo applied site-wide)',
  'Imaginea de fundal (Hero - Pagina Principală)': 'Background Image (Hero - Main Page)',
  'Introduceți link-ul imaginii. Dacă este lăsat gol, se va folosi emblema implicită. Pentru a afișa imagini din Firebase, Firebase Storage are nevoie de reguli publice de citire (allow read: if true;).': 'Enter the image link. If left empty, the default emblem will be used. To display images from Firebase, Firebase Storage needs public read rules (allow read: if true;).',
  'Setări Galerie Foto / Video': 'Photo / Video Gallery Settings',
  'Fotografii Galerie (Upload sau Link)': 'Gallery Photos (Upload or Link)',
  'Adaugă Foto Nouă': 'Add New Photo',
  'URL Imagine': 'Image URL',
  'Șterge Fotografie': 'Delete Photo',
  'Videoclipuri Youtube Galerie': 'Youtube Videos Gallery',
  'Adaugă Video Nou': 'Add New Video',
  'Youtube Embed ID (ex. dQw4w9WgXcQ din v=dQw4w9WgXcQ)': 'Youtube Embed ID (e.g. dQw4w9WgXcQ from v=dQw4w9WgXcQ)',
  'Șterge Video': 'Delete Video',
  'Înapoi la Site-ul Principal': 'Back to Main Site'
};

for (const [ro, en] of Object.entries(translations)) {
  text = text.split(ro).join(en);
}

text = text.replace(/bg-byz-blue-950/g, 'dark:bg-byz-blue-950 bg-stone-50');
text = text.replace(/text-byz-blue-100/g, 'dark:text-byz-blue-100 text-stone-900');
text = text.replace(/text-byz-blue-200/g, 'dark:text-byz-blue-200 text-stone-800');
text = text.replace(/text-byz-blue-300/g, 'dark:text-byz-blue-300 text-stone-600');
text = text.replace(/text-byz-blue-400/g, 'dark:text-byz-blue-400 text-stone-500');
text = text.replace(/bg-byz-blue-900\/40/g, 'dark:bg-byz-blue-900/40 bg-white');
text = text.replace(/bg-byz-blue-900\/95/g, 'dark:bg-byz-blue-900/95 bg-white/95');
text = text.replace(/bg-byz-blue-900/g, 'dark:bg-byz-blue-900 bg-stone-200');
text = text.replace(/bg-byz-blue-850/g, 'dark:bg-byz-blue-850 bg-stone-200');
text = text.replace(/bg-byz-blue-800/g, 'dark:bg-byz-blue-800 bg-stone-300');
text = text.replace(/border-byz-blue-800\/40/g, 'dark:border-byz-blue-800/40 border-stone-200');
text = text.replace(/border-byz-blue-800/g, 'dark:border-byz-blue-800 border-stone-300');
text = text.replace(/border-byz-blue-100\/10/g, 'dark:border-byz-blue-100/10 border-stone-300/50');
text = text.replace(/text-white/g, 'dark:text-white text-stone-950');

fs.writeFileSync('src/components/AdminPanel.tsx', text);
