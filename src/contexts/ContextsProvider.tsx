import api from '@/service/api'
import { createContext, useContext, useEffect, useState } from 'react'

type ContextsTypes = {
  registerCompany: boolean
  showRegisterCompany: any
  sectors: any
  handleCreateCompany: any
  companies:any
  loading: boolean
  pageToShowOnTable: number
  setPageToShowOnTable: any
  setCompanies: any
  maxPage: any;
}

export const AllContexts = createContext({} as ContextsTypes)

export function ContextsProvider({ children }: any) {
  const [registerCompany, setRegisterCompany] = useState(false)
  const [sectors, setSectors] = useState<any>()
  const [companies, setCompanies] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [pageToShowOnTable, setPageToShowOnTable] = useState(1)
  const [maxPage, setMaxPage] = useState()
  const showRegisterCompany = (data: boolean) => setRegisterCompany(data)
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
        setPageToShowOnTable(response.data.companies.current_page)
        setMaxPage(response.data.companies.last_page)
        setCompanies(response.data.companies.data)
      }catch(err){
        return err
      }
    }
    sectors()
    companies()
    setLoading(false)
  }, [])

  const handleCreateCompany = async (data: any) => {
    try {
      const response = await api.post('/companies', data)
      setCompanies([
        ...companies,
        {
          name: data.name,
          cnpj: data.cnpj,
          sectors: sectors.filter((i: any) => data.sectorsId.includes(i.id))
        }
      ])
      return response
    }catch (error) {
      return error
    }
  }
  return (
    <AllContexts.Provider
      value={{
        registerCompany,
        showRegisterCompany,
        sectors,
        handleCreateCompany,
        companies,
        loading,
        pageToShowOnTable, 
        setPageToShowOnTable,
        setCompanies,
        maxPage
      }}
    >
      {children}
    </AllContexts.Provider>
  )
}

export const useAllContexts = () => useContext(AllContexts)
