import { type User } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { minutesToMilliseconds } from "date-fns";
import express, { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import {
	schemaLoginUser,
	schemaRegisterUser,
} from "../../model/formSchemas/SchemaUserAuthenticate";
import { t3Env } from "../../t3Env";
import { prisma } from "../db";

function generateAccessToken(user: Pick<User, "email" | "id">) {
	return jwt.sign(
		{
			userId: user.id,
			email: user.email,
		},
		t3Env.ACCESS_SECRET,
		{
			expiresIn: "15m",
		}
	);
}

function generateRefreshToken(user: Pick<User, "email" | "id">, jti: string) {
	return jwt.sign(
		{
			userId: user.id,
			email: user.email,
			jwtId: jti,
		},
		t3Env.REFRESH_SECRET,
		{
			expiresIn: "3h",
		}
	);
}

const userRouter = Router();
userRouter.use(express.json());


userRouter.post("/register", async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const parsedBody = schemaRegisterUser.safeParse(req.body);
		if (!parsedBody.success) {
			res.status(400).json({
				error: "Invalid format of data",
			});
			return;
		}
		const data = parsedBody.data;
		const existEmail = await prisma.user.findUnique({
			where: { email: data.email },
			select: { email: true },
		});
		if (existEmail) {
			res.status(400).json({ error: "Email is already in use" });
			return;
		}
		const hashedPassword = await bcrypt.hash(data.password, 10);
		const resultUser = await prisma.user.create({
			data: {
				email: data.email,
				fname: data.fname,
				lname: data.lname,
				password: {
					create: {
						hash: hashedPassword,
					},
				},
			},
		});
		const jti = crypto.randomUUID();
		const accessToken = generateAccessToken(resultUser);
		const refreshToken = generateRefreshToken(resultUser, jti);
		const resultToken = await prisma.token.create({
			data: {
				id: jti,
				hash: refreshToken,
				user: {
					connect: {
						id: resultUser.id,
					},
				},
			},
		});

		res.status(201).cookie("fusion-access-token", accessToken, {
			maxAge: minutesToMilliseconds(15),
			httpOnly: true,
			secure: true,
		});
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
});

userRouter.post("/login", async (req, res) => {
	try {
		console.log(req.body);
		const parsedBody = schemaLoginUser.safeParse(req.body);
		if (!parsedBody.success) {
			res.status(400).json({
				error: "Invalid format of data.",
			});
			return;
		}

		const foundUser = await prisma.user.findUnique({
			where: {
				email: parsedBody.data.email,
			},
			select: {
				id: true,
				email: true,
				password: {
					select: {
						hash: true,
					},
				},
			},
		});
		if (!foundUser) {
			res.status(403).json({
				error: "Invalid login credentials.",
			});
			return;
		}
		if (!foundUser.password?.hash) {
			res.status(404).json({
				error: "User not found",
			});
			return;
		}

		const isPasswordValid = await bcrypt.compare(
			parsedBody.data.password,
			foundUser.password.hash
		);
		if (!isPasswordValid) {
			res.status(403).json({
				error: "Invalid login credentials.",
			});
			return;
		}

		const accessToken = generateAccessToken(foundUser);
		res.status(200);
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
});

export default userRouter;
