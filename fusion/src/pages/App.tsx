import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/globals.css";

const App = () => {
	return <h1 className="text-9xl">hello world</h1>;
};

const container = document.getElementById("root");
if (!container) {
	throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(React.createElement(App));
