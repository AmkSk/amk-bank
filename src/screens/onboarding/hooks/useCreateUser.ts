import { api } from '../../../network/AmkBankClient'
import { Strings } from '../../../i18n/strings'
import { useOnboardingStore } from '../../../stores/onboardingStore'
import { useState } from 'react'
import { useErrorStore } from '../../../stores/errorStore'

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const setError = useErrorStore((state) => state.setErrorMessage)

  const phoneNumberPrefix = useOnboardingStore((state) => state.phonePrefix)
  const phoneNumber = useOnboardingStore((state) => state.phoneNumber)
  const email = useOnboardingStore((state) => state.email)
  const dateOfBirth = useOnboardingStore((state) => state.dateOfBirth)
  const selectedCountry = useOnboardingStore((state) => state.countryOfResidence)

  const callCreateUser = async () => {
    try {
      setIsLoading(true)
      await api.createUser(
        phoneNumberPrefix,
        phoneNumber,
        email,
        dateOfBirth?.toDateString() ?? '',
        selectedCountry?.id ?? '',
      )
      return true
    } catch {
      setError(Strings.onboarding_create_user_error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { callCreateUser, isLoading }
}
