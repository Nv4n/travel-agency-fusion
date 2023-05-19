import express from "express";
import router from "./routers/router";
import ViteExpress from "vite-express";

const MODE = !(process.env.NODE_ENV === "production")
	? "development"
	: "production";

const app = express();
ViteExpress.config({ mode: MODE });
app.use(ViteExpress.static());

// Use vite's connect instance as middleware
app.use("/api", router);
ViteExpress.listen(app, 3000);

module.exports = [ViteExpress];
