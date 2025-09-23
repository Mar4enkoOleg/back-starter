import { PrismaClient } from '@prisma/client';

export const getPrisma = (() => {
  let prisma: PrismaClient;

  afterAll(async () => {
    if (prisma) await prisma.$disconnect();
  });

  return () => {
    if (prisma) return prisma;

    prisma = new PrismaClient();

    return prisma;
  };
})();
