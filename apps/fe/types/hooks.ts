// React hook return types

import type { User } from './api'

export interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  error: string | null
  login: () => Promise<void>
  logout: () => void
  isConnected: boolean
  address: string | undefined
}

export interface UseUserReturn {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  fetchUser: () => Promise<void>
  clearUser: () => void
  refetch: () => Promise<void>
}
