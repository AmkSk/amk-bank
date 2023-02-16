import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import { LoadingModal } from '../components/LoadingModal'
import { Portal } from 'react-native-paper'

export function useLoadingAction<T>(action: Promise<T>) {
  const { showLoading } = useContext(LoadingContext)

  const loadingAction = async () => {
    showLoading(true)
    const result = await action
    showLoading(false)
    return result
  }

  return { loadingAction }
}

interface LoadingContextProps {
  isLoading: boolean
  showLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  showLoading: () => {},
})

export const LoadingContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, showLoading] = useState(false)

  return (
    <Portal.Host>
      <LoadingModal visible={isLoading} />
      <LoadingContext.Provider value={{ isLoading, showLoading }}>{children}</LoadingContext.Provider>
    </Portal.Host>
  )
}
