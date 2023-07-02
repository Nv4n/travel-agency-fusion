import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemaHotel } from "@/model/formSchemas/SchemasHotel";
import { zodResolver } from "@hookform/resolvers/zod";
import { City } from "country-state-city";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { FormErrorAlert } from "./FormErrorAlert";
import { hidePlaceholderStyles, peekLabelStyles } from "./formStyles";
import Fuse from "fuse.js";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

type Hotel = z.infer<typeof schemaHotel>;
export type HotelFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const CreateHotelForm = ({ className }: HotelFormProps) => {
	const possibleDestinations =
		City.getCitiesOfCountry("BG")?.map((city) => city.name) || [];
	const index = new Fuse(possibleDestinations, {});
	console.log(index);

	const [cities, setCities] = useState<string[]>([]);
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();
	const form = useForm<Hotel>({
		resolver: zodResolver(schemaHotel),
		defaultValues: {
			name: "",
			description: "",
			destination: "",
		},
		mode: "onChange",
	});

	const onCreateSubmit = (values: Hotel) => {
		console.log(values);

		// const resp = await fetch(`/api/hotels/`, {
		// 	method: "POST",
		// 	headers: {
		// 		"content-type": "application/json",
		// 	},
		// 	body: JSON.stringify(values),
		// });

		// if (resp.status >= 300) {
		// 	const { error } = (await resp.json()) as { error: string };
		// 	setErrorMsg(error);
		// 	return;
		// }

		// const { data } = (await resp.json()) as {
		// 	data: { accessToken: string; fname: string; lname: string };
		// };
		// sessionStorage.setItem(VITE_JWT_SESSION_NAME, data.accessToken);
		// // setUserName(`${data.fname} ${data.lname}`);
		// navigate("/");
	};

	const onSearch = (query: string) => {
		const results = index.search(query);
		const cityNames = results.map((res) => res.item);
		console.log(cityNames);
		setCities(cityNames);

		// Do something with the search results
	};

	return (
		<>
			<Form {...form}>
				<form
					encType="multipart/form-data"
					onSubmit={form.handleSubmit(onCreateSubmit)}
					className={"space-y-8 " + (className ? className : "")}
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="group relative space-y-1">
								<FormLabel className={peekLabelStyles}>
									Hotel name
								</FormLabel>
								<FormControl>
									<Input
										className={hidePlaceholderStyles}
										placeholder="Hotel name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="destination"
						render={({ field }) => (
							<FormItem className="group relative space-y-1">
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
												cities.length
													? "h-48"
													: "sr-only"
											}  w-96 rounded-md border`}
										>
											{cities.map((city) => {
												return (
													<div
														className="cursor-pointer text-sm hover:bg-zinc-400"
														onClick={(e) => {
															form.setValue(
																"destination",
																city
															);
															setCities([]);
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
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="group relative space-y-1">
								<FormLabel className={peekLabelStyles}>
									Hotel name
								</FormLabel>
								<FormControl>
									<Input
										className={hidePlaceholderStyles}
										placeholder="Hotel name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit your hotel</Button>
				</form>
				<FormErrorAlert errorMsg={errorMsg}></FormErrorAlert>
			</Form>
		</>
	);
};
