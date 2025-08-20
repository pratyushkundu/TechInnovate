import { pool } from "./db";

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to DB:", res.rows[0]);
    await pool.end();
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();
