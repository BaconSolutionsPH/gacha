import { useState, useEffect } from 'react'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { authApi } from '@/lib/api'
import { useUserStore } from '@/stores'
import type { LoginRequest, UseAuthReturn } from '@/types'

export const useAuth = (): UseAuthReturn => {
  const { user, setUser, clearUser, setAuthToken, fetchUser, authToken } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  // Check for existing auth token on mount
  useEffect(() => {
    if (authToken && address && !user) {
      // Fetch user data using stored token
      fetchUser()
    }
  }, [address, user, fetchUser, authToken])

  const login = async () => {
    if (!address) {
      setError('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get nonce from backend
      const { nonce } = await authApi.getNonce(address)

      // Create SIWE message
      const domain = window.location.host
      const origin = window.location.origin
      const statement = 'Sign in with Ethereum to the app.'
      const chainId = 84532 // Base Sepolia chain ID
      const issuedAt = new Date().toISOString()

      const message = {
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId,
        nonce,
        issuedAt,
      }

      // Prepare message for signing
      const messageToSign = `${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${origin}
Version: 1
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}`

      // Sign the message using OnchainKit/Wagmi
      const signature = await signMessageAsync({
        message: messageToSign,
      })

      // Send login request to backend
      const loginData: LoginRequest = {
        address,
        message,
        signature,
      }

      const response = await authApi.login(loginData)

      // Store token in store and localStorage
      setAuthToken(response.token)
      setUser(response.user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Always clear user session first
    clearUser() // This will also clear the token from store and localStorage
    setError(null)

    // Try to disconnect wallet, but don't fail if it doesn't work
    if (isConnected) {
      try {
        disconnect()
      } catch (err) {
        console.warn('Failed to disconnect wallet:', err)
        // User session is already cleared, so logout is successful
        // User can manually disconnect wallet if needed
      }
    }
  }

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isConnected,
    address,
  }
}
