import fs from 'fs';

let admin = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// The issue is this part:
// 916:                 </div>
// 917: 
// 918:                 {isServicesOpen && (<>
// 919:                 <div className="flex items-center space-x-2">
// ...
// 946:                 </div>
// 947:               </div>

// Let's remove the `{isServicesOpen && (<>` from line 918, and instead place it after the `</div>` on line 947.

admin = admin.replace(
  '{isServicesOpen && (<>\n                <div className="flex items-center space-x-2">',
  '<div className="flex items-center space-x-2">'
);

admin = admin.replace(
  '                  </button>\n                </div>\n              </div>\n\n              {/* Informative Help Box */}',
  '                  </button>\n                </div>\n              </div>\n\n              {isServicesOpen && (<>\n              {/* Informative Help Box */}'
);

fs.writeFileSync('src/components/AdminPanel.tsx', admin);
