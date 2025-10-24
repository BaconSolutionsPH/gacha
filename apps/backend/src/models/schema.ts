import * as p from 'drizzle-orm/pg-core'
import type { Hex } from 'viem'

export const userSchema = p.pgTable('users', {
    id: p.uuid().primaryKey().defaultRandom(),
    walletAddress: p.text().notNull().unique(),
    tier: p.text({ enum: ['bronze', 'silver', 'gold', 'platinum', 'class_a', 'class_s', 'class_s+'] }).default('bronze'),
    userType: p.text({ enum: ['player', 'seller', 'admin'] }).notNull(),
    isVerified: p.boolean().default(false),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})

export const sellerSchema = p.pgTable('sellers', {
    id: p.uuid().primaryKey().defaultRandom(),
    storeName: p.text().notNull(),
    walletAddress: p.text().notNull().unique(),
    isVerified: p.boolean().default(false),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
}) 

export const cardSchema = p.pgTable('cards', {
    id: p.uuid().primaryKey().defaultRandom(),
    sellerId: p.uuid().notNull().references(() => sellerSchema.id),
    name: p.text().notNull(),
    description: p.text(),
    serialNumber: p.text(),
    images: p.jsonb().$type<string[]>(),
    tiers: p.text().$type<Array<'bronze' | 'silver' | 'gold' | 'platinum' | 'class_a' | 'class_s' | 'class_s+'>>(),
    threshold: p.numeric({ mode: "number", precision: 18, scale: 2 }).notNull(),
    collectedAmount: p.numeric({ mode: "number", precision: 18, scale: 2 }).default(0),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})