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
import Fuse from "fuse.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { FormErrorAlert } from "./FormErrorAlert";
import { hidePlaceholderStyles, peekLabelStyles } from "./formStyles";

import { VITE_JWT_SESSION_NAME } from "@/client/App";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type Hotel = z.infer<typeof schemaHotel>;
export type HotelFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const CreateHotelForm = ({ className }: HotelFormProps) => {
	const possibleDestinations =
		City.getCitiesOfCountry("BG")?.map((city) => city.name) || [];
	const index = new Fuse(possibleDestinations, {});

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

	const onCreateSubmit = async (values: Hotel) => {
		const accessToken = sessionStorage.getItem(VITE_JWT_SESSION_NAME);
		console.log(values);

		const resp = await fetch(`/api/hotels/`, {
			method: "POST",
			headers: {
				authorization: `Bearer ${accessToken || ""}`,
				"content-type": "application/json",
			},
			body: JSON.stringify(values),
		});
		if (resp.status === 401) {
			const { redirect, needRefresh } = (await resp.json()) as {
				redirect?: string;
				needRefresh?: string;
			};
			if (redirect) {
				sessionStorage.removeItem(VITE_JWT_SESSION_NAME);
				navigate(redirect);
			}
			if (needRefresh) {
				const refreshResp = await fetch("/api/users/refresh-token");
				if (refreshResp.status >= 300) {
					const data = (await refreshResp.json()) as {
						redirect: string;
					};
					sessionStorage.removeItem(VITE_JWT_SESSION_NAME);
					navigate(data.redirect);
				}

				const { data } = (await refreshResp.json()) as {
					data: { accessToken: string };
				};
				sessionStorage.setItem(VITE_JWT_SESSION_NAME, data.accessToken);
				setErrorMsg("Refresh occured, please send your request again");
				return;
			}
		}
		if (resp.status >= 300) {
			const { error } = (await resp.json()) as { error: string };
			setErrorMsg(error);
			return;
		}

		const { data } = (await resp.json()) as {
			data: { hotelId: string };
		};

		navigate(`/hotels/${data.hotelId}`);
	};

	const onSearch = (query: string) => {
		const results = index.search(query);
		const cityNames = results.map((res) => res.item);
		setCities(cityNames);
	};

	return (
		<>
			<Form {...form}>
				<form
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
