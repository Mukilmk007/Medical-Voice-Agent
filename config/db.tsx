// import { drizzle } from 'drizzle-orm/neon-http';
// const db = drizzle(process.env.DATABASE_URL!);

// If you need a synchronous connection
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
