import { useState, createContext, ReactNode, useEffect } from 'react'

export type TauthContext = {
  accessToken: string | null
  setAccessToken: (value: string | null) => void
  username: string | null
  setUsername: (value: string | null) => void
  userId: number | null
  setUserId: (value: number | null) => void
}

export const authContext = createContext<TauthContext | null>(null)

type TauthContextProvider = {
  children: ReactNode
}

export const AuthProvider = ({ children }: TauthContextProvider) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(-1)

  return (
    <authContext.Provider
      value={{
        accessToken,
        setAccessToken,
        username,
        setUsername,
        userId,
        setUserId
      }}
    >
      {children}
    </authContext.Provider>
  )
}
