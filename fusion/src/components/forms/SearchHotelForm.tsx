import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { Button } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorBoundary } from "../ErrorBoundary";
import { DatePickerWithRange } from "../ui/date-range-picker";
import { Form } from "../ui/form";

export interface SearchHotelProps
	extends React.FormHTMLAttributes<HTMLFormElement> {
	minPrice?: number;
	maxPrice?: number;
}

export const SearchHotelForm = ({
	className,
	minPrice,
	maxPrice,
}: SearchHotelProps) => {
	const searchHotelSchema = z.object({
		destination: z.string().nonempty(),
		dateRange: z.object({
			from: z.date(),
			to: z.date().optional(),
		}),
		minPrice: z
			.number()
			.int()
			.positive()
			.min(
				minPrice || 1,
				`Minimal value of price must be ${minPrice || 1}`
			)
			.optional(),
		maxPrice: z
			.number()
			.int()
			.positive()
			.max(
				maxPrice || Number.MAX_SAFE_INTEGER,
				`Maximal value of price must be ${
					maxPrice || Number.MIN_SAFE_INTEGER
				}`
			)
			.optional(),
		people: z.number().int().positive(),
	});

	type SearchHotel = z.infer<typeof searchHotelSchema>;
	// 1. Define your form.
	const form = useForm<SearchHotel>({
		resolver: zodResolver(searchHotelSchema),
		defaultValues: {
			dateRange: {
				from: new Date(),
				to: addDays(new Date(), 3),
			},
			minPrice: 1,
		},
	});

	// 2. Define a submit handler
	const onSubmit = (values: SearchHotel) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	};

	return (
		
			<Form {...form}>
				<ErrorBoundary>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className={"space-y-8 " + (className ? className : "")}
					>
						<DatePickerWithRange></DatePickerWithRange>
						<Button type="submit">FIND YOUR TRIP</Button>
					</form>
				</ErrorBoundary>
			</Form>
		
	);
};
