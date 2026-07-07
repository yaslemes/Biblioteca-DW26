import { Pool } from "pg";
import env from "../config/env.js";

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;