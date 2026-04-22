import fs from 'fs';
import path from 'path';

const searchPatterns = [
  { search: /\/product\//g, replace: '/systems/' },
  { search: /\/shop/g, replace: '/collection' },
  { search: /\/account\/dashboard/g, replace: '/account' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        processDirectory(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.mjs')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const pattern of searchPatterns) {
        if (pattern.search.test(content)) {
          content = content.replace(pattern.search, pattern.replace);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory('./app');
processDirectory('./components');
processDirectory('./lib');
processDirectory('./scripts');
