import fs from 'fs';

let text = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const translations: Record<string, string> = {
  'Nicio slujbă în listă. Faceți clic pe „Adaugă slujbă” mai sus.': 'No services in the list. Click "Add Service" above.',
  'Administrează logo-urile aplicației': 'Manage application logos',
  'Editează setările legate de program și anunțuri': 'Edit settings related to schedule and announcements',
  'Panou Control Misiune': 'Mission Control Panel',
  'Sigur doriți să resetați programul slujbelor la programul canonic implicit?': 'Are you sure you want to reset the schedule to the default canonical program?',
  'Modificările nu sunt salvate permanent până când nu apăsați "Salvează modificări" din header.': 'Changes are not saved until you click "Save Changes" in the header.'
};

for (const [ro, en] of Object.entries(translations)) {
  text = text.split(ro).join(en);
}

fs.writeFileSync('src/components/AdminPanel.tsx', text);
