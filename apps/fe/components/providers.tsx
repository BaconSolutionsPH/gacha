'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { http } from 'viem'
import { createConfig, WagmiProvider } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { Toaster } from './ui/sonner'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
})

export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} chain={baseSepolia}>
          {props.children}
          <Toaster />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
