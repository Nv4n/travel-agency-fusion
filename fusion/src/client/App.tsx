import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Hotels } from "../pages/Hotels";
import { LoginForm } from "../components/Forms/LoginForm";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Hotels></Hotels>}></Route>
				<Route path="/login" element={<LoginForm></LoginForm>}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
