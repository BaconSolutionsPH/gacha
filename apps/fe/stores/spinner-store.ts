import { create } from 'zustand'

interface SpinnerStore {
  isSpinning: boolean
  setIsSpinning: (isSpinning: boolean) => void
}

export const useSpinnerStore = create<SpinnerStore>((set) => ({
  isSpinning: false,
  setIsSpinning: (isSpinning) => set({ isSpinning }),
}))
