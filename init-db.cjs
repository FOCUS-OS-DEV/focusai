const { readFileSync } = require('fs');
const { join } = require('path');
const { Client } = require('pg');

async function initDb() {
  const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

  if (!connectionString) {
    console.log('==> No DATABASE_URI/DATABASE_URL - skipping DB init');
    return;
  }

  console.log('==> DATABASE_URI found, initializing database tables...');
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    console.log('==> Connecting to database...');
    await client.connect();
    console.log('==> Connected! Reading SQL file...');

    const sql = readFileSync(join(__dirname, 'init-db.sql'), 'utf8');
    console.log('==> Executing SQL...');
    await client.query(sql);
    console.log('==> Database tables created/updated successfully!');
  } catch (error) {
    console.error('==> DB init ERROR:', error.message);
    console.error('==> Full error:', error);
  } finally {
    await client.end();
    console.log('==> Database connection closed');
  }
}

// Wait for the async function to complete
initDb().then(() => {
  console.log('==> DB init script completed');
}).catch((err) => {
  console.error('==> DB init script failed:', err);
  process.exit(1);
});
