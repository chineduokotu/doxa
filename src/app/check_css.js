const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  try {
    console.log('Fetching checkout page HTML...');
    const htmlRes = await get('http://localhost:3000/checkout');
    const html = htmlRes.body;
    
    // Find stylesheet hrefs
    const cssRegex = /href="([^"]+\.css)"/g;
    let match;
    const stylesheets = [];
    while ((match = cssRegex.exec(html)) !== null) {
      stylesheets.push(match[1]);
    }
    
    console.log('Found stylesheets:', stylesheets);
    
    if (stylesheets.length === 0) {
      console.log('No stylesheets found in HTML page!');
      return;
    }
    
    for (const sheetPath of stylesheets) {
      const sheetUrl = sheetPath.startsWith('http') ? sheetPath : `http://localhost:3000${sheetPath}`;
      console.log(`Fetching CSS from ${sheetUrl}...`);
      const cssRes = await get(sheetUrl);
      const css = cssRes.body;
      
      console.log(`Stylesheet ${sheetPath}:`);
      console.log(`  Size: ${css.length} bytes`);
      
      const checkClasses = [
        'border-stone-200',
        'px-4',
        'py-3',
        'text-sm',
        'focus:ring-1',
        'bg-[#FAF8F5]/30',
        'hover:border-stone-300'
      ];
      for (const cls of checkClasses) {
        const found = css.includes(cls);
        console.log(`  Contains "${cls}"? ${found}`);
      }
    }
  } catch (err) {
    console.error('Error checking CSS:', err);
  }
}

run();
