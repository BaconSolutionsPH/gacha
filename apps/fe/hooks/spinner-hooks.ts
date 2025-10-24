import { useUserStore } from '@/stores'
import { useSpinnerStore } from '@/stores/spinner-store'
import { toast } from 'sonner'

export const useSpin = () => {
  const user = useUserStore((state) => state.user)
  const setIsSpinning = useSpinnerStore((state) => state.setIsSpinning)

  const handleSpin = async () => {
    if (!user) return toast.error('Please sign in to spin')

    try {
      setIsSpinning(true)

      toast('Spinning...')
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate spinning

      toast.success('Spin successful')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setIsSpinning(false)
    }
  }

  return {
    handleSpin,
  }
}
