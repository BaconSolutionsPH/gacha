// API-related types for authentication and backend communication

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
