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
import { hidePlaceholderStyles, peekLabelStyles } from "./formStyles";
import { useState } from "react";
import Fuse from "fuse.js";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { DESTRUCTION } from "dns";

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
	const [index, setIndex] = useState(new Fuse<string>([]));
	const { data: possibleDestinations, isLoading } = useQuery({
		queryKey: ["possible-destinations"],
		queryFn: async () => {
			const resp = await fetch("/api/hotels/destinations/all");
			if (resp.status === 200) {
				const { data } = (await resp.json()) as {
					data: {
						destinations: {
							_count: { destination: number };
							destination: string;
						}[];
					};
				};
				const desinations = data.destinations.map(
					(dest) => dest.destination
				);
				setIndex(new Fuse(desinations));
				return desinations;
			}
			return [];
		},
	});

	const [cities, setCities] = useState<string[]>([]);

	const onSearch = (query: string) => {
		const results = index.search(query);
		const cityNames = results.map((res) => res.item);
		setCities(cityNames);
	};

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
			priceRange: {
				minPrice: minPrice || 10,
				maxPrice: undefined,
			},
			people: 1,
		},
		mode: "onChange",
	});

	const onSubmit = (values: SearchHotel) => {
		console.log(values);
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
	};

	const watchMinPrice = form.watch("priceRange.minPrice");
	const watchMaxPrice = form.watch("priceRange.maxPrice");

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
						<FormItem className="group relative">
							<FormLabel className={peekLabelStyles}>
								Destination
							</FormLabel>
							<FormControl>
								<>
									<Input
										onInput={(e) =>
											onSearch(e.currentTarget.value)
										}
										className={hidePlaceholderStyles}
										placeholder="Destination"
										{...field}
									/>
									<ScrollArea
										className={`${
											cities.length ? "h-48" : "sr-only"
										}  w-96 rounded-md border`}
									>
										{cities.map((city) => {
											return (
												<div
													key={city}
													className="cursor-pointer text-sm hover:bg-zinc-400"
													onClick={(e) => {
														setCities([]);
														form.setValue(
															"destination",
															city
														);
														form.clearErrors(
															"destination"
														);
													}}
												>
													<span>{city}</span>
													<Separator className="my-2" />
												</div>
											);
										})}
									</ScrollArea>
								</>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-baseline gap-1">
					<FormField
						control={form.control}
						name="priceRange"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="sr-only">
									Price range
								</FormLabel>
								<FormControl>
									<Popover {...field}>
										<PopoverTrigger>
											<Button
												variant={"outline"}
												className="relative"
												type="button"
											>
												{watchMinPrice || watchMaxPrice
													? `${
															watchMinPrice || ""
													  } BGN - ${
															watchMaxPrice || ""
													  } BGN` //
													: "Price"}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="z-10 w-48">
											<FormField
												control={form.control}
												name="priceRange.minPrice"
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
																min={
																	minPrice ||
																	10
																}
																max={form.getValues(
																	"priceRange.maxPrice"
																)}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="priceRange.maxPrice"
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
																min={form.getValues(
																	"priceRange.minPrice"
																)}
																max={
																	maxPrice &&
																	Math.min(
																		maxPrice,
																		Number.MAX_SAFE_INTEGER
																	)
																}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="people"
						render={({ field }) => (
							<FormItem className="group relative">
								<FormLabel className="absolute left-2 transition-transform group-focus-within:-translate-y-2 group-hover:-translate-y-2 ">
									Guest count
								</FormLabel>
								<FormControl>
									<Input
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
				</div>
				<FormField
					control={form.control}
					name="dateRange"
					render={({ field }) => (
						<FormItem className="group relative flex flex-col ">
							<FormLabel className="roup-focus-within:-translate-y-2 absolute left-2 transition-transform group-hover:-translate-y-2 ">
								Date Range
							</FormLabel>
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

				<Button type="submit" className="w-full">
					Find your trip
				</Button>
			</form>
		</Form>
	);
};
