import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// console.log(process.env.DATABASE_URL);
const sql = neon(
  "postgresql://neondb_owner:npg_KjN8xhtVoz1y@ep-floral-queen-a1o0b22d-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
);
export const db = drizzle({ client: sql });
