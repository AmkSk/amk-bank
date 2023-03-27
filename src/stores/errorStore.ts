import { create } from 'zustand'

interface ErrorState {
  errorMessage: string | null
  setErrorMessage: (error: string | null) => void
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: '',
  errorVisible: false,
  setErrorMessage: (error: string | null) => {
    set(() => ({ errorMessage: error }))
  },
}))
