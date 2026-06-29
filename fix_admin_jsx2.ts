import fs from 'fs';

let admin = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

admin = admin.replace(
  '              </>)}\n              </div>\n            </section>',
  '              </div>\n              </>)}\n            </section>'
);

fs.writeFileSync('src/components/AdminPanel.tsx', admin);
