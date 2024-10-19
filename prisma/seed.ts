import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker"; // Optionally use faker for random data

const prisma = new PrismaClient();

async function main() {
  const countUsers = await prisma.user.count();
  if (countUsers > 0) {
    return console.log(`${countUsers} Users already exists`);
  }
  const users: any[] = [];

  for (let i = 0; i < 10; i++) {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const avatar = faker.image.avatar();

    // Create user with quiz points set to 0 by default
    const user = await prisma.user.create({
      data: {
        username,
        password,
        avatar,
        quiz: {
          create: {
            points: 0, // Default quiz points
            rounds: 0, // Default rounds
          },
        },
      },
    });

    users.push(user);
  }

  console.log(`Created ${users.length} users`);
}

main()
  .catch((error: any) => {
    console.error(error?.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
