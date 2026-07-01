const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// The main wrapper text should be text-stone-900
content = content.replace(/className="min-h-screen dark:bg-byz-blue-950 bg-\[#DFD5C4\] dark:text-byz-blue-100 text-stone-100/g, 'className="min-h-screen dark:bg-byz-blue-950 bg-[#DFD5C4] dark:text-byz-blue-100 text-stone-900');

fs.writeFileSync('src/components/AdminPanel.tsx', content);
