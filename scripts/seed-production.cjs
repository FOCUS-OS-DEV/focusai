const https = require('https');

function seedProduction() {
  console.log('🌱 Calling seed endpoint...\n');

  const options = {
    hostname: 'focusai-production-c963.up.railway.app',
    port: 443,
    path: '/api/seed?force=true',
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    let responseData = '';

    console.log(`Status: ${res.statusCode}\n`);

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      try {
        const json = JSON.parse(responseData);
        console.log('✅ Response:', JSON.stringify(json, null, 2));

        if (json.success) {
          console.log('\n✅ DATABASE SEEDED SUCCESSFULLY!\n');
          console.log('Created:');
          console.log(JSON.stringify(json.created, null, 2));
          console.log('\nYou can now:');
          console.log('- Visit: https://focusai-production-c963.up.railway.app');
          console.log('- Login: https://focusai-production-c963.up.railway.app/admin');
          console.log('- Register: https://focusai-production-c963.up.railway.app/register\n');
        } else {
          console.error('❌ Seed failed:', json.error);
        }
      } catch (e) {
        console.log('Response:', responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Error:', error.message);
  });

  req.end();
}

seedProduction();
