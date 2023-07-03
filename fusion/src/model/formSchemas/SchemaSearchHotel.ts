import { z } from "zod";
import { IntegerString, namesRegex } from "./schemaUtilities";

export const searchHotelSchema = z.object({
	destination: z
		.string()
		.max(255)
		.regex(namesRegex, "Destination name is not possible")
		.nonempty({ message: "You should choose your destination" }),
	dateRange: z
		.object(
			{
				from: z.date({
					required_error: "Please select a date",
					invalid_type_error: "From Date should be chosen",
				}),
				to: z.date({
					required_error: "Please select a date",
					invalid_type_error: "To Date should be chosen",
				}),
			},
			{ invalid_type_error: "Values out of range" }
		)
		.required(),
	priceRange: z
		.object({
			minPrice: IntegerString(
				z
					.number()
					.int()
					.positive()
					.min(1, "Min price is non-possible value")
			).optional(),
			maxPrice: IntegerString(
				z
					.number()
					.int()
					.positive()
					.max(
						Number.MAX_SAFE_INTEGER,
						"Max price is non-possible value"
					)
			).optional(),
		})
		.refine(
			(val) => {
				if (
					val.maxPrice &&
					val.minPrice &&
					val.minPrice > val.maxPrice
				) {
					return false;
				}

				if (val.minPrice && val.minPrice > Number.MAX_SAFE_INTEGER) {
					return false;
				}
				if (val.maxPrice && val.maxPrice > Number.MAX_SAFE_INTEGER) {
					return false;
				}

				return true;
			},
			{ message: "Invalid price range" }
		),
	people: IntegerString(z.number().int().positive()),
});

export const GetSchemaSearchHotel = (minPrice?: number, maxPrice?: number) => {
	const extendedHotelSchema = searchHotelSchema
		.refine(
			(data) => {
				if (
					minPrice &&
					data.priceRange.minPrice &&
					data.priceRange.minPrice < minPrice
				) {
					return false;
				}

				return true;
			},
			{
				path: ["priceRange"],
				message: `Min price is less than the min value ${
					minPrice || 1
				}`,
			}
		)
		.refine(
			(data) => {
				if (
					maxPrice &&
					data.priceRange.maxPrice &&
					data.priceRange.maxPrice > maxPrice
				) {
					return false;
				}

				return true;
			},
			{
				path: ["priceRange"],
				message: `Max price is greater than the max value ${
					maxPrice || Number.MAX_SAFE_INTEGER
				}`,
			}
		);
	// type CheckType = z.infer<typeof extendedHotelSchema>;
	return extendedHotelSchema;
};
