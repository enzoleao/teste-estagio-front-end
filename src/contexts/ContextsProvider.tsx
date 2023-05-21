import api from '@/service/api'
import { createContext, useContext, useEffect, useState } from 'react'

type ContextsTypes = {
  registerCompany: boolean
  showRegisterCompany: any
  sectors: any
  handleCreateCompany: any
  companies:any
}

export const AllContexts = createContext({} as ContextsTypes)

export function ContextsProvider({ children }: any) {
  const [registerCompany, setRegisterCompany] = useState(false)
  const showRegisterCompany = (data: boolean) => setRegisterCompany(data)
  const [sectors, setSectors] = useState<any>()
  const [companies, setCompanies] = useState<any>()
  useEffect(() => {
    const sectors = async () => {
      try {
        const response = await api.get('/sectors')
        setSectors(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    const companies = async() => {
      try {
        const response = await api.get('/companies')
        setCompanies(response.data.companies)
      }catch(err){
        console.log(err)
      }
    }
    sectors()
    companies()
  }, [])

  const handleCreateCompany = async (data: any) => {
    
    try {
      const response = await api.post('/companies',data)
      console.log(data)
      setCompanies([
        ...companies,
        {
          name: data.name,
          cnpj: data.cnpj,
          sectors: sectors.filter((i: any) => data.sectorsId.includes(i.id))
        }
      ])
      return response
    }catch (err) {
      console.log(err)
      return err
    }
  }
  return (
    <AllContexts.Provider
      value={{
        registerCompany,
        showRegisterCompany,
        sectors,
        handleCreateCompany,
        companies
      }}
    >
      {children}
    </AllContexts.Provider>
  )
}

export const useAllContexts = () => useContext(AllContexts)
