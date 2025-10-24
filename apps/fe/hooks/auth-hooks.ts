import { useState, useCallback, useEffect } from 'react'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { authApi, type LoginRequest, type User } from '@/lib/api'

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  error: string | null
  login: () => Promise<void>
  logout: () => void
  isConnected: boolean
  address: string | undefined
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token && address) {
      // Verify token is still valid by fetching user data
      authApi
        .getMe(token)
        .then((userData) => setUser(userData))
        .catch(() => {
          localStorage.removeItem('auth_token')
          setUser(null)
        })
    }
  }, [address])

  const login = useCallback(async () => {
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

      // Store token in localStorage
      localStorage.setItem('auth_token', response.token)
      setUser(response.user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [address, signMessageAsync])

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token')
    setUser(null)
    setError(null)
    disconnect()
  }, [disconnect])

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
