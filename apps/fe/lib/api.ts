const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface LoginRequest {
  address: string
  message: {
    address: string
    chainId: number
    domain: string
    issuedAt: string
    nonce: string
    statement: string
    uri: string
    version: string
  }
  signature: string
}

export interface LoginResponse {
  user: {
    id: string
    walletAddress: string
  }
  token: string
}

export interface NonceResponse {
  nonce: string
}

export interface User {
  id: string
  walletAddress: string
}

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
