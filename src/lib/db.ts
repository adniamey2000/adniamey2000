import { PrismaPg } from "@prisma/adapter-pg";

export function resolveDatabaseUrl(): string {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.adniamey2000_db_DATABASE_URL,
    process.env.adniamey2000_db_POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL,
    process.env.adniamey2000_db_DATABASE_URL_UNPOOLED,
    process.env.adniamey2000_db_POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL_NON_POOLING,
  ];
  const url = candidates.find((c) => c && c.length > 0);
  if (!url) throw new Error("DATABASE_URL manquante");
  return url;
}

export function buildPrismaAdapter() {
  const url = resolveDatabaseUrl();

  const hostIp = process.env.DATABASE_HOST_IP;
  if (!hostIp) return new PrismaPg({ connectionString: url });

  const parsed = new URL(url);
  const search = new URLSearchParams(parsed.search);
  const sslMode = search.get("sslmode");
  return new PrismaPg({
    host: hostIp,
    port: parsed.port ? Number(parsed.port) : 5432,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: decodeURIComponent(parsed.pathname.replace(/^\//, "")),
    ssl:
      sslMode && sslMode !== "disable"
        ? { servername: parsed.hostname, rejectUnauthorized: false }
        : undefined,
  });
}
