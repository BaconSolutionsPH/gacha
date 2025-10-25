import { Elysia, status, t } from 'elysia'
import { getCurrentUser } from '@/lib/auth'
import { PoolController, CreatePoolSchema, UpdatePoolSchema, UpdatePoolStatusSchema, PoolResponse, PoolsListResponse, ApiErrorResponse } from '@/controller/pool'

const app = new Elysia()
    .post("/create", async ({ cookie: { Authentication }, body }) => {
        const authToken = Authentication?.value as string | undefined;

        const user = await getCurrentUser(authToken);
        if (!user) {
            return status(401, { message: 'Authentication failed.' })
        }

        if (!user.userType) {
            return status(403, { message: 'User type is required' })
        }

        return PoolController.createPool(user.userType, body);
    }, {
        tags: ["Pool"],
        body: CreatePoolSchema,
        response: {
            201: PoolResponse,
            403: ApiErrorResponse,
            500: ApiErrorResponse,
        }
    })
    .put("/:id", async ({ cookie: { Authentication }, params, body }) => {
        const authToken = Authentication?.value as string | undefined;

        const user = await getCurrentUser(authToken);
        if (!user) {
            return status(401, { message: 'Authentication failed.' })
        }

        if (!user.userType) {
            return status(403, { message: 'User type is required' })
        }

        return PoolController.updatePool(user.userType, params.id, body);
    }, {
        tags: ["Pool"],
        params: t.Object({
            id: t.String()
        }),
        body: UpdatePoolSchema,
        response: {
            200: PoolResponse,
            401: ApiErrorResponse,
            403: ApiErrorResponse,
            404: ApiErrorResponse,
            500: ApiErrorResponse,
        }
    })
    .patch("/:id/status", async ({ cookie: { Authentication }, params, body }) => {
        const authToken = Authentication?.value as string | undefined;

        const user = await getCurrentUser(authToken);
        if (!user) {
            return status(401, { message: 'Authentication failed.' })
        }

        if (!user.userType) {
            return status(403, { message: 'User type is required' })
        }

        return PoolController.updatePoolStatus(user.userType, params.id, body.status);
    }, {
        tags: ["Pool"],
        params: t.Object({
            id: t.String()
        }),
        body: UpdatePoolStatusSchema,
        response: {
            200: PoolResponse,
            401: ApiErrorResponse,
            403: ApiErrorResponse,
            404: ApiErrorResponse,
            500: ApiErrorResponse,
        }
    })
    .get("/list", async ({ cookie: { Authentication }, query }) => {
        const authToken = Authentication?.value as string | undefined;

        const user = await getCurrentUser(authToken);
        if (!user) {
            return status(401, { message: 'Authentication failed.' })
        }

        const offset = query.offset ?? 0;
        const limit = query.limit ?? 10;

        return PoolController.getPoolsList(offset, limit);
    }, {
        tags: ["Pool"],
        query: t.Object({
            offset: t.Optional(t.Numeric()),
            limit: t.Optional(t.Numeric()),
        }),
        response: {
            200: PoolsListResponse,
            401: ApiErrorResponse,
            500: ApiErrorResponse,
        }
    })
    .get("/:id", async ({ cookie: { Authentication }, params }) => {
        const authToken = Authentication?.value as string | undefined;

        const user = await getCurrentUser(authToken);
        if (!user) {
            return status(401, { message: 'Authentication failed.' })
        }

        return PoolController.getPoolById(params.id);
    }, {
        tags: ["Pool"],
        params: t.Object({
            id: t.String()
        }),
        response: {
            200: PoolResponse,
            401: ApiErrorResponse,
            404: ApiErrorResponse,
            500: ApiErrorResponse,
        }
    })
export default app