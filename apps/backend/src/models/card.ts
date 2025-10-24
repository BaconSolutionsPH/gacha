import { db } from "@/models/db";
import { cardSchema, type ImageData } from "./schema";
import { eq, count, or, ilike, and, SQL } from "drizzle-orm";

export interface CreateCardInput {
  sellerId: string;
  name: string;
  description?: string;
  serialNumber?: string;
  category: string;
  images?: ImageData[];
  grade?: number;
  grader?: 'psa' | 'bgs' | 'cgc' | 'none';
}

export namespace CardModel {
  export const createCard = async (input: CreateCardInput) => {
    try {
      const [newCard] = await db
        .insert(cardSchema)
        .values({
          sellerId: input.sellerId,
          name: input.name,
          description: input.description,
          serialNumber: input.serialNumber,
          category: input.category,
          images: input.images,
          grade: input.grade,
          grader: input.grader,
        })
        .returning();

      return newCard;
    } catch (error) {
      console.error("Error creating card:", error);
      throw error;
    }
  };

  export const getCardById = async (cardId: string) => {
    try {
      const [card] = await db
        .select()
        .from(cardSchema)
        .where(eq(cardSchema.id, cardId))
        .limit(1);

      return card;
    } catch (error) {
      console.error("Error fetching card:", error);
      throw error;
    }
  };

  export const getCardsBySellerId = async (
    sellerId: string,
    offset: number = 0,
    limit: number = 10,
    search?: string
  ) => {
    try {
      const conditions: SQL[] = [eq(cardSchema.sellerId, sellerId)];

      if (search) {
        conditions.push(
          or(
            ilike(cardSchema.name, `%${search}%`),
            ilike(cardSchema.description, `%${search}%`),
            ilike(cardSchema.category, `%${search}%`),
            ilike(cardSchema.serialNumber, `%${search}%`)
          )!
        );
      }

      const whereClause = and(...conditions);

      const [totalResult] = await db
        .select({ count: count() })
        .from(cardSchema)
        .where(whereClause);

      const total = totalResult?.count || 0;

      if (total === 0) {
        return {
          cards: [],
          total: 0,
        };
      }

      const cards = await db
        .select()
        .from(cardSchema)
        .where(whereClause)
        .offset(offset)
        .limit(limit);

      return {
        cards,
        total,
      };
    } catch (error) {
      console.error("Error fetching seller cards:", error);
      throw error;
    }
  };

  export const getAllCards = async (
    offset: number = 0,
    limit: number = 10,
    search?: string
  ) => {
    try {
      let whereClause;

      if (search) {
        whereClause = or(
          ilike(cardSchema.name, `%${search}%`),
          ilike(cardSchema.description, `%${search}%`),
          ilike(cardSchema.category, `%${search}%`),
          ilike(cardSchema.serialNumber, `%${search}%`)
        );
      }

      const [totalResult] = await db
        .select({ count: count() })
        .from(cardSchema)
        .where(whereClause);

      const total = totalResult?.count || 0;

      if (total === 0) {
        return {
          cards: [],
          total: 0,
        };
      }

      const cards = await db
        .select()
        .from(cardSchema)
        .where(whereClause)
        .offset(offset)
        .limit(limit);

      return {
        cards,
        total,
      };
    } catch (error) {
      console.error("Error fetching all cards:", error);
      throw error;
    }
  };
}
