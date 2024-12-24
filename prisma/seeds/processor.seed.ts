import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const processor = await prisma.processor.upsert({
    where: { name: 'PAGSEGURO' },
    update: {},
    create: {
      name: 'PAGSEGURO',
      enabled: true,
    },
  });

  console.log('Seeded Processor:', processor);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
