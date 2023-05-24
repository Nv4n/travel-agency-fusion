import { PrismaClient } from "@prisma/client";
import { t3Env } from "../t3Env.js";

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log:
			t3Env.NODE_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	});

if (t3Env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
