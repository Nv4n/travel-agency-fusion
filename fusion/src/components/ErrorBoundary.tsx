import { Component, type ErrorInfo, type ReactElement } from "react";
import { Link } from "react-router-dom";

export class ErrorBoundary extends Component<{ children: ReactElement }> {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("ErrorBoundary caught an error", error, info);
	}
	render() {
		if (this.state.hasError) {
			return (
				<h2>
					There was an error site. <Link to="/">Click here</Link> to
					go back to home page.
				</h2>
			);
		}

		return this.props.children;
	}
}
