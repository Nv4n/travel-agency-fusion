import { type ZodNumber, type ZodOptional, z } from "zod";

export const IntegerString = <S extends ZodNumber | ZodOptional<ZodNumber>>(
	schema: S
) => {
	return z.preprocess(
		(value) =>
			typeof value === "string"
				? parseInt(value, 10)
				: typeof value === "number"
				? value
				: z.NEVER,
		schema
	) as z.ZodEffects<z.ZodTypeAny, number, unknown>;
};

export const GetSchemaSearchHotel = (minPrice?: number, maxPrice?: number) => {
	const searchHotelSchema = z.object({
		destination: z
			.string()
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
						.min(
							minPrice || 1,
							`Minimal value of price must be ${minPrice || 1}`
						)
				).optional(),
				maxPrice: IntegerString(
					z
						.number()
						.int()
						.positive()
						.max(
							maxPrice || Number.MAX_SAFE_INTEGER,
							`Maximal value of price must be ${
								maxPrice || Number.MAX_SAFE_INTEGER
							}`
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

					if (
						val.minPrice &&
						val.minPrice > Number.MAX_SAFE_INTEGER
					) {
						return false;
					}
					if (
						val.maxPrice &&
						val.maxPrice > Number.MAX_SAFE_INTEGER
					) {
						return false;
					}

					return true;
				},
				{ message: "Invalid price range" }
			),
		people: IntegerString(z.number().int().positive()),
	});

	// type CheckType = z.infer<typeof searchHotelSchema>;
	return searchHotelSchema;
};
