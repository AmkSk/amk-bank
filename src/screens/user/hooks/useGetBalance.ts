import { useCallback, useState } from 'react'
import { useErrorStore } from '../../../stores/errorStore'
import { AmkBankApi } from '../../../network/AmkBankClient'
import { Strings } from '../../../i18n/strings'
import { useUserDataStore } from '../../../stores/userDataStore'

export const useGetBalance = () => {
  const setAvailableBalance = useUserDataStore((state) => state.setAvailableBalance)
  const availableBalance = useUserDataStore((state) => state.availableBalance)

  const [isLoading, setIsLoading] = useState(false)
  const setError = useErrorStore((state) => state.setErrorMessage)

  const callGetAvailableBalance = useCallback(async () => {
    try {
      setIsLoading(true)
      const balance = await AmkBankApi.getAvailableBalance()
      setAvailableBalance(balance)
    } catch {
      setAvailableBalance(0)
      setError(Strings.error_general_data)
    } finally {
      setIsLoading(false)
    }
  }, [setError, setAvailableBalance])

  return { availableBalance, callGetAvailableBalance, isLoading }
}
