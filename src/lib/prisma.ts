import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { buildPrismaAdapter } from "@/lib/db";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: buildPrismaAdapter() });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
