import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import { LoadingModal } from '../components/LoadingModal'
import { Portal } from 'react-native-paper'

interface LoadingContextProps {
  isLoading: boolean
  showLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextProps>({
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
