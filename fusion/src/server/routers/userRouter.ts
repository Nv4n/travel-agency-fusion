import { schemaRegisterUser } from "@/model/formSchemas/SchemaUserAuthenticate";
import { t3Env } from "@/t3Env";
import { type User } from "@prisma/client";
import express, { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import bcrypt from "bcrypt";

function generateAccessToken(user: User) {
	return jwt.sign({ userId: user.id }, t3Env.JWT_SECRET, {
		expiresIn: "5m",
	});
}

function generateRefreshToken(user: User, jti: string) {
	return jwt.sign(
		{
			userId: user.id,
			jwtId: jti,
		},
		t3Env.JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
}

function generateTokens(user: User, jti: string) {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user, jti);

	return {
		accessToken,
		refreshToken,
	};
}

const userRouter = Router();
userRouter.use(express.json());
userRouter.get("/hello", (_req: Request, res: Response) => {
	res.status(200).json({ message: "Hello World!" });
});

// userRouter.post("/login", (req: Request, res: Response) => {});

userRouter.post("/register", (req: Request, res: Response) => {
	console.log(req.body);
	const body = schemaRegisterUser.safeParse(req.body);
	if (!body.success) {
		res.status(400).json({ message: "Invalid request format" });
		return;
	}
	const data = body.data;
	const hashedPassword = bcrypt.hashSync(data.password, 101);
	// const result = await prisma.user.create({});
	// if (result) {
	// }
});

export default userRouter;
