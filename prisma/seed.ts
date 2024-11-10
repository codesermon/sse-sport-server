import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const playersData = [
        {
            name: "Neymar De Silva",
            thumbnail: "/neymar.jpg"
        },
        {
            name: "Cristiano Ronaldo",
            thumbnail: "/ronaldo.jpg"
        },
        {
            name: "Eden Hazard",
            thumbnail: "/hazard.jpg"
        },
        {
            name: "Lionel Messi",
            thumbnail: "/messi.jpg"
        },
        {
            name: "Edson Pele",
            thumbnail: "/pele.jpg"
        },
        {
            name: "Mohamed Salah",
            thumbnail: "/salah.jpg"
        },
        {
            name: "Diego Maradona",
            thumbnail: "/maradona.jpg"
        },
        {
            name: "Kylian Mbappe",
            thumbnail: "/mbappe.jpg"
        },
        {
            name: "Ronaldinho Gaucho",
            thumbnail: "/ronaldinho.jpg"
        }
    ]
  console.log(`Start seeding ...`);
  const count = await prisma.player.count();
  if (count === 0) {
    await prisma.player.createMany({ data: playersData });
    console.log("Seeding complete... Players data seeded successfully");
  }
  else{
    console.log("Seeding complete... Players data already exists");
  }
}

main()
  .catch((error: any) => {
    console.log("Error: Seeding database failed - ", error?.message);
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
