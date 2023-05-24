import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { LoginForm } from "../components/Forms/LoginForm";
import { Hotels } from "../pages/Hotels";

const router = createBrowserRouter([
	{ path: "/*", element: <Hotels></Hotels> },
	{ path: "/login", element: <LoginForm></LoginForm> },
]);

const App = () => {
	return <RouterProvider router={router}></RouterProvider>;
};

export default App;
