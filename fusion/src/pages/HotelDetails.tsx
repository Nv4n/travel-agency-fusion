import { VITE_JWT_SESSION_NAME } from "@/client/App";
import { RoomCard } from "@/components/RoomCard";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
	TypographyH2,
	TypographyH3,
	TypographyP,
} from "@/components/ui/typography";
import { IconStar } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { minutesToMilliseconds } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export type Hotel = {
	id: string;
	name: string;
	description: string;
	destination: string;
};
export type Room = {
	id: string;
	quantity: number;
	maxGuests: number;
	price: number;
};
export type Review = {
	id: string;
	rating: number;
	content: string;
	user: {
		fname: string;
		lname: string;
	};
};

export const HotelDetails = () => {
	console.log("RENDER");

	const [data, setData] = useState<
		| {
				hotel: Hotel;
				rooms: Room[];
				reviews: Review[];
				isOwner: boolean;
		  }
		| null
		| undefined
	>(null);
	const { hotelId } = useParams();
	const navigate = useNavigate();
	const accessToken = sessionStorage.getItem(VITE_JWT_SESSION_NAME);
	if (!hotelId) {
		navigate("/");
		return <></>;
	}

	const { data: fetchedData, isLoading } = useQuery({
		queryKey: ["hotel-details", hotelId],
		queryFn: async () => {
			const resp = await fetch(`/api/hotels/${hotelId}`, {
				headers: {
					Authorization: `Bearer ${accessToken || ""}`,
				},
			});
			if (resp.status === 404) {
				navigate("/404");
			}
			if (resp.status === 200) {
				const { data } = (await resp.json()) as {
					data: {
						hotel: Hotel;
						rooms: Room[];
						reviews: Review[];
						isOwner: boolean;
					};
				};
				return data;
			}
			return null;
		},
		staleTime: minutesToMilliseconds(10),
	});
	useEffect(() => {
		if (!isLoading) {
			console.log("RENDER");

			setData(fetchedData);
		}
	}, [fetchedData]);

	if (isLoading || !fetchedData) {
		return <Skeleton className="h-96 w-96"></Skeleton>;
	} else if (!isLoading && !fetchedData) {
		navigate("/404");
		return;
	} else if (data) {
		return (
			<div className="mx-auto w-[80rem]">
				<Skeleton className="h-48 w-full" />
				<div className="grid grid-cols-2">
					<div className="flex flex-col">
						<TypographyH2>{data.hotel.name}</TypographyH2>
						<span>Location: {data.hotel.destination}</span>
						<div className="flex">
							<IconStar></IconStar>
							<span>
								{(data.reviews.reduce(
									(acc, review) => acc + review.rating,
									0
								) *
									1.0) /
									data.reviews.length || 0}
							</span>
						</div>
					</div>
					<TypographyH3>{`${Math.min(
						...data.rooms.map((room) => room.price)
					)}BGN - ${Math.max(
						...data.rooms.map((room) => room.price)
					)}BGN`}</TypographyH3>
				</div>
				<Separator></Separator>
				<div>
					<TypographyH3>Reviews</TypographyH3>
					{/* {reviews.map((room, ind) => {
					return (
						<>
							<RoomCard
								room={room}
								hotelId={hotelData?.id || ""}
								key={room.id}
							></RoomCard>
							<Separator></Separator>
						</>
					);
				})} */}
				</div>
				<Separator></Separator>
				<div>
					<TypographyH3>Rooms</TypographyH3>
					{data.rooms.length > 0 ? (
						data.rooms.map((room) => {
							return (
								<>
									<RoomCard
										room={room}
										hotelId={data.hotel.id || ""}
										key={room.id}
									></RoomCard>
									<Separator></Separator>
								</>
							);
						})
					) : (
						<Skeleton className="h-48 w-full"></Skeleton>
					)}
				</div>
			</div>
		);
	}
};