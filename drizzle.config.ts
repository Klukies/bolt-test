import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST ?? '127.0.0.1',
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
  },
  schema: './app/modules/drizzle/**/schema.ts',
  out: './app/modules/drizzle/migrations',
});
