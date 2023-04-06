import { create } from 'zustand'

interface IsTablet {
  isTablet: boolean
  setIsTablet: (isTablet: boolean) => void
}

export const useDeviceInfoStore = create<IsTablet>((set) => ({
  isTablet: false,
  setIsTablet: (isTablet: boolean) => {
    set(() => ({ isTablet }))
  },
}))
