const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/case-studies.ts');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /slug:\s*'([^']+)',([\s\S]*?)gallery:\s*\[([\s\S]*?)\]/g;

const updatedContent = content.replace(regex, (match, slug, middle, oldGallery) => {
  const newGallery = `[
      'https://picsum.photos/seed/${slug}-1/1200/800',
      'https://picsum.photos/seed/${slug}-2/1200/800',
      'https://picsum.photos/seed/${slug}-3/1200/800',
      'https://picsum.photos/seed/${slug}-4/1200/800',
      'https://picsum.photos/seed/${slug}-5/1200/800',
      'https://picsum.photos/seed/${slug}-6/1200/800',
    ]`;
    
  return `slug: '${slug}',${middle}gallery: ${newGallery}`;
});

fs.writeFileSync(filePath, updatedContent);
console.log('Successfully updated all galleries to use unique picsum seeds.');
