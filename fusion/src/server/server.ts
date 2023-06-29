import express from "express";
import path from "path";
import { t3Env } from "../t3Env";
import userRouter from "./routers/userRouter";
import swaggerDocs from "./swagger";

const MODE = t3Env.NODE_ENV;

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);

if (MODE === "production") {
	console.log(`__dirname = ${__dirname}`);
	app.use(express.static(path.join(__dirname, "..", "dist")));
	app.use(express.static(path.join(__dirname, "..", "public")));
	app.set("port", 6000);
}

swaggerDocs(app, 5173);

export default app;
