import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {pool} from "./db";
import meetingsRoutes from "./routes/meetingsRoutes";
import groupRoutes from "./routes/groupRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/meetings", meetingsRoutes);
app.use("/api/groups", groupRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

try {
    await pool.query('SELECT 1 FROM groups LIMIT 1');
    console.log('החיבור למסד הנתונים תקין');
  } catch (error) {
    console.log('');
    console.log('!!! בעיה במסד הנתונים !!!');
    console.log('1. בדקו את DATABASE_URL בקובץ .env  (Neon -> Connection Details)');
    console.log('2. ודאו שהרצתם ב-Neon את Database/schema.sql ואחריו Database/seed.sql');
    console.log('');
    console.log(error);
  }
});