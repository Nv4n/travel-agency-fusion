import { type Express, type Request, type Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "REST API Docs",
			version,
		},
		components: {
			securitySchemas: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./src/server/routers/**/*.ts", "./src/server/schemas/*Schema.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
	// Swagger page
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	// Docs in JSON format
	app.get("/docs.json", (req: Request, res: Response) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});

	console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
