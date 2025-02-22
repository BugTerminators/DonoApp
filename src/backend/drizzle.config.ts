import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_KjN8xhtVoz1y@ep-floral-queen-a1o0b22d-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
});
