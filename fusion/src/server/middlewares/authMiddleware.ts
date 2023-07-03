import { t3Env } from "../../t3Env";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db";

const JWT_COOKIE_NAME = "fusion-refresh-token";

export const jwtAuthMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bearerHeader = req.headers.authorization;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	const authCookie = req.cookies[JWT_COOKIE_NAME] as string | undefined;
	// console.log(bearerHeader);
	// console.log(authCookie);

	if (!bearerHeader) {
		res.status(401).json({ redirect: "/login" });
		return;
	}

	if (
		!bearerHeader.match(
			/Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/
		)
	) {
		res.status(401).json({ redirect: "/login" });
		return;
	}

	if (!authCookie) {
		res.status(401).json({ redirect: "/login" });
		return;
	}
	const accessToken = bearerHeader.replace("Bearer ", "");
	try {
		jwt.verify(accessToken, t3Env.ACCESS_SECRET);
		try {
			const decoded = jwt.verify(authCookie, t3Env.REFRESH_SECRET);
			next();
		} catch (err) {
			console.log(err);

			console.log("Refresh token failed");
			void prisma.token.updateMany({
				where: {
					hash: authCookie,
				},
				data: {
					valid: false,
				},
			});
			res.status(401)
				.clearCookie(JWT_COOKIE_NAME)
				.json({ redirect: "/login" });
		}
	} catch (err) {
		res.status(401).json({ needRefresh: true });
		return;
	}
};
