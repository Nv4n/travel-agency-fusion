import express from "express";

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
router.get("/hello", async (_req, res) => {
	res.status(200).json({ message: "Hello World!" });
});

export default router;
