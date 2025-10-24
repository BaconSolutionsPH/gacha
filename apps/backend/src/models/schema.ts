import * as p from 'drizzle-orm/pg-core'
import type { Hex } from 'viem'

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
    cardId: p.uuid().notNull().references(() => cardSchema.id),
    threshold: p.numeric({ mode: "number", precision: 18, scale: 2 }).notNull(),
    collectedAmount: p.numeric({ mode: "number", precision: 18, scale: 2 }).default(0),
    tiers: p.text().$type<Array<'bronze' | 'silver' | 'gold' | 'platinum' | 'class_a' | 'class_s' | 'class_s+'>>(),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})