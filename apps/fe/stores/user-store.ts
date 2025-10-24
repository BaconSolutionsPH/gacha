import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '@/lib/api'
import type { UserState, UserStore } from '@/types'

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  authToken: null,
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        })
      },

      setLoading: (isLoading) => {
        set({ isLoading })
      },

      setError: (error) => {
        set({ error, isLoading: false })
      },

      setAuthToken: (token) => {
        set({ authToken: token })
      },

      fetchUser: async (token) => {
        const { setLoading, setError, setUser, authToken } = get()
        const tokenToUse = token || authToken

        if (!tokenToUse) {
          setError('No authentication token available')
          return
        }

        setLoading(true)
        setError(null)

        try {
          const user = await authApi.getMe(tokenToUse)
          setUser(user)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user data'
          setError(errorMessage)
          setUser(null)
          // Clear token if it's invalid
          if (error instanceof Error && error.message.includes('Failed to get user data')) {
            get().setAuthToken(null)
          }
        } finally {
          setLoading(false)
        }
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        })
        get().setAuthToken(null)
      },

      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken,
      }),
    },
  ),
)
