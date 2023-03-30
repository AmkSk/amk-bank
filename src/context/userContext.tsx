import React, { createContext, PropsWithChildren, useState } from 'react'

interface UserContextProps {
  userLoggedIn: boolean
  setUserLoggedIn: (userLoggedIn: boolean) => void
}

export const UserContext = createContext<UserContextProps>({
  userLoggedIn: false,
  setUserLoggedIn: () => {},
})

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false)

  return (
    <UserContext.Provider value={{ userLoggedIn: isUserLoggedIn, setUserLoggedIn }}>{children}</UserContext.Provider>
  )
}
