import React from 'react'
import HeroSpinCTA from './hero-spin-cta'

export default function Hero() {
  return (
    <div className="flex max-w-(--breakpoint-2xl) flex-col items-center justify-between gap-10 px-4 py-10 lg:mx-20 lg:flex-row lg:py-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight lg:text-6xl">
          Spin the Vault, <br className="hidden lg:block" />
          Unlock the Rare, <br className="hidden lg:block" />
          Own the Grail.
        </h1>
        <p className="text-muted-foreground text-lg font-medium lg:text-3xl">Spin. Win. Own real graded cards.</p>
      </div>
      <HeroSpinCTA />
    </div>
  )
}
