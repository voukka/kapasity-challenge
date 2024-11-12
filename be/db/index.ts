import pg from "pg";
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
//   {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// }

export const query = async (q, params) => {
  const start = Date.now();
  const res = await pool.query(q, params);
  const duration = Date.now() - start;
  console.log("executed query", { text: q, duration, rows: res.rowCount });
  return res;
};
