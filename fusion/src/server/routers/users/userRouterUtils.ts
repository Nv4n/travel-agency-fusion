import { type User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { prisma } from "../../../server/db";
import { t3Env } from "../../../t3Env";
import { hoursToMilliseconds } from "date-fns";

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

export const getVerifiedTokens = async (user: Pick<User, "email" | "id">) => {
	const date = Date.now();
	const dbRefreshToken = await prisma.token.findFirst({
		where: {
			userId: user.id,
			valid: true,
			expireDate: { gt: new Date(date) },
		},
		select: {
			id: true,
			hash: true,
			valid: true,
		},
	});

	let refreshToken = "";
	try {
		if (!dbRefreshToken || !dbRefreshToken.valid) {
			throw new Error("Invalidated db Refresh token");
		}
		try {
			jwt.verify(dbRefreshToken?.hash, t3Env.REFRESH_SECRET);
			refreshToken = dbRefreshToken.hash;
		} catch (err) {
			await prisma.token.update({
				where: {
					id: dbRefreshToken.id,
				},
				data: {
					valid: false,
				},
			});
		}
	} catch (err) {
		const jti = crypto.randomUUID();
		refreshToken = generateRefreshToken(user, jti);
		const expireDate = Date.now() + hoursToMilliseconds(3);
		await prisma.token.create({
			data: {
				id: jti,
				hash: refreshToken,
				user: {
					connect: {
						id: user.id,
					},
				},
				expireDate: new Date(expireDate),
			},
		});
	}
	const accessToken = generateAccessToken(user);

	return { accessToken: accessToken, refreshToken: refreshToken };
};
