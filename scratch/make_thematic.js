const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/case-studies.ts');
let content = fs.readFileSync(filePath, 'utf8');

const keywordMap = {
  'hyderabad-bistro-qr': 'restaurant,food',
  'tech-startup-web': 'startup,technology',
  'local-retail-branding': 'boutique,fashion',
  'fitness-app-social': 'fitness,workout',
  'ecommerce-redesign': 'ecommerce,shopping',
  'real-estate-platform': 'mansion,realestate',
  'boutique-hotel-branding': 'hotel,resort',
  'event-ticketing-qr': 'concert,event',
  'tech-podcast-social': 'podcast,microphone',
  'fintech-dashboard-ui': 'finance,dashboard',
  'smart-gym-access': 'gym,fitness',
  'coffee-roasters-branding': 'coffee,cafe',
  'restaurant-chain-social': 'restaurant,dining'
};

const regex = /slug:\s*'([^']+)',([\s\S]*?)gallery:\s*\[([\s\S]*?)\]/g;

let idCounter = 1;

const updatedContent = content.replace(regex, (match, slug, middle) => {
  const keyword = keywordMap[slug] || 'business';
  
  const newGallery = `[
      'https://loremflickr.com/1200/800/${keyword}?lock=${idCounter++}',
      'https://loremflickr.com/1200/800/${keyword}?lock=${idCounter++}',
      'https://loremflickr.com/1200/800/${keyword}?lock=${idCounter++}',
      'https://loremflickr.com/1200/800/${keyword}?lock=${idCounter++}',
      'https://loremflickr.com/1200/800/${keyword}?lock=${idCounter++}',
      'https://loremflickr.com/1200/800/${keyword}?lock=${idCounter++}',
    ]`;
    
  return `slug: '${slug}',${middle}gallery: ${newGallery}`;
});

fs.writeFileSync(filePath, updatedContent);
console.log('Successfully updated all galleries to use thematic loremflickr images.');
