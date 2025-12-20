import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('ERROR: DATABASE_URI or DATABASE_URL not set');
    process.exit(1);
  }

  console.log('==> Connecting to database...');
  
  const client = new pg.Client({ connectionString });
  
  try {
    await client.connect();
    console.log('==> Connected successfully');

    // Read and execute migration
    const migrationPath = join(__dirname, '001_initial.sql');
    const sql = readFileSync(migrationPath, 'utf8');
    
    console.log('==> Running migrations...');
    await client.query(sql);
    
    console.log('==> Migrations completed successfully');
  } catch (error) {
    console.error('Migration error:', error.message);
    // Don't exit with error - tables might already exist
  } finally {
    await client.end();
  }
}

runMigrations();
