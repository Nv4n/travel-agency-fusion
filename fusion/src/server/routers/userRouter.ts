import { type User } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import express, {
	Router,
	type NextFunction,
	type Request,
	type Response,
} from "express";
import jwt from "jsonwebtoken";
import { schemaRegisterUser } from "../../model/formSchemas/SchemaUserAuthenticate";
import { t3Env } from "../../t3Env";
import { prisma } from "../db";

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
function hashToken(token: string) {
	return crypto.createHash("sha512").update(token).digest("hex");
}

const userRouter = Router();
userRouter.use(express.json());
userRouter.get("/hello", (_req: Request, res: Response) => {
	res.status(200).json({ message: "Hello World!" });
});

// userRouter.post("/login", (req: Request, res: Response) => {});

userRouter.post(
	"/register",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log(req.body);
			const body = schemaRegisterUser.safeParse(req.body);
			if (!body.success) {
				res.status(400).json({
					message: "You must provide valid data",
				});
				return;
			}
			const data = body.data;
			const existEmail = await prisma.user.findUnique({
				where: { email: data.email },
				select: { email: true },
			});
			if (existEmail) {
				res.status(400).json({ message: "Email is already in use" });
				return;
			}
			const hashedPassword = await bcrypt.hash(data.password, 101);
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
			const token = generateRefreshToken(resultUser, jti);
			const resultToken = await prisma.token.create({
				data: {
					id: jti,
					hashedToken: hashToken(token),
					user: {
						connect: {
							id: resultUser.id,
						},
					},
				},
			});

			res.status(201).cookie("fusion-token", token,{maxAge: });
		} catch (err) {
			next(err);
		}
	}
);

export default userRouter;
