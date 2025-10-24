import jwt from 'jsonwebtoken';
import { envConfig } from './environment';
import { UserModel } from '@/models/user';
import { InferSelectModel } from 'drizzle-orm';
import { userSchema } from '@/models/schema';


export type User = InferSelectModel<typeof userSchema>;

export interface AuthUser {
  id: string;
  walletAddress: string;
  userType: 'player' | 'seller' | 'admin';
}

export const verifyAuthToken = (token: string): AuthUser | null => {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const getCurrentUser = async (authToken?: string): Promise<User | null> => {
  if (!authToken) {
    return null;
  }

  const decoded = verifyAuthToken(authToken);
  if (!decoded) {
    return null;
  }

  const userData = await UserModel.getUserOrCreateUser(decoded.walletAddress);

  if (!userData) {
    return null;
  }
  return userData;
};
