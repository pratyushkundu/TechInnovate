import { Pool } from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from "@shared/schema";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

// Postgres pool with SSL (required by Render)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});


async function printContacts() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM contacts');
    console.log('Contacts:', res.rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
  } finally {
    client.release();
  }

}

async function printContacts1() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM developers');
    console.log('Developers:', res.rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
  } finally {
    client.release();
  }
}

printContacts();
printContacts1();
export const db = drizzle(pool, { schema });








