import { type searchHotelSchema } from "../../../model/formSchemas/SchemaSearchHotel";
import { prisma } from "../../../server/db";
import { type z } from "zod";

export const getAvailableHotels = async (
	data: z.infer<typeof searchHotelSchema>
) => {
	return prisma.hotel.findMany({
		select: {
			id: true,
			name: true,
			description: true,
			reviews: {
				select: {
					rating: true,
				},
			},
			rooms: {
				where: {
					maxGuests: { gte: data.people },
					price: {
						gte: data.priceRange.minPrice,
						lte: data.priceRange.maxPrice,
					},
				},
				select: {
					id: true,
					price: true,
					quantity: true,
					reservations: {
						where: {
							OR: [
								{
									from: {
										lt: data.dateRange.to,
									},
									to: {
										gt: data.dateRange.from,
									},
								},
								{
									from: {
										gte: data.dateRange.from,
									},
									to: {
										lte: data.dateRange.to,
									},
								},
							],
						},
						select: {
							id: true,
						},
					},
				},
			},
		},
	});
};
