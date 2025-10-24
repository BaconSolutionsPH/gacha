'use client'

import type { ReactNode } from 'react'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { baseSepolia } from 'wagmi/chains'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http } from 'viem'
import { createConfig } from 'wagmi'

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
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
