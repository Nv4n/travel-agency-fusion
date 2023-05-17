import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
	throw new Error("Root couldn't be found");
}
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
