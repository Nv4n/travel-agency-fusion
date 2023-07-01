import { AuthenticateUser } from "@/pages/AuthenticateUser";
import { Home } from "@/pages/Home";
import { Layout } from "@/pages/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { minutesToMilliseconds } from "date-fns";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ path: "/*", element: <Home></Home> },
			{ path: "login", element: <AuthenticateUser></AuthenticateUser> },
			{
				path: "register",
				element: <AuthenticateUser></AuthenticateUser>,
			},
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
