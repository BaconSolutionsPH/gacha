import { db } from "@/models/db";
import { userSchema } from "./schema";
import { eq } from "drizzle-orm";
import { getAddress } from "viem";
import { envConfig } from "@/lib/environment";

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

      // Check if wallet is an admin address
      const isAdmin = envConfig.ADMIN_WALLET_ADDRESS.some(
        (adminAddr) => adminAddr.toLowerCase() === normalizedAddress.toLowerCase()
      );

      // Create new user if not found
      const [newUser] = await db
        .insert(userSchema)
        .values({
          walletAddress: normalizedAddress,
          userType: isAdmin ? "admin" : "player", // Admin if in list, otherwise player
        })
        .returning();

      return newUser;
    } catch (error) {
      console.error("Error in getUserOrCreateUser:", error);
      throw error;
    }
  };
}
