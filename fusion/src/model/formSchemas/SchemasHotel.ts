import { z } from "zod";
import { namesRegex } from "./schemaUtilities";



export const schemaHotel = z.object({
	name: z
		.string()
		.max(255)
		.regex(namesRegex, "Hotel name is not possible")
		.nonempty(),
	description: z
		.string()
		.min(25, "Description is less than the legitamate length")
		.max(512)
		.nonempty(),
	destination: z
		.string()
		.max(255)
		.regex(namesRegex, "Destination name is not possible")
		.nonempty(),
});
