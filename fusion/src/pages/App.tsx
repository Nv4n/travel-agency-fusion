import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/globals.css";
import { Hotels } from "./Hotels";

const App = () => {
	return <Hotels></Hotels>;
};

const container = document.getElementById("root");
if (!container) {
	throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(React.createElement(App));
