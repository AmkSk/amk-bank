import { create } from 'zustand'
import { Country } from '../data/Country'

interface OnboardingState {
  phonePrefix: string
  phoneNumber: string
  name: string
  surname: string
  email: string
  dateOfBirth: Date | null
  countryOfResidence: Country | null

  setPhonePrefix: (prefix: string) => void
  setPhoneNumber: (number: string) => void
  setName: (name: string) => void
  setSurname: (surname: string) => void
  setEmail: (email: string) => void
  setDateOfBirth: (date: Date) => void
  setCountryOfResidence: (country: Country | null) => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  phonePrefix: '',
  phoneNumber: '',
  name: '',
  surname: '',
  email: '',
  dateOfBirth: null,
  countryOfResidence: null,

  setPhoneNumber: (number: string) => {
    set((state) => ({ phoneNumber: number }))
  },
  setPhonePrefix: (prefix: string) => {
    set((state) => ({ phonePrefix: prefix }))
  },
  setName: (name: string) => {
    set((state) => ({ name }))
  },
  setSurname: (surname: string) => {
    set((state) => ({ surname }))
  },
  setEmail: (email: string) => {
    set(() => ({ email }))
  },
  setDateOfBirth: (date: Date) => {
    set((state) => ({ dateOfBirth: date }))
  },
  setCountryOfResidence: (country: Country | null) => {
    set((state) => ({ countryOfResidence: country }))
  },
}))
