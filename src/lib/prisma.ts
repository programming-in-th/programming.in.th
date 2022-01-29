import { PrismaClient } from "@prisma/client";

const prisma = (global as any).prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") (global as any).prisma = prisma;

export default prisma;
