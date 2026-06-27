const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.match(/\.(tsx|ts|js|jsx|md|json|sql|html)$/)) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('.');
let changed = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Replace "vextiv" (case-insensitive) with just the "vextiv" part (preserving its original casing)
  const newContent = content.replace(/vextiv/gi, match => match.substring(0, 6));
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changed++;
    console.log('Updated', file);
  }
});
console.log('Total files changed:', changed);
