const { readFileSync } = require('fs');
const { join } = require('path');
const { Client } = require('pg');

async function initDb() {
  const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.log('No DATABASE_URI/DATABASE_URL - skipping DB init');
    return;
  }

  console.log('==> Initializing database tables...');
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    const sql = readFileSync(join(__dirname, 'init-db.sql'), 'utf8');
    await client.query(sql);
    console.log('==> Database tables created successfully');
  } catch (error) {
    console.log('==> DB init note:', error.message);
  } finally {
    await client.end();
  }
}

initDb();
