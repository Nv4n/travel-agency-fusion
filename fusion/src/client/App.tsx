import { AuthenticateUser } from "@/pages/AuthenticateUser";
import { Home } from "@/pages/Home";
import { Layout } from "@/pages/Layout";
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

const App = () => {
	return <RouterProvider router={router}></RouterProvider>;
};

export default App;
