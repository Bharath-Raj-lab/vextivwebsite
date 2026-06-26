const https = require('https');

async function fetchImages(query, count) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${query}&per_page=${count}&page=1`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const urls = parsed.results.map(r => r.urls.raw + '&auto=format&fit=crop&q=80&w=1200');
          resolve(urls);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const categories = ['restaurant', 'technology', 'branding', 'fitness', 'ecommerce', 'real estate', 'hotel', 'event', 'podcast', 'finance', 'gym', 'coffee', 'social media'];
  const allUrls = new Set();
  
  for (const cat of categories) {
    const urls = await fetchImages(cat, 6);
    urls.forEach(u => allUrls.add(u));
  }
  
  console.log(JSON.stringify(Array.from(allUrls)));
}

main();
