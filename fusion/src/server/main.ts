import express from "express";
import router from "./lib/router";
import ViteExpress from "vite-express";

const app = express();

app.use(express.static("public"));

// Use vite's connect instance as middleware
app.use("/api", router);

ViteExpress.listen(app, 3000, () =>
	console.log("Server is listening on port 3000...")
);
