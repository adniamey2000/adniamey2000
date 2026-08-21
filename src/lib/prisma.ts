import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

export function resolveDatabaseUrl(): string {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.adniamey2000_PRISMA_DATABASE_URL,
    process.env.adniamey2000_db_DATABASE_URL,
    process.env.adniamey2000_db_POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL,
  ];
  const url = candidates.find((c) => c && c.length > 0);
  if (!url) throw new Error("DATABASE_URL manquante");
  return url;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaAdapter: PrismaPg | undefined;
};

if (!globalForPrisma.prismaAdapter) {
  globalForPrisma.prismaAdapter = new PrismaPg({
    connectionString: resolveDatabaseUrl(),
  });
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: globalForPrisma.prismaAdapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
