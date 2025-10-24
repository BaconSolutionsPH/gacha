import * as p from 'drizzle-orm/pg-core'
import type { Hex } from 'viem'

export const userSchema = p.pgTable('users', {
    id: p.uuid().primaryKey().defaultRandom(),
    walletAddress: p.text().notNull().unique().$type<Hex>(),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
    tier: p.text({ enum: ['bronze', 'silver', 'gold', 'platinum', 'class_a', 'class_s', 'class_s+'] }).default('bronze')
})
