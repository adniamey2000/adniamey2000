import "dotenv/config";
import { defineConfig } from "prisma/config";

function resolveDatabaseUrl(): string {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.adniamey2000_PRISMA_DATABASE_URL,
    process.env.adniamey2000_db_DATABASE_URL,
    process.env.adniamey2000_db_POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL,
    process.env.adniamey2000_db_DATABASE_URL_UNPOOLED,
    process.env.adniamey2000_db_POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL_NON_POOLING,
  ];
  const url = candidates.find((c) => c && c.length > 0);
  if (!url) return "postgresql://localhost:5432/dummy?sslmode=require";
  return url;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: resolveDatabaseUrl(),
  },
});
