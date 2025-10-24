import { Elysia, t } from "elysia";
import {
  AuthController,
  LoginRequestSchema,
  LoginResponseSchema,
  UserSchema,
  BadRequestResponseSchema,
  GetNonceSchema,
  GenerateNonceResponse
} from "@/controller/auth";

const app = new Elysia()
  .post("/login", ({ body }) => AuthController.login(body), {
    tags: ["Authentication"],
    body: LoginRequestSchema,
    response: {
      200: LoginResponseSchema,
      400: BadRequestResponseSchema
    },
  })
  .get(
    "/nonce",
    async ({ query }) => AuthController.getNonce(query.address),
    {
      tags: ["Authentication"],
      query: GetNonceSchema,
      response: {
        200: GenerateNonceResponse,
        400: BadRequestResponseSchema
      },
    }
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
        400: BadRequestResponseSchema
      },
    }
  );
export default app;
