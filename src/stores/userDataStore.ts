import { create } from 'zustand'
import { Transaction } from '../data/types'

interface UserDataState {
  availableBalance: number | null
  transactions: Transaction[]
}

interface UserDataActions {
  setAvailableBalance: (balance: number) => void
  setTransactions: (transactions: Transaction[]) => void
}

const initialState: UserDataState = {
  availableBalance: null,
  transactions: [],
}

export const useUserDataStore = create<UserDataState & UserDataActions>((set) => ({
  ...initialState,
  setAvailableBalance: (balance: number) => {
    set(() => ({ availableBalance: balance }))
  },
  setTransactions: (transactions: Transaction[]) => {
    set(() => ({ transactions }))
  },
}))
