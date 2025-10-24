import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/auth-hooks'
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet'
import AddCardDialog from './add-card-dialog'

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
      <Button variant="outline" disabled size="sm">
        Loading...
      </Button>
    )
  }

  // If user is authenticated, show sign out button
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={logout} size="sm">
          Sign Out
        </Button>
        <AddCardDialog />
        <Wallet />
      </div>
    )
  }

  // If wallet is connected but not authenticated, show sign in button
  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Button onClick={handleSignIn} disabled={isLoading} size="sm">
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
        <Wallet />
      </div>
    )
  }

  // If wallet not connected, show connect wallet button
  return <ConnectWallet />
}
