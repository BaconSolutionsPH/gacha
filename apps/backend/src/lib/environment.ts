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
    DATABASE_URL: z.url(),
    BASE_URL: z.string().url().default('http://localhost:3001'),
    ADMIN_WALLET_ADDRESS: z.string()
        .default('')
        .transform((val) => val ? val.split(',').map(addr => addr.trim()) : []),
    // S3 Configuration (optional for development)
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_REGION: z.string().optional(),
    AWS_S3_BUCKET_NAME: z.string().optional(),
    AWS_CDN_URL: z.string().url().optional()
})

export const envConfig = evnSchema.parse(process.env)