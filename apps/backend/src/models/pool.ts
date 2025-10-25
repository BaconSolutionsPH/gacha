import { db } from "@/models/db";
import { poolSchema, poolPrizes } from "./schema";
import { eq, count } from "drizzle-orm";

export interface CreatePoolPrize {
  cardId: string;
  quantity: number;
  price: number;
  rarity: 'common' | 'rare' | 'grail';
  holdUntilThreshold: boolean;
}

export interface CreatePoolInput {
  name: string;
  description?: string;
  tiers: Array<'bronze' | 'silver' | 'gold' | 'platinum' | 'class_a' | 'class_s' | 'class_s+'>;
  prizes: CreatePoolPrize[];
}

export interface UpdatePoolInput {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
  tiers?: Array<'bronze' | 'silver' | 'gold' | 'platinum' | 'class_a' | 'class_s' | 'class_s+'>;
  prizes?: CreatePoolPrize[];
}

export namespace PoolModel {
  export const createPool = async (input: CreatePoolInput) => {
    try {
      const [newPool] = await db
        .insert(poolSchema)
        .values({
          name: input.name,
          description: input.description,
          tiers: input.tiers,
        })
        .returning();

      if (input.prizes && input.prizes.length > 0 && newPool) {
        await db.insert(poolPrizes).values(
          input.prizes.map(prize => ({
            poolId: newPool.id,
            cardId: prize.cardId,
            quantity: prize.quantity,
            price: prize.price,
            rarity: prize.rarity,
            holdUntilThreshold: prize.holdUntilThreshold,
          }))
        );
      }

      return newPool!;
    } catch (error) {
      console.error("Error creating pool:", error);
      throw error;
    }
  };

  export const updatePool = async (poolId: string, input: UpdatePoolInput) => {
    try {
      const updateData: any = {};
      if (input.name !== undefined) updateData.name = input.name;
      if (input.description !== undefined) updateData.description = input.description;
      if (input.status !== undefined) updateData.status = input.status;
      if (input.tiers !== undefined) updateData.tiers = input.tiers;

      const [updatedPool] = await db
        .update(poolSchema)
        .set(updateData)
        .where(eq(poolSchema.id, poolId))
        .returning();

      if (!updatedPool) {
        throw new Error("Pool not found");
      }

      if (input.prizes !== undefined) {
        await db.delete(poolPrizes).where(eq(poolPrizes.poolId, poolId));

        if (input.prizes.length > 0) {
          await db.insert(poolPrizes).values(
            input.prizes.map(prize => ({
              poolId: poolId,
              cardId: prize.cardId,
              quantity: prize.quantity,
              price: prize.price,
              rarity: prize.rarity,
              holdUntilThreshold: prize.holdUntilThreshold,
            }))
          );
        }
      }

      return updatedPool;
    } catch (error) {
      console.error("Error updating pool:", error);
      throw error;
    }
  };

  export const updatePoolStatus = async (poolId: string, status: 'active' | 'inactive') => {
    try {
      const [updatedPool] = await db
        .update(poolSchema)
        .set({ status })
        .where(eq(poolSchema.id, poolId))
        .returning();

      if (!updatedPool) {
        throw new Error("Pool not found");
      }

      return updatedPool;
    } catch (error) {
      console.error("Error updating pool status:", error);
      throw error;
    }
  };

  export const getPoolById = async (poolId: string) => {
    try {
      const [pool] = await db
        .select()
        .from(poolSchema)
        .where(eq(poolSchema.id, poolId))
        .limit(1);

      if (!pool) {
        return null;
      }

      const prizes = await db
        .select()
        .from(poolPrizes)
        .where(eq(poolPrizes.poolId, poolId));

      return {
        ...pool,
        prizes,
      };
    } catch (error) {
      console.error("Error fetching pool:", error);
      throw error;
    }
  };

  export const getAllPools = async (offset: number = 0, limit: number = 10) => {
    try {
      const [totalResult] = await db
        .select({ count: count() })
        .from(poolSchema);

      const total = totalResult?.count || 0;

      if (total === 0) {
        return {
          pools: [],
          total: 0,
        };
      }

      const pools = await db
        .select()
        .from(poolSchema)
        .offset(offset)
        .limit(limit);

      const poolsWithPrizes = await Promise.all(
        pools.map(async (pool) => {
          const prizes = await db
            .select()
            .from(poolPrizes)
            .where(eq(poolPrizes.poolId, pool.id));

          return {
            ...pool,
            prizes,
          };
        })
      );

      return {
        pools: poolsWithPrizes,
        total,
      };
    } catch (error) {
      console.error("Error fetching all pools:", error);
      throw error;
    }
  };
}
