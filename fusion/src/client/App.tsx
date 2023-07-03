import { RouteGuardWithoutAuth } from "@/components/guards/RouteGuardWithoutAuth";
import { AuthenticateUser } from "@/pages/AuthenticateUser";
import { CreateHotel } from "@/pages/CreateHotel";
import { Home } from "@/pages/Home";
import { HotelDetails } from "@/pages/HotelDetails";
import { Hotels } from "@/pages/Hotels";
import { Layout } from "@/pages/Layout";
import { NotFound } from "@/pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { minutesToMilliseconds } from "date-fns";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

export const VITE_JWT_SESSION_NAME = "fusion-access-token";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ path: "/*", element: <Home></Home> },
			{
				path: "login",
				element: (
					<RouteGuardWithoutAuth>
						<AuthenticateUser></AuthenticateUser>
					</RouteGuardWithoutAuth>
				),
			},
			{
				path: "register",
				element: (
					<RouteGuardWithoutAuth>
						<AuthenticateUser></AuthenticateUser>
					</RouteGuardWithoutAuth>
				),
			},
			{
				path: "addHotel",
				element: <CreateHotel></CreateHotel>,
			},
			{
				path: "hotels/:hotelId",
				element: <HotelDetails></HotelDetails>,
			},
			{
				path: "404",
				element: <NotFound></NotFound>,
			},
			{
				path: "hotels",
				element: <Hotels></Hotels>,
			},
			// {
			// 	path: "hotels/:hotelId/edit",
			// 	element: (
			// 		<RouteGuardWithAuth>
			// 			<HotelForm></HotelForm>
			// 		</RouteGuardWithAuth>
			// 	),
			// },
		],
	},
	{ path: "/api/*", element: <Navigate to={"/"}></Navigate> },
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: minutesToMilliseconds(5),
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}></RouterProvider>
		</QueryClientProvider>
	);
};

export default App;
