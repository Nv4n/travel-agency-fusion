import { Router } from "express";
import { searchHotelSchema } from "../../../model/formSchemas/SchemaSearchHotel";
import { prisma } from "../../db";
import { getAvailableHotels } from "./hotelRouterUtils";

const hotelRouter = Router();

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
		res.status(200).json({ destinations });
	} catch (err) {
		res.sendStatus(500);
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
		res.status(200).json({ filteredHotels });
	} catch (err) {
		res.sendStatus(500);
	}
});
//TODO ADD HOTEL
// hotelRouter.post("/", jwtAuthMiddleware, (req, res) => {});

export default hotelRouter;
