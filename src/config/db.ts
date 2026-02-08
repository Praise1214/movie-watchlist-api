import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({
  adapter,
  log:
  process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    :["error"],
})

const connectDB = async () => {
  try{
    await prisma.$connect();
    console.log("DB connected via prisma")
  }
  catch (error) {
    if(error instanceof Error) {
      console.error(`Database connection error: ${error.message}`)
    }else {
      console.error(`Database connection error:`, error)
    }
  }
}

const disconnectDB = async () => {
  await prisma.$disconnect();
}

export {prisma, connectDB, disconnectDB}
