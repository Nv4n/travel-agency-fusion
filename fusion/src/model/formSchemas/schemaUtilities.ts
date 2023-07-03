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

export const namesRegex =
	/^(([A-Z][a-z]+( [A-Z][a-z]+)*)|([А-Я][а-я]+( [А-Я][а-я]+)*))$/;