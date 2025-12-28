const https = require('https');

function resetDatabase() {
  console.log('🔄 Calling force-reset endpoint...\n');

  const data = JSON.stringify({
    secret: 'RESET_NOW_PLEASE'
  });

  const options = {
    hostname: 'focusai-production-c963.up.railway.app',
    port: 443,
    path: '/api/admin/force-reset',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
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
          console.log('\n✅ DATABASE SCHEMA RESET SUCCESSFUL!\n');
          console.log('Next steps:');
          console.log('1. Go to Railway dashboard');
          console.log('2. Click focusai service');
          console.log('3. Click "Restart" or "Redeploy"');
          console.log('4. Wait 2-3 minutes');
          console.log('5. Then run: node scripts/seed-production.js\n');
        } else {
          console.error('❌ Reset failed:', json.error);
        }
      } catch (e) {
        console.log('Response:', responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Error:', error.message);
  });

  req.write(data);
  req.end();
}

resetDatabase();
