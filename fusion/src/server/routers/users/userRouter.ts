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

const JWT_COOKIE_NAME = "fusion-refresh-token";
const userRouter = Router();

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

		res.status(201)
			.cookie(t3Env.JWT_COOKIE_NAME, refreshToken, {
				maxAge: hoursToMilliseconds(3),
				httpOnly: true,
				secure: true,
				sameSite: "strict",
			})
			.json({ data: accessToken });
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
		const refreshToken = await prisma.token.findFirst({
			where: {
				userId: foundUser.id,
			},
			select: {
				hash: true,
				valid: true,
			},
		});

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const cookies = req.cookies[t3Env.JWT_COOKIE_NAME] as string;
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
			.json({ data: access });
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
});

export default userRouter;
