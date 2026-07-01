import fs from 'fs';

let text = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

text = text.replace(/bg-stone-50/g, 'bg-[#fbf7f3]'); // light ivory
text = text.replace(/bg-stone-200/g, 'bg-[#f4ebe1]');
text = text.replace(/bg-stone-300/g, 'bg-[#eaddce]');
text = text.replace(/bg-stone-900/g, 'bg-[#3b2f2f]'); // dark burgundy-ish
text = text.replace(/bg-stone-950/g, 'bg-[#2a2222]');
text = text.replace(/bg-white\/95/g, 'bg-[#fbf7f3]/95');
text = text.replace(/bg-white/g, 'bg-[#fbf7f3]');
text = text.replace(/text-stone-900/g, 'text-[#4a3b3b]');
text = text.replace(/text-stone-950/g, 'text-[#3b2f2f]');
text = text.replace(/text-stone-800/g, 'text-[#5a4a4a]');
text = text.replace(/text-stone-600/g, 'text-[#7d6969]');
text = text.replace(/text-stone-500/g, 'text-[#9c8989]');
text = text.replace(/border-stone-200/g, 'border-[#eaddce]/60');
text = text.replace(/border-stone-300\/40/g, 'border-[#eaddce]/70');
text = text.replace(/border-stone-300\/50/g, 'border-[#eaddce]/70');
text = text.replace(/border-stone-300/g, 'border-[#eaddce]');

// Let's add an interesting pattern overlay to the main container
text = text.replace(/className="min-h-screen dark:bg-byz-blue-950 bg-stone-50/g, 'className="min-h-screen dark:bg-byz-blue-950 bg-[#fdfaf7]');
text = text.replace(/selection:text-gold-200 relative"/g, 'selection:text-gold-200 relative" style={{ backgroundImage: !darkMode ? "url(\\\'https://www.transparenttextures.com/patterns/church.png\\\')" : "none" }}');

fs.writeFileSync('src/components/AdminPanel.tsx', text);
