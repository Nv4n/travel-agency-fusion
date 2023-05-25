import express from "express";
import router from "./routers/router";
import path from "path";
import { t3Env } from "../t3Env";

const MODE = t3Env.NODE_ENV;

const app = express();
app.get("/api", (req, res) => {
	res.json({ message: "It works!" });
});
// Use vite's connect instance as middleware
app.use("/api", router);

if (MODE === "production") {
	console.log(`__dirname = ${__dirname}`);
	app.use(express.static(path.join(__dirname, "..", "dist")));
	app.use(express.static(path.join(__dirname, "..", "public")));

	app.set("port", 8080);
	app.listen(8080, () => console.log("listening on port 5000"));
}

export default app;
