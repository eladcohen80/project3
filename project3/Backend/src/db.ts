import { Pool, types } from 'pg';
import dotenv from 'dotenv';

// טוען את המשתנים מקובץ .env
dotenv.config();

// מחזיר תאריכים כמחרוזת פשוטה, בלי המרות של אזור זמן
types.setTypeParser(1114, (value) => value);

// החיבור למסד הנתונים ב-Neon
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  // אם אין חיבור - נכשל אחרי 10 שניות במקום להיתקע לנצח
  connectionTimeoutMillis: 10000,
});