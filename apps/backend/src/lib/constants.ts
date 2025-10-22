import { RedisClient } from 'bun'
import { envConfig } from "@/lib/environment"
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import jwt from "jsonwebtoken"

export const serverRedisClient = new RedisClient(envConfig.SERVER_REDIS_CACHE_URL)

export const publicClient = createPublicClient({
    transport: http(envConfig.BASE_RPC_URL),
    chain: base,
});
