import { db } from "@/models/db";
import { userSchema } from "./schema";
import { eq } from "drizzle-orm";
import { getAddress } from "viem";

export namespace UserModel {
  export const getUserOrCreateUser = async (walletAddress: string) => {
    try {
      // Normalize the address using viem
      const normalizedAddress = getAddress(walletAddress);

      // Try to find existing user
      const [userData] = await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.walletAddress, normalizedAddress))
        .limit(1);

      if (userData) {
        return userData;
      }

      // Create new user if not found
      const [newUser] = await db
        .insert(userSchema)
        .values({
          walletAddress: normalizedAddress,
        })
        .returning();

      return newUser;
    } catch (error) {
      console.error("Error in getUserOrCreateUser:", error);
      throw error;
    }
  };
}
