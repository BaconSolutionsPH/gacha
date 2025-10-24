// State management types for Zustand stores

import type { User } from './api'

export interface UserState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  authToken: string | null
}

export interface UserActions {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setAuthToken: (token: string | null) => void
  fetchUser: (token?: string) => Promise<void>
  clearUser: () => void
  reset: () => void
}

export type UserStore = UserState & UserActions
