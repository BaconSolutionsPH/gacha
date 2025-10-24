import { Elysia } from 'elysia'

const app = new Elysia()
    .post("/create", ({ body }) => {

    }, {
        tags: ["Cards"]
    })
export default app