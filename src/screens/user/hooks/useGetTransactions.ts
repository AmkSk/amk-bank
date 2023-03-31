import { useCallback, useState } from 'react'
import { useErrorStore } from '../../../stores/errorStore'
import { AmkBankApi } from '../../../network/AmkBankClient'
import { Strings } from '../../../i18n/strings'
import { useUserDataStore } from '../../../stores/userDataStore'

export const useGetTransactions = () => {
  const transactions = useUserDataStore((state) => state.transactions)
  const setTransactions = useUserDataStore((state) => state.setTransactions)

  const [isLoading, setIsLoading] = useState(false)
  const setError = useErrorStore((state) => state.setErrorMessage)

  const callGetTransactions = useCallback(async () => {
    try {
      setIsLoading(true)
      const transactions = await AmkBankApi.getTransactions()
      setTransactions(transactions)
    } catch {
      setTransactions([])
      setError(Strings.error_general_data)
    } finally {
      setIsLoading(false)
    }
  }, [setError, setTransactions])

  return { transactions, callGetTransactions, isLoading }
}
