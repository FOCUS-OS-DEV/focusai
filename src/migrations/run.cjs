const { readFileSync } = require('fs');
const { join } = require('path');
const { Client } = require('pg');

async function runMigrations() {
  const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('ERROR: DATABASE_URI or DATABASE_URL not set');
    process.exit(1);
  }

  console.log('==> Connecting to database...');
  
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('==> Connected successfully');

    const migrationPath = join(__dirname, '001_initial.sql');
    const sql = readFileSync(migrationPath, 'utf8');
    
    console.log('==> Running migrations...');
    await client.query(sql);
    
    console.log('==> Migrations completed successfully');
  } catch (error) {
    console.error('Migration error:', error.message);
  } finally {
    await client.end();
  }
}

runMigrations();
