import { Elysia, t } from "elysia";
import {
    AuthController,
    LoginRequestSchema,
    LoginResponseSchema,
    UserSchema,
} from "@/controller/auth";

const app = new Elysia()
    .post("/auth/login", ({ body }) => AuthController.login(body), {
        tags: ["Authentication"],
        body: LoginRequestSchema,
        response: {
            200: LoginResponseSchema,
            400: t.Object({
                message: t.String(),
            }),
        },
    })
    .get(
        "/auth/nonce",
        async ({ body }) => AuthController.getNonce(body.address),
        {
            tags: ["Authentication"],
            body: t.Object({
                address: t.String(),
            }),
            response: t.Object({
                nonce: t.String(),
            }),
        },
    )
    .get(
        "/auth/me",
        ({ cookie: { Authentication } }) =>
            AuthController.getUser(Authentication?.value),
        {
            tags: ["Authentication"],
            cookie: t.Object({
                Authentication: t.String(),
            }),
            response: {
                200: UserSchema,
                400: t.Object({
                    message: t.String(),
                }),
            },
        },
    );
export default app;
