import { Elysia } from "elysia";
import { autoload } from "elysia-autoload";
import { initializeLogger, logger } from "@rasla/logify";
import openapi from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors";
import { envConfig } from "./lib/environment";

initializeLogger({
  console: true,
  file: false,
  format: "[{timestamp}] {level} - {message} - {method} {path}{ip}",
  includeIp: true,
  useGlobal: true,
});

new Elysia()
  .use(
    cors({
      origin: true, // Allow all origins in development
      credentials: true, // Allow cookies/credentials
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
)
  //@ts-ignore
  .use(logger())
  .use(
    await autoload({
      dir: "./routes",
      prefix: "/api",
      types: {
        output: "./types/routes.ts",
        typeName: "APIRoutes",
        useExport: true,
      },
      ignore: ["**/*.test.ts", "**/*.spec.ts"],
    })
  )
  .use(
    openapi({
      enabled: envConfig.NODE_ENV !== "production",
      documentation: {
        info: {
          title: "Gatcha Backend API",
          description: "API documentation for Gatcha Backend",
          version: "1.0.0",
        },
      },
    })
)
  .get("/", () => "OK", { tags: ["Healthcheck"] })
  .onStart((app) => {
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  })
  .listen(3001);
