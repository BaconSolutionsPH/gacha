import { z } from 'zod'

const evnSchema = z.object({
    NODE_ENV: z.union([
        z.literal('development'),
        z.literal('production'),
        z.literal('test')
    ]).default('development'),
    BASE_RPC_URL: z.url(),
    SERVER_REDIS_CACHE_URL: z.url(),
    JWT_SECRET: z.string().default('supersecret'),
    DATABASE_URL: z.url()
})

export const envConfig = evnSchema.parse(process.env)