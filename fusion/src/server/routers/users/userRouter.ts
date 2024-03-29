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
import { jwtAuthMiddleware } from "../../../server/middlewares/authMiddleware";
import jwt from "jsonwebtoken";

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

		const { accessToken, refreshToken } = await getVerifiedTokens(
			resultUser
		);

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

		const { accessToken: access, refreshToken: refresh } =
			await getVerifiedTokens(foundUser);
		res.status(200)
			.cookie(t3Env.JWT_COOKIE_NAME, refresh, {
				maxAge: Date.now() + hoursToMilliseconds(3),
				httpOnly: true,
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

userRouter.get("/name", jwtAuthMiddleware, async (req, res) => {
	try {
		const accessToken = req.headers["authorization"]?.replace(
			"Bearer ",
			""
		);
		if (!accessToken) {
			res.status(403).json({ error: "Not authorized" });
			return;
		}
		const decoded = jwt.decode(accessToken) as {
			userId?: string;
			email?: string;
		};
		console.log(decoded);
		if (!decoded.userId && !decoded.email) {
			res.status(400).json({ error: "Bad Access token" });
			return;
		}
		const user = await prisma.user.findUnique({
			where: {
				email: decoded.email,
			},
			select: {
				fname: true,
				lname: true,
			},
		});

		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		res.status(200).json({ data: { name: `${user.fname} ${user.lname}` } });
	} catch (err) {
		console.log(err);
	}
});

userRouter.get("/refresh-token", async (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	const authCookie = req.cookies[t3Env.JWT_COOKIE_NAME] as string | undefined;
	if (!authCookie) {
		res.status(401).json({ redirect: "/login" });
		return;
	}

	try {
		const decoded = jwt.verify(authCookie, t3Env.REFRESH_SECRET) as {
			userId?: string;
			email?: string;
			jwtId?: string;
		};
		if (!decoded.email || !decoded.userId || !decoded.jwtId) {
			res.status(401).json({ redirect: "/login" });
			return;
		}

		const dbToken = await prisma.token.findFirst({
			where: {
				id: decoded.jwtId,
				userId: decoded.userId,
				valid: true,
				expireDate: { gt: new Date(Date.now()) },
			},
			select: {
				hash: true,
			},
		});

		if (!dbToken || dbToken.hash !== authCookie) {
			res.status(401)
				.clearCookie(t3Env.JWT_COOKIE_NAME)
				.json({ redirect: "/login" });
			return;
		}
		const accessToken = generateAccessToken({
			id: decoded.userId,
			email: decoded.email,
		});
		res.status(200).json({ data: { accessToken: accessToken } });
	} catch (err) {
		res.status(401).json({ redirect: "/login" });
		return;
	}
});

export default userRouter;
