import { z } from "zod";

const namesRegex =
	/^(([A-Z][a-z]+( [A-Z][a-z]+)*)|([А-Я][а-я]+( [А-Я][а-я]+)*))$/;

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export const schemaHotel = z.object({
	image: z
		.instanceof(FileList)
		.refine((files) => files?.length !== 1, "Image requered") // if no file files?.length === 0, if file files?.length === 1
		.refine((files) => {
			const file = files.item(0);
			return file && file.size >= MAX_FILE_SIZE;
		}, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
		.refine(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			(files) =>
				ACCEPTED_IMAGE_TYPES.includes(files?.item(0)?.type || ""),
			".jpg, .jpeg, .png and .webp files are accepted."
		),

	name: z.string().max(255).regex(namesRegex).nonempty(),
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
