import { status, t } from 'elysia'
import { PoolModel } from '@/models/pool';

export const PrizeSchema = t.Object({
    cardId: t.String(),
    quantity: t.Number(),
    price: t.Number(),
    rarity: t.Union([
        t.Literal('common'),
        t.Literal('rare'),
        t.Literal('grail')
    ]),
    holdUntilThreshold: t.Boolean(),
});

export const CreatePoolSchema = t.Object({
    name: t.String({ minLength: 1 }),
    description: t.Optional(t.String()),
    tiers: t.Array(t.Union([
        t.Literal('bronze'),
        t.Literal('silver'),
        t.Literal('gold'),
        t.Literal('platinum'),
        t.Literal('class_a'),
        t.Literal('class_s'),
        t.Literal('class_s+')
    ])),
    prizes: t.Array(PrizeSchema),
});

export const UpdatePoolSchema = t.Object({
    name: t.Optional(t.String({ minLength: 1 })),
    description: t.Optional(t.String()),
    status: t.Optional(t.Union([
        t.Literal('active'),
        t.Literal('inactive')
    ])),
    tiers: t.Optional(t.Array(t.Union([
        t.Literal('bronze'),
        t.Literal('silver'),
        t.Literal('gold'),
        t.Literal('platinum'),
        t.Literal('class_a'),
        t.Literal('class_s'),
        t.Literal('class_s+')
    ]))),
    prizes: t.Optional(t.Array(PrizeSchema)),
});

export const UpdatePoolStatusSchema = t.Object({
    status: t.Union([
        t.Literal('active'),
        t.Literal('inactive')
    ]),
});

export const PrizeResponse = t.Object({
    id: t.String(),
    poolId: t.String(),
    cardId: t.String(),
    quantity: t.Number(),
    price: t.Number(),
    rarity: t.String(),
    holdUntilThreshold: t.Union([t.Boolean(), t.Null()]),
    isClaimed: t.Union([t.Boolean(), t.Null()]),
    winnerAddress: t.Union([t.String(), t.Null()]),
    winnerTransactionId: t.Union([t.String(), t.Null()]),
    createdAt: t.Date(),
    updatedAt: t.Date(),
});

export const PoolResponse = t.Object({
    id: t.String(),
    name: t.String(),
    description: t.Union([t.String(), t.Null()]),
    status: t.Union([t.String(), t.Null()]),
    collectedAmount: t.Union([t.Number(), t.Null()]),
    tiers: t.Union([t.Array(t.String()), t.Null()]),
    escrowTxHash: t.Union([t.String(), t.Null()]),
    poolAddress: t.Union([t.String(), t.Null()]),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    prizes: t.Array(PrizeResponse),
});

export const PoolsListResponse = t.Object({
    pools: t.Array(PoolResponse),
    pagination: t.Object({
        total: t.Number(),
        hasNext: t.Boolean(),
        hasPrevious: t.Boolean(),
        offset: t.Number(),
        limit: t.Number(),
    }),
});

export const ApiErrorResponse = t.Object({
    message: t.String(),
});

export namespace PoolController {
    export async function createPool(
        userType: 'player' | 'seller' | 'admin',
        data: {
            name: string;
            description?: string;
            tiers: Array<'bronze' | 'silver' | 'gold' | 'platinum' | 'class_a' | 'class_s' | 'class_s+'>;
            prizes: Array<{
                cardId: string;
                quantity: number;
                price: number;
                rarity: 'common' | 'rare' | 'grail';
                holdUntilThreshold: boolean;
            }>;
        }
    ) {
        try {
            if (userType !== 'admin') {
                return status(403, { message: 'Forbidden: Only admins can create pools' });
            }

            const newPool = await PoolModel.createPool({
                name: data.name,
                description: data.description,
                tiers: data.tiers,
                prizes: data.prizes,
            });

            if (!newPool) {
                return status(500, { message: 'Failed to create pool' });
            }

            const poolWithPrizes = await PoolModel.getPoolById(newPool.id);

            return status(201, poolWithPrizes!);
        } catch (error: any) {
            console.error('Pool creation error:', error);
            return status(500, { message: error.message || 'Failed to create pool' });
        }
    }

    export async function updatePool(
        userType: 'player' | 'seller' | 'admin',
        poolId: string,
        data: {
            name?: string;
            description?: string;
            status?: 'active' | 'inactive';
            tiers?: Array<'bronze' | 'silver' | 'gold' | 'platinum' | 'class_a' | 'class_s' | 'class_s+'>;
            prizes?: Array<{
                cardId: string;
                quantity: number;
                price: number;
                rarity: 'common' | 'rare' | 'grail';
                holdUntilThreshold: boolean;
            }>;
        }
    ) {
        try {
            if (userType !== 'admin') {
                return status(403, { message: 'Forbidden: Only admins can update pools' });
            }

            await PoolModel.updatePool(poolId, data);

            const updatedPool = await PoolModel.getPoolById(poolId);

            if (!updatedPool) {
                return status(404, { message: 'Pool not found' });
            }

            return status(200, updatedPool);
        } catch (error: any) {
            console.error('Pool update error:', error);
            return status(500, { message: error.message || 'Failed to update pool' });
        }
    }

    export async function updatePoolStatus(
        userType: 'player' | 'seller' | 'admin',
        poolId: string,
        newStatus: 'active' | 'inactive'
    ) {
        try {
            if (userType !== 'admin') {
                return status(403, { message: 'Forbidden: Only admins can update pool status' });
            }

            const updatedPool = await PoolModel.updatePoolStatus(poolId, newStatus);

            if (!updatedPool) {
                return status(404, { message: 'Pool not found' });
            }

            const poolWithPrizes = await PoolModel.getPoolById(poolId);

            return status(200, poolWithPrizes!);
        } catch (error: any) {
            console.error('Pool status update error:', error);
            return status(500, { message: error.message || 'Failed to update pool status' });
        }
    }

    export async function getPoolById(poolId: string) {
        try {
            const pool = await PoolModel.getPoolById(poolId);

            if (!pool) {
                return status(404, { message: 'Pool not found' });
            }

            return status(200, pool);
        } catch (error: any) {
            console.error('Get pool error:', error);
            return status(500, { message: error.message || 'Failed to get pool' });
        }
    }

    export async function getPoolsList(
        offset: number = 0,
        limit: number = 10
    ) {
        try {
            const result = await PoolModel.getAllPools(offset, limit);

            const pagination = {
                total: result.total,
                hasNext: offset + limit < result.total,
                hasPrevious: offset > 0,
                offset,
                limit,
            };

            return status(200, {
                pools: result.pools,
                pagination,
            });
        } catch (error: any) {
            console.error('Get pools list error:', error);
            return status(500, { message: error.message || 'Failed to get pools list' });
        }
    }
}
