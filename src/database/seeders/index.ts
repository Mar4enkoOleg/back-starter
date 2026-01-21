import { PrismaClient } from "@prisma/client";
import { seedDatabase } from "./seed-database";

let prisma: PrismaClient;

const main = async () => {
  prisma = new PrismaClient();

  await prisma.$connect();

  await seedDatabase(prisma);
};

main()
  .catch((e) => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    if (prisma) await prisma.$disconnect();
  });
