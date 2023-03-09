import { create } from 'zustand'

interface ErrorState {
  errorVisible: boolean
  errorMessage: string
  setErrorVisible: (visible: boolean) => void
  setErrorMessage: (error: string) => void
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: '',
  errorVisible: false,
  setErrorVisible: (visible: boolean) => {
    set(() => ({ errorVisible: visible }))
  },
  setErrorMessage: (error: string) => {
    set(() => ({ errorMessage: error }))
  },
}))
