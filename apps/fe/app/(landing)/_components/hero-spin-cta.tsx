'use client'

import SpinButton from '@/components/common/spin-button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HeroSpinCTA() {
  const { push } = useRouter()

  return (
    <div className="relative rounded-2xl bg-gray-100 p-2">
      <Image src="/assets/images/default-card.webp" alt="Default Card" width={500} height={500} className="rounded-xl" />
      <SpinButton onClick={() => push('/spin')} />
    </div>
  )
}
