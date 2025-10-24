'use client'

import SpinButton from '@/components/common/spin-button'
import { useSpinnerStore } from '@/stores/spinner-store'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function SpinnerContent() {
  const isSpinning = useSpinnerStore((state) => state.isSpinning)

  return (
    <div
      className={cn(
        'relative rounded-2xl bg-linear-to-br from-purple-100 to-pink-100 p-2 transition-all duration-300',
        isSpinning ? 'animate-pulse shadow-lg shadow-purple-200' : 'shadow-md',
      )}
    >
      {/* Glow effect when spinning */}
      {isSpinning && (
        <div className="absolute inset-0 animate-pulse rounded-2xl bg-linear-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20" />
      )}

      {/* Card with enhanced shaking animation */}
      <div className={cn('relative transition-all duration-200', isSpinning && 'animate-pulse')}>
        <Image
          src="/assets/images/default-card.webp"
          alt="Default Card"
          width={500}
          height={500}
          className={cn(
            'rounded-xl transition-all duration-100',
            isSpinning ? 'animate-shake shadow-lg shadow-purple-300/50' : 'shadow-sm',
          )}
        />

        {/* Sparkle effects when spinning */}
        {isSpinning && (
          <>
            <div className="absolute top-2 right-2 h-2 w-2 animate-ping rounded-full bg-yellow-400" />
            <div className="absolute bottom-4 left-4 h-1.5 w-1.5 animate-ping rounded-full bg-pink-400 delay-75" />
            <div className="absolute top-1/2 left-2 h-1 w-1 animate-ping rounded-full bg-purple-400 delay-150" />
            <div className="absolute right-6 bottom-2 h-1.5 w-1.5 animate-ping rounded-full bg-yellow-300 delay-300" />
          </>
        )}
      </div>

      <SpinButton />
    </div>
  )
}
