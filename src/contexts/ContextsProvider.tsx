import { createContext, useContext, useState } from 'react'

type ContextsTypes = {
  registerCompany: boolean
  showRegisterCompany: any
}

export const AllContexts = createContext({} as ContextsTypes)

export function ContextsProvider({ children }: any) {
  const [registerCompany, setRegisterCompany] = useState(false)
  const showRegisterCompany = (data: boolean) => setRegisterCompany(data)
  return (
    <AllContexts.Provider value={{ registerCompany, showRegisterCompany }}>
      {children}
    </AllContexts.Provider>
  )
}

export const useAllContexts = () => useContext(AllContexts)
