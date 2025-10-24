
import { db } from '@/models/db'
import { sellerSchema } from '@/models/schema'
import { status, t } from 'elysia';
import { getAddress } from 'viem';


export const RegisterSellerRequest = t.Object({
    storeName: t.String(),
    walletAddress: t.String()
})

export const RegisterSellerResponse = t.Object({
    storeName: t.String(),
    walletAddress: t.String(),
    isVerified: t.Boolean().nullable(),
    id: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
})
export const ApiErrorResponse = t.Object({
    message: t.String(),
})



export namespace SellerController {
    export async function registerSeller(newSeller: Omit<typeof sellerSchema.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
        try {
            const [seller] = await db.insert(sellerSchema).values({
                ...newSeller,
                walletAddress: getAddress(newSeller.walletAddress)
            }).returning();
            if (!seller) return status(500, { message: 'Failed to register seller' });
            return status(201, { seller });
        } catch (_e) {
            return status(500, { message: 'Failed to register seller' });
        }
    }
}   