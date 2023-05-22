import styles from './Table.module.scss'
import Droplist from '../CollapseRow'
import api from '@/service/api'
import { useAllContexts } from '@/contexts/ContextsProvider'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { useState, ChangeEvent } from 'react'

export function Table() {
  const {
    companies,
    pageToShowOnTable,
    setPageToShowOnTable,
    setCompanies,
    maxPage,
  } = useAllContexts()
  const [companyName, setCompanyName] = useState('')
  const [searchMode, setSearchMode] = useState('Empresa')
  const nextPage = async () => {
    setPageToShowOnTable(pageToShowOnTable + 1)
    const response = await api.get(`/companies?page=${pageToShowOnTable + 1}`)
    setCompanies(response.data.companies.data)
  }
  const lastPage = async () => {
    setPageToShowOnTable(pageToShowOnTable - 1)
    const response = await api.get(`/companies?page=${pageToShowOnTable - 1}`)
    setCompanies(response.data.companies.data)
  }
  const searchCompany = async () => {
    if (searchMode === 'Empresa' || companyName === '') {
      const response = await api.get(`/companies/${companyName}`)
      console.log(response)
      companyName === ''
        ? setCompanies(response.data.companies.data)
        : setCompanies(response.data.companies)
    } else {
      const response = await api.get(`/search/${companyName}`)
      setCompanies(response.data.companies)
    }
  }
  const ordCompaniesName = () => {
    const novoArray = [...companies]

    novoArray.sort((a, b) => {
      const nomeA = a.name.toUpperCase()
      const nomeB = b.name.toUpperCase()
      if (nomeA < nomeB) {
        return -1
      } else if (nomeA > nomeB) {
        return 1
      }
      return 0
    })

    setCompanies(novoArray)
  }
  const handleChangeSearchMode = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchMode((event.target as HTMLInputElement).value)
  }
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <header>
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Pesquisar {searchMode}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                sx={{ width: '320px' }}
                onChange={(e) => setCompanyName(e.target.value)}
                onBlur={searchCompany}
                endAdornment={
                  <InputAdornment position="end">
                    <RxMagnifyingGlass
                      onClick={searchCompany}
                      className={styles.iconSearchInput}
                      cursor="pointer"
                    />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Modo de pesquisa
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={searchMode}
                onChange={handleChangeSearchMode}
              >
                <FormControlLabel
                  value="Empresa"
                  control={<Radio />}
                  label="Nome"
                />
                <FormControlLabel
                  value="Setor"
                  control={<Radio />}
                  label="Setor"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <Button variant="outlined" onClick={ordCompaniesName}>
              ORDENAR
            </Button>
          </div>
        </header>
        <div className={styles.tableWrapperOverFlow}>
          <table>
            <thead>
              <tr>
                <th>EMPRESA</th>
                <th>CNPJ </th>
                <th className={styles.sectorsHeader}>SETORES</th>
              </tr>
            </thead>
            <tbody>
              {typeof companies !== 'undefined' &&
                companies.map((i: any) => {
                  return (
                    <tr key={i.id}>
                      <td>{i.name}</td>
                      <td>{i.cnpj}</td>
                      <td>
                        <Droplist sectors={i.sectors} />
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        {companyName === '' ? (
          <footer>
            <button
              disabled={pageToShowOnTable <= 1}
              className={`${
                pageToShowOnTable <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={lastPage}
            >
              {`<`}
            </button>
            <p>{pageToShowOnTable}</p>
            <button
              disabled={pageToShowOnTable === maxPage}
              className={`${
                pageToShowOnTable === maxPage
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
              onClick={nextPage}
            >
              {`>`}
            </button>
          </footer>
        ) : (
          false
        )}
      </div>
    </div>
  )
}
