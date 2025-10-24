import { ApiErrorResponse, RegisterSellerRequest, RegisterSellerResponse, SellerController } from '@/controller/seller';
import { Elysia } from 'elysia'


const app = new Elysia()
    .post("/register", ({ body }) => SellerController.registerSeller(body), {
        tags: ["Seller"],
        body: RegisterSellerRequest,
        response: {
            201: RegisterSellerResponse,
            500: ApiErrorResponse,
        }
    })

export default app;