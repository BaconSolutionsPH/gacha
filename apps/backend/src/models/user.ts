import { db } from "@/models/db"
import { userSchema } from "./schema"
import { eq } from "drizzle-orm"
import { getAddress } from "viem"

export namespace UserModel {
    export const getUserOrCreateUser = async (walletAddress: string) => {
        const [userData] = await db
            .select()
            .from(userSchema)
            .where(eq(userSchema.walletAddress, getAddress(walletAddress)))
            .limit(1)
        if (userData) {
            return userData
        }
        const newUser = await db.insert(userSchema).values({
            walletAddress: getAddress(walletAddress)
        })
        return newUser?.[0]
    }
}