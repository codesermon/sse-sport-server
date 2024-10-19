import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// Check if we are running in production mode
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
}else{
  const globalPrisma = global as typeof global & { prisma?: PrismaClient  }

  prisma = globalPrisma.prisma || new PrismaClient();

  if(!globalPrisma.prisma) globalPrisma.prisma = prisma;
}

export default prisma;