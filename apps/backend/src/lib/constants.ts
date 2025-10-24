import { RedisClient, S3Client } from 'bun'
import { envConfig } from "@/lib/environment"
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

export const serverRedisClient = new RedisClient(envConfig.SERVER_REDIS_CACHE_URL)

export const publicClient = createPublicClient({
    transport: http(envConfig.BASE_RPC_URL),
    chain: base,
});
export const s3client = new S3Client({
    region: "ap-southeast-1",
    secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
    accessKeyId: envConfig.AWS_ACCESS_KEY,
    bucket: envConfig.BUCKET_NAME
})
