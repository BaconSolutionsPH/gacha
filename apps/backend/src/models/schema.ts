import * as p from 'drizzle-orm/pg-core'
import { rpcTransactionType, type Hex } from 'viem'

export type ImageData = {
    filename: string;
    url: string;
}

export interface SellerMetaData {
    storeName: string,
    isVerified: boolean
}
export const userSchema = p.pgTable('users', {
    id: p.uuid().primaryKey().defaultRandom(),
    walletAddress: p.text().notNull().unique(),
    tier: p.text({ enum: ['bronze', 'silver', 'gold', 'platinum', 'class_a', 'class_s', 'class_s+'] }).default('bronze'),
    userType: p.text({ enum: ['player', 'seller', 'admin'] }).default('player'),
    isVerified: p.boolean().default(false),
    sellerMetadata: p.jsonb().$type<SellerMetaData>(),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})

export const userPointsSchema = p.pgTable('user_points', {
    id: p.uuid().primaryKey().defaultRandom(),
    userId: p.uuid().notNull().references(() => userSchema.id),
    points: p.integer().default(0).notNull(),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})

export const cardSchema = p.pgTable('cards', {
    id: p.uuid().primaryKey().defaultRandom(),
    sellerId: p.uuid().notNull().references(() => userSchema.id),
    name: p.text().notNull(),
    description: p.text(),
    serialNumber: p.text(),
    category: p.text().notNull(),
    images: p.jsonb().$type<ImageData[]>(),
    grade: p.numeric({ mode: "number", precision: 5, scale: 2 }),
    grader: p.text({ enum: ['psa', 'bgs', 'cgc', 'none'] }),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})

export const poolSchema = p.pgTable('pools', {
    id: p.uuid().primaryKey().defaultRandom(),
    name: p.text().notNull(),
    description: p.text(),
    status: p.text({ enum: ['active', 'inactive'] }).default('active'),
    collectedAmount: p.numeric({ mode: "number", precision: 18, scale: 2 }).default(0),
    tiers: p.jsonb().$type<Array<'bronze' | 'silver' | 'gold' | 'platinum' | 'class_a' | 'class_s' | 'class_s+'>>(),
    escrowTxHash: p.text(),
    poolAddress: p.text(),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})

export const poolPrizes = p.pgTable('pool_prizes', {
    id: p.uuid().primaryKey().defaultRandom(),
    poolId: p.uuid().notNull().references(() => poolSchema.id),
    cardId: p.uuid().notNull().references(() => cardSchema.id),
    quantity: p.integer().notNull(),
    price: p.numeric({ mode: "number", precision: 18, scale: 2 }).notNull(),
    rarity: p.text({ enum: ['common', 'rare', 'grail'] }).notNull(),
    holdUntilThreshold: p.boolean().default(false),
    isClaimed: p.boolean().default(false),
    winnerAddress: p.text(),
    winnerTransactionId: p.uuid().references(() => spinTransactionSchema.id),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})

export const spinTransactionSchema = p.pgTable('spin_transactions', {
    id: p.uuid().primaryKey().defaultRandom(),
    poolId: p.uuid().notNull().references(() => poolSchema.id),
    userId: p.uuid().notNull().references(() => userSchema.id),
    amountInUsd: p.numeric({ mode: "number", precision: 18, scale: 2 }).notNull(),
    tx_hash: p.text().notNull(),
    tokenAddress: p.text(),
    walletAddress: p.text(),
    prizeType: p.text({ enum: ['card', 'points'] }),
    winningPoints: p.integer(),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})
