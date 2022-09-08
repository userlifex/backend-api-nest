import { prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
// or, if using CommonJS
// const { faker } = require('@faker-js/faker');

//const randomName = faker.name.fullName(); // Rowan Nikolaus
//const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

async function seed() {
  console.log('...');
  const prisma = new PrismaClient();

  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: Array.from({ length: 40 }).map(() => ({
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: +faker.commerce.price(),
      stock: parseInt('' + Math.random() * 100),
      imgUrl: `https://picsum.photos/id/${parseInt(
        '' + Math.random() * 2000,
      ).toFixed(0)}/500/500`,
    })),
  });

  console.log('Seeded');
}

seed();
