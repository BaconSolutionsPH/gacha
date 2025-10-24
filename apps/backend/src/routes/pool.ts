import { Elysia } from 'elysia'

const app = new Elysia()
    .post("/create", () => { },
        {
            tags: ["Pool"], 
        })
export default app