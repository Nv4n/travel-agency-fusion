import { Router } from "express";
import jwt from "jsonwebtoken";
import { searchHotelSchema } from "../../../model/formSchemas/SchemaSearchHotel";
import { schemaHotel } from "../../../model/formSchemas/SchemasHotel";
import { jwtAuthMiddleware } from "../../../server/middlewares/authMiddleware";
import { t3Env } from "../../../t3Env";
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
		console.log(destinations);

		if (!destinations) {
			res.status(404).json({ error: "Destinations not found" });
			return;
		}
		res.status(200).json({ data: { destinations: destinations } });
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

hotelRouter.get("/:hotelId", async (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const authCookie = req.cookies[t3Env.JWT_COOKIE_NAME] as
			| string
			| undefined;
		let userId = "";
		if (authCookie) {
			try {
				const decoded = jwt.verify(
					authCookie,
					t3Env.REFRESH_SECRET
				) as {
					userId?: string;
					email?: string;
					jwtId?: string;
				};
				if (decoded.email && decoded.userId && !decoded.jwtId) {
					const dbToken = await prisma.token.findFirst({
						where: {
							id: decoded.jwtId,
							userId: decoded.userId,
							valid: true,
						},
						select: {
							hash: true,
						},
					});
					if (dbToken) {
						userId = decoded.userId;
					}
				}
			} catch (err) {}
		}

		const { hotelId } = req.params;
		const foundHotel = await prisma.hotel.findUnique({
			where: {
				id: hotelId,
			},
			select: {
				id: true,
				name: true,
				description: true,
				destination: true,
				ownerId: true,
				rooms: {
					select: {
						id: true,
						quantity: true,
						maxGuests: true,
						price: true,
					},
				},
				reviews: {
					select: {
						id: true,
						rating: true,
						content: true,
						user: {
							select: {
								fname: true,
								lname: true,
							},
						},
					},
				},
			},
		});
		if (!foundHotel) {
			res.status(404).json({ error: "Hotel not found" });
			return;
		}
		const hotelData = {
			id: foundHotel.id,
			name: foundHotel.name,
			description: foundHotel.description,
			destination: foundHotel.destination,
		};
		const isOwner = foundHotel.ownerId === userId;
		res.status(200).json({
			data: {
				hotel: hotelData,
				rooms: foundHotel.rooms,
				reviews: foundHotel.reviews,
				isOwner: isOwner,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default hotelRouter;
