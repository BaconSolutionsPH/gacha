import { Elysia, status, t } from 'elysia'
import { getCurrentUser } from '@/lib/auth'
import { CardController, CreateCardSchema, CardResponse, ApiErrorResponse, CardsListResponse } from '@/controller/card'
import { UserModel } from '@/models/user';

const app = new Elysia()
    .post("/create", async ({ cookie: { Authentication }, body }) => {
        const authToken = Authentication?.value as string | undefined;

        const user = await getCurrentUser(authToken);
        if (!user) {
            return status(401, { message: 'Authentication failed.' })
        }

        if (user.userType !== 'seller') {
            return status(403, { message: 'Forbidden' })
        }

        return CardController.createCard(user.id, {
            name: body.name,
            description: body.description,
            serialNumber: body.serialNumber,
            category: body.category,
            grade: body.grade,
            grader: body.grader,
            images: body.images,
        });
    }, {
        tags: ["Cards"],
        type: 'multipart/form-data',
        body: CreateCardSchema,
        response: {
            201: CardResponse,
            400: ApiErrorResponse,
            500: ApiErrorResponse,
        }
    })
    .get("/list", async ({ cookie: { Authentication }, query }) => {
        const authToken = Authentication?.value as string | undefined;

        const user = await getCurrentUser(authToken);
        if (!user) {
            return status(401, { message: 'Authentication failed.' })
        }

        if (!user.userType) {
            return status(403, { message: 'User type is required' })
        }

        const offset = query.offset ?? 0;
        const limit = query.limit ?? 10;
        const search = query.search;

        return CardController.getCardsList(user.userType, user.id, offset, limit, search);
    }, {
        tags: ["Cards"],
        query: t.Object({
            offset: t.Optional(t.Numeric()),
            limit: t.Optional(t.Numeric()),
            search: t.Optional(t.String()),
        }),
        response: {
            200: CardsListResponse,
            401: ApiErrorResponse,
            403: ApiErrorResponse,
            500: ApiErrorResponse,
        }
    })
    .get("/:id", async ({ params, cookie: { Authentication } }) => {
        const authToken = Authentication?.value as string | undefined;

        const user = await getCurrentUser(authToken);
        if (!user) {
            return status(401, { message: 'Authentication failed.' })
        }

        return CardController.getCardById(params.id);
    }, {
        tags: ["Cards"],
        params: t.Object({
            id: t.String()
        }),
        response: {
            200: CardResponse,
            401: ApiErrorResponse,
            404: ApiErrorResponse,
            500: ApiErrorResponse,
        }
    })
export default app