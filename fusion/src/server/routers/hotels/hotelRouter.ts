import { Router } from "express";
import { searchHotelSchema } from "../../../model/formSchemas/SchemaSearchHotel";
import { prisma } from "../../db";
import { getAvailableHotels } from "./hotelRouterUtils";
import { jwtAuthMiddleware } from "../../../server/middlewares/authMiddleware";
import multer from "multer";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { t3Env } from "../../../t3Env";

const hotelRouter = Router();
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/");
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(" ").join("-");
		cb(null, crypto.randomUUID() + "-" + fileName);
	},
});
const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg" ||
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/webp"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(
				new Error("Only .png, .jpg, .jpeg and .webp format allowed!")
			);
		}
	},
});

const subabase = createSupabaseClient(t3Env.SUPABASE_URL, t3Env.SUPABASE_ANON, {
	auth: { persistSession: false },
});

hotelRouter.get("/destinations/all", async (req, res) => {
	try {
		const destinations = await prisma.hotel.groupBy({
			by: ["destination"],
			_count: {
				destination: true,
			},
			orderBy: {
				destination: "asc",
			},
		});

		if (!destinations) {
			res.status(404).json({ error: "Destinations not found" });
			return;
		}
		res.status(200).json({ data: destinations });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
});

hotelRouter.get("/destinations", async (req, res) => {
	try {
		const body = searchHotelSchema.safeParse(req.body);
		if (!body.success) {
			console.log(body.error);
			res.status(400).json({ error: "Invalid data format" });
			return;
		}
		const data = body.data;
		const hotels = await getAvailableHotels(data);

		const filteredHotels = hotels
			.map((hotel) => {
				const filteredRooms = hotel.rooms.filter((room) => {
					room.reservations.length < room.quantity;
				});
				hotel.rooms = filteredRooms;
				return hotel.rooms.length > 0 ? hotel : null;
			})
			.filter((el) => el);

		if (filteredHotels.length === 0) {
			res.status(404).json({ error: "No hotels met the requirements" });
			return;
		}
		res.status(200).json({ data: filteredHotels });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
});
//TODO ADD HOTEL
hotelRouter.post(
	"/add",
	jwtAuthMiddleware,
	upload.single("hotelImage"),
	async (req, res) => {
		try {
			console.log(req.file);
			console.log(req.files);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (req.body.hotelImage) {
				console.log("here");

				const resp = await subabase.storage
					.from("images")
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
					.upload(
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
						`test/${req.body.hotelImage}`,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
						req.body.hotelImage,
						{
							cacheControl: "3600",
							upsert: false,
						}
					);
				console.log(resp);
			}

			console.log(req.body);
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: "Internal server error" });
		}
	}
);

export default hotelRouter;
