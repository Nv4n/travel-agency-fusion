import { type NextFunction, type Request, type Response } from "express";

export const jwtAuthMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bearerHeader = req.headers.authorization;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	const authCookie = req.cookies["fusion-refresh-token"];
	if (!bearerHeader) {
		res.redirect(307, "/login");
		return;
	}

	if (
		!bearerHeader.match(
			/Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/
		)
	) {
		res.redirect(307, "/login");
		return;
	}

	if (!authCookie) {
		res.redirect(307, "/login");
		return;
	}
	next();
};
