import { prisma } from "../../../server/db";
import { t3Env } from "../../../t3Env";
import { type User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateAccessToken = (user: Pick<User, "email" | "id">) => {
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
};

export const generateRefreshToken = (
	user: Pick<User, "email" | "id">,
	jti: string
) => {
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
};

export const getVerifiedTokens = async (
	accessToken: string,
	refreshToken: string,
	user: Pick<User, "email" | "id">
) => {
	let returnAccessToken = accessToken;
	let returnRefreshToken = refreshToken;
	try {
		jwt.verify(accessToken, t3Env.ACCESS_SECRET);
	} catch (err) {
		try {
			jwt.verify(refreshToken, t3Env.REFRESH_SECRET);
			const dbRefreshToken = await prisma.token.findFirst({
				where: {
					userId: user.id,
					hash: refreshToken,
				},
				select: {
					hash: true,
					valid: true,
				},
			});

			if (!dbRefreshToken || !dbRefreshToken.valid) {
				throw new Error("Invalidated db Refresh token");
			}
			returnAccessToken = generateAccessToken(user);
		} catch (err) {
			console.log(err);

			returnAccessToken = generateAccessToken(user);
			const jti = crypto.randomUUID();
			returnRefreshToken = generateRefreshToken(user, jti);
			await prisma.token.create({
				data: {
					id: jti,
					hash: returnRefreshToken,
					user: {
						connect: {
							id: user.id,
						},
					},
				},
			});
		}
	}

	return { accessToken: returnAccessToken, refreshToken: returnRefreshToken };
};
