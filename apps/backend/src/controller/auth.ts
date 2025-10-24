import { publicClient, serverRedisClient } from "@/lib/constants"
import { generateNonce, SiweMessage } from 'siwe';
import { t, status } from 'elysia'
import { createPublicClient, Hex, http } from "viem";
import jwt from 'jsonwebtoken';
import { envConfig } from "@/lib/environment";
import { UserModel } from "@/models/user";
export const GenerateNonceResponse = t.Object({
    nonce: t.String()
})
export const GetNonceSchema = t.Object({
    address: t.String(),
})
export const BadRequestResponseSchema = t.Object({
    message: t.String()
})

export const LoginRequestSchema = t.Object({
    address: t.String(),
    message: t.Object({
        address: t.String(),
        chainId: t.Number(),
        domain: t.String(),
        issuedAt: t.String(),
        nonce: t.String(),
        statement: t.String(),
        uri: t.String(),
        version: t.String(),
    }),
    signature: t.String()
})
export const LoginResponseSchema = t.Object({
    user: t.Object({
        id: t.String(),
        walletAddress: t.String()
    }),
    token: t.String()
})
export const UserSchema = t.Object({
    id: t.String(),
    walletAddress: t.String()
})
export namespace AuthController {

    export const login = async (params: typeof LoginRequestSchema['static']) => {
        const storedNonce = await serverRedisClient.get(`nonce-${params.address}`)
        if (!storedNonce) {
            return status(400, { message: 'Nonce not found. Please request a new nonce.' })
        }
        const siweMessage = new SiweMessage({
            ...params.message,
            nonce: storedNonce
        } as SiweMessage)
        if (siweMessage.nonce !== storedNonce) {
            return status(400, { message: 'Invalid nonce.' })
        }
        const isValid = await publicClient.verifyMessage({
            address: siweMessage.address as Hex,
            message: siweMessage.prepareMessage(),
            signature: params.signature as Hex
        });
        if (!isValid) {
            return status(400, { message: 'Invalid signature.' })
        }
        await serverRedisClient.del(`nonce-${params.address}`)
        const userData = await UserModel.getUserOrCreateUser(params.address)
        if (!userData) {
            return status(400, { message: 'Failed to create or retrieve user.' })
        }
        const jwtToken = jwt.sign(userData, envConfig.JWT_SECRET, { expiresIn: "7d" })
        return status(200, {
            user: userData,
            token: jwtToken
        })
    }

    export const getNonce = async (walletAddress: string) => {
        const cacheNonce = await serverRedisClient.get(`nonce-${walletAddress}`)
        if (cacheNonce) return status(200, { nonce: cacheNonce })
        const generatedNonce = generateNonce()
        await serverRedisClient.setex(`nonce-${walletAddress}`, 60 * 5, generatedNonce)
        return status(200, { nonce: generatedNonce })
    }

    export const getUser = async (authToken?: string) => {
        if (!authToken) {
            return status(400, { message: 'Authentication token is required.' })
        }
        const jwtToken = jwt.verify(authToken, envConfig.JWT_SECRET) as (typeof LoginResponseSchema['static']['user'] | null)
        if (!jwtToken) {
            return status(400, { message: 'Invalid token.' })
        }
        const userData = await UserModel.getUserOrCreateUser(jwtToken.walletAddress)
        if (!userData) {
            return status(400, { message: 'User not found.' })
        }
        return status(200, userData)
    }
}