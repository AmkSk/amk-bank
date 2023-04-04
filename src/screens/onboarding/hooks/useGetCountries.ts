import { useCallback, useState } from 'react'
import { api } from '../../../network/AmkBankClient'
import { Strings } from '../../../i18n/strings'
import { Country } from '../../../data/types'
import { useErrorStore } from '../../../stores/errorStore'

export const useGetCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const setError = useErrorStore((state) => state.setErrorMessage)

  const callGetCountries = useCallback(async () => {
    try {
      setIsLoading(true)
      const countries = await api.getCountries()
      setCountries(countries)
    } catch {
      setError(Strings.onboarding_country_error)
    } finally {
      setIsLoading(false)
    }
  }, [setError])

  return { callGetCountries, countries, isLoading }
}
