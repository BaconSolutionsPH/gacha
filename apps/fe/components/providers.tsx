'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { http } from 'viem'
import { createConfig, WagmiProvider } from 'wagmi'
import { base } from 'wagmi/chains'
import { Toaster } from './ui/sonner'
import { coinbaseWallet } from 'wagmi/connectors'

const queryClient = new QueryClient()

const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'onchainkit',
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
})

export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} chain={base}>
          {props.children}
          <Toaster />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
