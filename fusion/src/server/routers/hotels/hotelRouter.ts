import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Router } from "express";
import { searchHotelSchema } from "../../../model/formSchemas/SchemaSearchHotel";
import { jwtAuthMiddleware } from "../../../server/middlewares/authMiddleware";
import { t3Env } from "../../../t3Env";
import { prisma } from "../../db";
import { getAvailableHotels } from "./hotelRouterUtils";
import { schemaHotel } from "@/model/formSchemas/SchemasHotel";
import jwt from "jsonwebtoken";

const hotelRouter = Router();

const supabase = createSupabaseClient(t3Env.SUPABASE_URL, t3Env.SUPABASE_ANON, {
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
		const destinations = new Set<string>();
		filteredHotels.forEach((hotel) => {
			if (hotel) {
				destinations.add(hotel?.description);
			}
		});
		res.status(200).json({ data: Array.from(destinations) });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
});

hotelRouter.post("/", jwtAuthMiddleware, async (req, res) => {
	try {
		const body = schemaHotel.safeParse(req.body);
		if (!body.success) {
			res.status(400).json({ error: "Wrong format of hotel" });
			return;
		}
		const accessToken = req.headers["authorization"]?.replace(
			"Bearer ",
			""
		);
		if (!accessToken) {
			res.status(403).json({ error: "Not authorized" });
			return;
		}
		const { data } = body;
		const decoded = jwt.decode(accessToken) as {
			userId?: string;
		};
		if (decoded.userId) {
			res.status(400).json({ error: "Bad Access token" });
			return;
		}

		const createdHotel = await prisma.hotel.create({
			data: {
				name: data.name,
				description: data.description,
				destination: data.destination,
				owner: {
					connect: {
						id: decoded.userId,
					},
				},
			},
		});

		res.status(201).json({ data: { hotelId: createdHotel.id } });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default hotelRouter;
