import type { LoginRequest, LoginResponse, NonceResponse, User } from '@/types/api'
import type { CardsListResponse, CardListQuery } from '@/types/card'
import { mockCardsListResponse, mockCards } from './mock-data'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Re-export types for backward compatibility
export type { LoginRequest, LoginResponse, NonceResponse, User }

export const authApi = {
  async getNonce(address: string): Promise<NonceResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/nonce?address=${encodeURIComponent(address)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to get nonce')
    }

    return response.json()
  },

  async login(loginData: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    return response.json()
  },

  async getMe(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `Authentication=${token}`,
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to get user data')
    }

    return response.json()
  },
}

// Helper function to check if user is authenticated
function isAuthenticated(): boolean {
  // For now, we'll assume not authenticated if we can't access cookies
  // In a real app, you'd check for authentication tokens
  return false
}

export const cardsApi = {
  async getCards(query: CardListQuery = {}): Promise<CardsListResponse> {
    // Use mock data if not authenticated
    if (!isAuthenticated()) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      let filteredCards = mockCardsListResponse.cards

      // Apply search filter if provided
      if (query.search) {
        const searchTerm = query.search.toLowerCase()
        filteredCards = mockCardsListResponse.cards.filter(
          (card) =>
            card.name.toLowerCase().includes(searchTerm) ||
            card.description?.toLowerCase().includes(searchTerm) ||
            card.category.toLowerCase().includes(searchTerm) ||
            card.serialNumber?.toLowerCase().includes(searchTerm),
        )
      }

      // Apply pagination
      const offset = query.offset || 0
      const limit = query.limit || 10
      const paginatedCards = filteredCards.slice(offset, offset + limit)

      return {
        cards: paginatedCards,
        pagination: {
          total: filteredCards.length,
          hasNext: offset + limit < filteredCards.length,
          hasPrevious: offset > 0,
          offset,
          limit,
        },
      }
    }

    // Real API call when authenticated
    const searchParams = new URLSearchParams()

    if (query.offset !== undefined) searchParams.set('offset', query.offset.toString())
    if (query.limit !== undefined) searchParams.set('limit', query.limit.toString())
    if (query.search) searchParams.set('search', query.search)

    const url = `${API_BASE_URL}/api/card/list${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store', // Ensure fresh data for server components
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch cards')
    }

    return response.json()
  },

  async getCardById(id: string) {
    // Use mock data if not authenticated
    if (!isAuthenticated()) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const card = mockCards.find((c) => c.id === id)
      if (!card) {
        throw new Error('Card not found')
      }

      return card
    }

    // Real API call when authenticated
    const response = await fetch(`${API_BASE_URL}/api/card/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch card')
    }

    return response.json()
  },
}
