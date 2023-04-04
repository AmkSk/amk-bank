import { useState } from 'react'
import { api } from '../../../network/AmkBankClient'
import { Strings } from '../../../i18n/strings'
import { useErrorStore } from '../../../stores/errorStore'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const setError = useErrorStore((state) => state.setErrorMessage)

  const callLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      await api.logIn(username, password)
      return true
    } catch {
      setError(Strings.login_request_error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { callLogin, isLoading }
}
