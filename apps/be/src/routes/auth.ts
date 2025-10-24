import { Elysia, t } from "elysia";
import {
    AuthController,
    BadRequestSchema,
    GetNonceRequestSchema,
    LoginRequestSchema,
    LoginResponseSchema,
    NonceResponseSchema,
    UserSchema,
} from "@/controller/auth";


const app = new Elysia()
    .post("/login", ({ body }) => AuthController.login(body), {
        tags: ["Authentication"],
        body: LoginRequestSchema,
        response: {
            200: LoginResponseSchema,
            400: BadRequestSchema,
        },
    })
    .get(
        "/nonce",
        async ({ query }) => AuthController.getNonce(query.address),
        {
            tags: ["Authentication"],
            query: GetNonceRequestSchema,
            response: {
                200: NonceResponseSchema,
            },
        },
    )
    .get(
        "/me",
        ({ cookie: { Authentication } }) =>
            AuthController.getUser(Authentication?.value),
        {
            tags: ["Authentication"],
            cookie: t.Object({
                Authentication: t.String(),
            }),
            response: {
                200: UserSchema,
                400: BadRequestSchema
            },
        },
    );
export default app;
