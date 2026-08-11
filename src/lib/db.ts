import { PrismaPg } from "@prisma/adapter-pg";

export function buildPrismaAdapter() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL manquante");

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
