import express from "express";
import path from "path";
import { t3Env } from "../t3Env";
import router from "./routers/router";

const MODE = t3Env.NODE_ENV;

const app = express();
app.get("/api", (req, res) => {
	res.json({ message: "It works!" });
});
// Use vite's connect instance as middleware
app.use("/api/users", router);

if (MODE === "production") {
	console.log(`__dirname = ${__dirname}`);
	app.use(express.static(path.join(__dirname, "..", "dist")));
	app.use(express.static(path.join(__dirname, "..", "public")));

	app.set("port", 6000);
}

export default app;
