import * as p from 'drizzle-orm/pg-core'
import type { Hex } from 'viem'

export const userSchema = p.pgTable('users', {
    id: p.uuid().primaryKey().defaultRandom(),
    walletAddress: p.text().notNull().unique().$type<Hex>(),
    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
})

