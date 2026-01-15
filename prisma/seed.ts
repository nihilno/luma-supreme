import { prisma } from "@/lib/prisma";
import sampleData from "../public/db/sample-data";

async function main() {
  // 1. Clear existing data
  await prisma.product.deleteMany();

  // 2. Insert fresh data
  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
