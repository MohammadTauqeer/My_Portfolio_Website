const fs = require('fs');
const https = require('https');

try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const match = envContent.match(/GOOGLE_API_KEY=(.*)/);
  if (!match) {
    console.error('GOOGLE_API_KEY not found in .env.local');
    process.exit(1);
  }
  const apiKey = match[1].trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const response = JSON.parse(data);
      if (response.models) {
        // Filter for generative models and print the first one
        const genModels = response.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
        if (genModels.length > 0) {
          genModels.forEach(m => console.log(m.name.replace('models/', '')));
        } else {
          console.log('No generative models found');
        }
      } else {
        console.error('Failed to fetch models:', response);
      }
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
} catch (err) {
  console.error('Error reading .env.local:', err.message);
}
