import { Elysia } from "elysia";
import authRoutes from "./auth";

const app = new Elysia().use(authRoutes);

export default app;
