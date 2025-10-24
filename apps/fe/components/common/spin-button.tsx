'use client'

import { useUserStore } from '@/stores'
import { Button } from '../ui/button'
import { useSpin } from '@/hooks/spinner-hooks'
import { useSpinnerStore } from '@/stores/spinner-store'

interface SpinButtonProps {
  onClick?: () => void
}

export default function SpinButton({ onClick }: SpinButtonProps) {
  const user = useUserStore((state) => state.user)
  const isSpinning = useSpinnerStore((state) => state.isSpinning)
  const { handleSpin } = useSpin()

  const isDisabled = !user || isSpinning

  const handleClick = () => {
    if (!onClick) return handleSpin()

    onClick()
  }

  return (
    <Button
      variant="blue"
      className="absolute bottom-20 left-1/2 z-10 h-auto w-full max-w-[150px] -translate-x-1/2"
      disabled={isDisabled}
      onClick={handleClick}
    >
      {isSpinning ? 'Spinning...' : 'Spin'}
    </Button>
  )
}
