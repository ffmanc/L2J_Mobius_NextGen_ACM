import { PrismaClient } from "@prisma/client";

/**
 * Global Prisma Client declaration to avoid creating multiple instances
 * during Next.js Hot Module Replacement (HMR) in development.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Singleton instance of PrismaClient.
 * This ensures we efficiently manage database connections to the Lineage 2 server database.
 */
export const db = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}
