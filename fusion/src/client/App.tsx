import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Hotels } from "../pages/Hotels";
import { Home } from "@/pages/Home";

const router = createBrowserRouter([{ path: "/*", element: <Home></Home> }]);

const App = () => {
	return <RouterProvider router={router}></RouterProvider>;
};

export default App;
