import React from 'react'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/auth-hooks'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'
import { Address, Avatar, Name } from '@coinbase/onchainkit/identity'

export default function SignInButton() {
  const { login, isLoading, error, user, isConnected, address, logout } = useAuth()

  const handleSignIn = async () => {
    try {
      await login()
    } catch (err) {
      console.error('Sign in failed:', err)
    }
  }

  // If user is authenticated, show user info and logout
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6" />
        <div className="flex flex-col">
          <Name className="text-sm font-medium" />
          <Address className="text-xs text-gray-500" />
        </div>
        <Button variant="outline" onClick={logout} size="sm">
          Sign Out
        </Button>
      </div>
    )
  }

  // If wallet is connected but not authenticated, show sign in button
  if (isConnected && address) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6" />
          <Address className="text-sm" />
        </div>
        <Button onClick={handleSignIn} disabled={isLoading} className="w-full">
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  }

  // If wallet is not connected, show connect wallet button
  return (
    <ConnectWallet disconnectedLabel="Connect Wallet">
      <Avatar className="h-6 w-6" />
      <Name className="text-white" />
    </ConnectWallet>
  )
}
