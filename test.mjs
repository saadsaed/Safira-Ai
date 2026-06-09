import fetch from 'node-fetch';

const url = 'https://openrouter.ai/api/v1/chat/completions';
const key = 'sk-or-v1-001001001'; // Fake format

fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'this-model-does-not-exist',
    messages: [{ role: 'user', content: 'hello' }]
  })
}).then(async r => {
  console.log("Status:", r.status);
  console.log("Response:", await r.text());
}).catch(console.error);
