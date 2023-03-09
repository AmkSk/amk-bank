import { useErrorStore } from '../stores/errorStore'

export function useError() {
  const setErrorMessage = useErrorStore((state) => state.setErrorMessage)
  const setErrorVisible = useErrorStore((state) => state.setErrorVisible)

  const setError = (message: string) => {
    setErrorMessage(message)
    setErrorVisible(true)
  }

  return setError
}
