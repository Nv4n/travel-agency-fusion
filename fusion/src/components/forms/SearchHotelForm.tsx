import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PopoverTrigger } from "@/components/ui/popover";
import { GetSchemaSearchHotel } from "@/model/formSchemas/SchemaSearchHotel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { addDays } from "date-fns";
import { type SelectRangeEventHandler } from "react-day-picker";
import { useForm } from "react-hook-form";
import { type z } from "zod";

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
	const schema = GetSchemaSearchHotel(minPrice, maxPrice);
	type SearchHotel = z.infer<typeof schema>;
	const form = useForm<SearchHotel>({
		resolver: zodResolver(schema),
		defaultValues: {
			destination: "",
			dateRange: {
				from: new Date(),
				to: addDays(new Date(), 3),
			},
			minPrice: minPrice || 10,
			maxPrice: undefined,
			people: 1,
		},
		mode: "onChange",
	});

	const onSubmit = (values: SearchHotel) => {
		console.log(values);
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
	};

	const watchMinPrice = form.watch("minPrice");
	const watchMaxPrice = form.watch("maxPrice");

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={"space-y-8 " + (className ? className : "")}
			>
				<FormField
					control={form.control}
					name="destination"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="sr-only">
								Destination
							</FormLabel>
							<FormControl>
								<Input placeholder="Destination" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Popover>
					<PopoverTrigger>
						<Button variant={"outline"} className="relative">
							{watchMinPrice || watchMaxPrice
								? `${watchMinPrice || ""} BGN - ${
										watchMaxPrice || ""
								  } BGN` //
								: "Price"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-48">
						<FormField
							control={form.control}
							name="minPrice"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="sr-only">
										Min Price
									</FormLabel>
									<FormControl>
										<Input
											placeholder="from"
											type="number"
											step={10}
											min={minPrice || 10}
											max={form.getValues("maxPrice")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="maxPrice"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="sr-only">
										Min Price
									</FormLabel>
									<FormControl>
										<Input
											placeholder="to"
											type="number"
											step={10}
											min={form.getValues("minPrice")}
											max={maxPrice}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</PopoverContent>
				</Popover>
				<FormField
					control={form.control}
					name="dateRange"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date Range</FormLabel>
							<DatePickerWithRange
								date={field.value}
								setDate={
									field.onChange as SelectRangeEventHandler
								}
							></DatePickerWithRange>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="people"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Guest count</FormLabel>
							<FormControl>
								<Input
									placeholder="from"
									{...field}
									type="number"
									step={1}
									min={1}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" onClick={(e) => e.preventDefault()}>
					Submit
				</Button>
			</form>
		</Form>
	);
};
