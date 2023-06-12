import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Hotels } from "../pages/Hotels";

const router = createBrowserRouter([
	{ path: "/*", element: <Hotels></Hotels> },
]);

const App = () => {
	return <RouterProvider router={router}></RouterProvider>;
};

export default App;
