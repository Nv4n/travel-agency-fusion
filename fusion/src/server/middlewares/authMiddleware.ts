import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { t3Env } from "../../t3Env";

export function jwtVerifyToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const bearerHeader = req.headers.authorization;

	if (!bearerHeader) {
		res.redirect(401,"/login");
		return;
	}

	const bearerToken = bearerHeader.split(" ")[1];
	if (!bearerToken) {
		res.redirect(401, "/login");
		return;
	}
	jwt.verify(bearerToken, t3Env.ACCESS_SECRET, (err, decoded) => {
		if (err) {
			res.redirect(401, "/login");
			return;
		} else {
			console.log(decoded);
			next();
		}
	});
}
