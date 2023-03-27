import { useErrorStore } from '../stores/errorStore'

export function useError() {
  const showError = useErrorStore((state) => state.setErrorMessage)
  return { showError }
}
