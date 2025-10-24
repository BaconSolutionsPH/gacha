import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/auth-hooks'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'

export default function SignInButton() {
  const { login, isLoading, user, logout, isConnected } = useAuth()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  const handleSignIn = async () => {
    try {
      await login()
    } catch (err) {
      console.error('Sign in failed:', err)
    }
  }

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <Button variant="outline" disabled size="sm" className="border-gray-300">
        Loading...
      </Button>
    )
  }

  // If user is authenticated, show sign out button
  if (user) {
    return (
      <Button variant="outline" onClick={logout} size="sm">
        Sign Out
      </Button>
    )
  }

  // If wallet is connected but not authenticated, show sign in button
  if (isConnected) {
    return (
      <Button variant="outline" onClick={handleSignIn} disabled={isLoading} size="sm" className="border-gray-300">
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    )
  }

  // If wallet not connected, show connect wallet button
  return <ConnectWallet />
}
