import { VITE_JWT_SESSION_NAME } from "@/client/App";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Hotel = {
	id: string;
	name: string;
	description: string;
	destination: string;
};
type Room = {
	id: string;
	quantity: number;
	maxGuests: number;
	price: number;
};
type Review = {
	id: string;
	rating: number;
	content: string;
	user: {
		fname: string;
		lname: string;
	};
};

export const HotelDetails = () => {
	const { hotelId } = useParams();
	const navigate = useNavigate();
	const accessToken = sessionStorage.getItem(VITE_JWT_SESSION_NAME);
	if (!hotelId) {
		navigate("/");
		return;
	}
	const { data, isLoading } = useQuery({
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
	});

	const [reviews, setReviews] = useState<Review[]>([]);
	const [hotelData, setHotelData] = useState<Hotel | null>(null);
	const [rooms, setRooms] = useState<Room[]>([]);
	const [isOwner, setIsOwner] = useState(false);
	if (!isLoading && data) {
		setReviews(data.reviews);
		setHotelData(data.hotel);
		setRooms(data.rooms);
		setIsOwner(data.isOwner);
	}

	if (isLoading) {
		return <Skeleton className="h-96 w-96"></Skeleton>;
	}

	if (!isLoading && !data) {
		navigate("/404");
	}
	return (
		<div>
			<Skeleton className="h-48 w-full" />
		</div>
	);
};
