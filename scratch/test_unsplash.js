const https = require('https');

async function searchUnsplash(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'unsplash.com',
      path: `/napi/search/photos?query=${encodeURIComponent(query)}&per_page=6&page=1`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    };
    
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const urls = json.results.map(r => r.urls.raw + '&auto=format&fit=crop&q=80&w=1200');
          resolve(urls);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

searchUnsplash('restaurant').then(console.log);
