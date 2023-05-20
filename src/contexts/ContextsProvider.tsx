import api from '@/service/api'
import { createContext, useContext, useEffect, useState } from 'react'

type ContextsTypes = {
  registerCompany: boolean
  showRegisterCompany: any
  sectors: any
  handleCreateCompany: any
}

export const AllContexts = createContext({} as ContextsTypes)

export function ContextsProvider({ children }: any) {
  const [registerCompany, setRegisterCompany] = useState(false)
  const showRegisterCompany = (data: boolean) => setRegisterCompany(data)
  const [sectors, setSectors] = useState<any>()

  useEffect(() => {
    const sectors = async () => {
      try {
        const response = await api.get('/sectors')
        setSectors(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    sectors()
  }, [])

  const handleCreateCompany = (data: any) => {
    console.log(data)
  }
  return (
    <AllContexts.Provider
      value={{
        registerCompany,
        showRegisterCompany,
        sectors,
        handleCreateCompany,
      }}
    >
      {children}
    </AllContexts.Provider>
  )
}

export const useAllContexts = () => useContext(AllContexts)
