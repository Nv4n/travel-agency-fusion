import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Hotels } from "../pages/Hotels";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Hotels></Hotels>}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
