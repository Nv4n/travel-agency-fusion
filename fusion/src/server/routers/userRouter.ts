import { Router, type Request, type Response } from "express";

const userRouter = Router();

userRouter.get("/hello", (_req: Request, res: Response) => {
	res.status(200).json({ message: "Hello World!" });
});

userRouter.get("/login");

export default userRouter;
