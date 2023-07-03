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
import { createRef, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { FormErrorAlert } from "./FormErrorAlert";
import { hidePlaceholderStyles, peekLabelStyles } from "./formStyles";
import Fuse from "fuse.js";

import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { VITE_JWT_SESSION_NAME } from "@/client/App";
import { Label } from "../ui/label";

type Hotel = z.infer<typeof schemaHotel>;
export type HotelFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const CreateHotelForm = ({ className }: HotelFormProps) => {
	const possibleDestinations =
		City.getCitiesOfCountry("BG")?.map((city) => city.name) || [];
	const index = new Fuse(possibleDestinations, {});

	const [cities, setCities] = useState<string[]>([]);
	const [errorMsg, setErrorMsg] = useState("");
	const fileInput = createRef<HTMLInputElement>();
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

	const onCreateSubmit = async (values: Hotel) => {
		const formData = new FormData();
		formData.append("hotelImage", (values.hotelImage as string) || "");
		formData.append("name", values.name);
		formData.append("destination", values.destination);
		formData.append("description", values.description);
		console.log(formData.get("hotelImage"));

		const accessToken = sessionStorage.getItem(VITE_JWT_SESSION_NAME);
		const resp = await fetch(`/api/hotels/add`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken || ""}`,
			},
			body: formData,
		});
		console.log(resp);
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
		setCities(cityNames);
	};

	const onFileChoosen = (file: File | null | undefined) => {
		const fileReader = new FileReader();
		fileReader.onloadend = (e) => {
			const content = fileReader.result;
			console.log(content);
			form.setValue("hotelImage", content);
		};
		if (file) {
			fileReader.readAsDataURL(file);
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onCreateSubmit)}
					className={"space-y-8 " + (className ? className : "")}
					encType="multipart/form-data"
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
														key={city}
														className="cursor-pointer text-sm hover:bg-zinc-400"
														onClick={(e) => {
															setCities([]);
															form.setValue(
																"destination",
																city
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
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="group relative space-y-1">
								<FormLabel className={peekLabelStyles}>
									Hotel description
								</FormLabel>
								<FormControl>
									<Textarea
										className={hidePlaceholderStyles}
										placeholder="Type your description here"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="group relative space-y-1">
						<Label>Hotel image</Label>
						<Input
							type="file"
							accept="image/png, image/jpeg, image/jpg, image/webp"
							// {...[field.value, field.ref]}
							// onChange={(e) => {
							// 	onFileChosen(
							// 		e.target.files?.item(0)
							// 	);
							// }}
							disabled
						/>
					</div>

					<Button type="submit">Submit your hotel</Button>
				</form>
				<FormErrorAlert errorMsg={errorMsg}></FormErrorAlert>
			</Form>
		</>
	);
};
