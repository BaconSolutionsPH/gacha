
import { db } from '@/models/db'
import { userSchema } from '@/models/schema'
import { eq } from 'drizzle-orm';
import { status, t } from 'elysia';
import { getAddress } from 'viem';

export const RegisterSellerRequest = t.Object({
    storeName: t.String(),
    walletAddress: t.String()
})

export const RegisterSellerResponse = t.Object({
    storeName: t.String(),
    walletAddress: t.String(),
    isVerified: t.Boolean(),
    id: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
})
export const ApiErrorResponse = t.Object({
    message: t.String(),
})

export namespace SellerController {
    export async function registerSeller(newSeller: typeof RegisterSellerRequest['static']) {
        try {
            const [seller] = await db.insert(userSchema).values({
                userType: "seller",
                sellerMetadata: {
                    storeName: newSeller.storeName,
                    isVerified: false
                },
                walletAddress: getAddress(newSeller.walletAddress)
            }).returning();
            if (!seller) return status(500, { message: 'Failed to register seller' });
            return status(201, { seller });
        } catch (_e) {
            return status(500, { message: 'Failed to register seller' });
        }
    }
}   