import { create } from 'zustand'

interface ErrorState {
  errorMessage: string | null
  setErrorMessage: (error: string | null) => void
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: null,
  setErrorMessage: (error: string | null) => {
    set(() => ({ errorMessage: error }))
  },
}))
