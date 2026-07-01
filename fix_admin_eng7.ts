import fs from 'fs';

let text = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

text = text.replace(
  "'The Saturday evening service entering the Lord\\'s day, opening the Sunday program.'",
  "\"The Saturday evening service entering the Lord's day, opening the Sunday program.\""
);

text = text.replace(
  "'The Saturday evening service entering the Lord's day, opening the Sunday program.'",
  "\"The Saturday evening service entering the Lord's day, opening the Sunday program.\""
);

fs.writeFileSync('src/components/AdminPanel.tsx', text);
