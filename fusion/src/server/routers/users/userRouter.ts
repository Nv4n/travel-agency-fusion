import bcrypt from "bcrypt";
import crypto from "crypto";
import { hoursToMilliseconds } from "date-fns";
import { Router, type Request, type Response } from "express";
import {
	schemaLoginUser,
	schemaRegisterUser,
} from "../../../model/formSchemas/SchemaUserAuthenticate";
import { prisma } from "../../db";
import {
	generateAccessToken,
	generateRefreshToken,
	getVerifiedTokens,
} from "./userRouterUtils";
import { t3Env } from "../../../t3Env";

const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
	try {
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
		await prisma.token.create({
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

		res.status(201)
			.cookie(t3Env.JWT_COOKIE_NAME, refreshToken, {
				maxAge: hoursToMilliseconds(3),
				httpOnly: true,
				secure: true,
				sameSite: "strict",
			})
			.json({
				data: {
					accessToken,
					fname: resultUser.fname,
					lname: resultUser.lname,
				},
			});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
		console.log(err);
	}
});

userRouter.post("/login", async (req, res) => {
	try {
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
				fname: true,
				lname: true,
				password: {
					select: {
						hash: true,
					},
				},
			},
		});
		if (!foundUser) {
			res.status(403).json({
				error: "Email or password are wrong",
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
				error: "Email or password are wrong",
			});
			return;
		}

		const accessToken = generateAccessToken(foundUser);
		const refreshToken = await prisma.token.findFirst({
			where: {
				userId: foundUser.id,
			},
			select: {
				hash: true,
				valid: true,
			},
		});

		const { accessToken: access, refreshToken: refresh } =
			await getVerifiedTokens(
				accessToken,
				refreshToken?.hash || "",
				foundUser
			);
		res.status(200)
			.cookie(t3Env.JWT_COOKIE_NAME, refresh, {
				maxAge: hoursToMilliseconds(3),
				httpOnly: true,
				secure: true,
				sameSite: "strict",
			})
			.json({
				data: {
					accessToken: access,
					fname: foundUser.fname,
					lname: foundUser.lname,
				},
			});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
		console.log(err);
	}
});

userRouter.delete("/logout", (req, res) => {
	res.clearCookie(t3Env.JWT_COOKIE_NAME).sendStatus(200);
});

export default userRouter;
