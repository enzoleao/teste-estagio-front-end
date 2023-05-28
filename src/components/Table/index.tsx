import styles from './Table.module.scss'
import api from '@/service/api'
import { useAllContexts } from '@/contexts/ContextsProvider'
import {
  Button,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Switch,
} from '@mui/material'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { useState, ChangeEvent, useEffect } from 'react'
import { TableRows } from './tablesRows'
import { SnackBar } from '../SnackBar'
import { SlOptionsVertical } from 'react-icons/sl'
import Menu from '@mui/material/Menu';
export function Table() {
  const {
    companies,
    pageToShowOnTable,
    setPageToShowOnTable,
    setCompanies,
    maxPage,
    showSnackBarDeleteCompany,
    setShowSnackBarDeleteCompany,
    orderPages,
    setOrderPages,
    deleteOrUpdate,
    showHomeErros,
    setShowHomeErros,
    errorMessageToShowHome
  } = useAllContexts()
  const [companyName, setCompanyName] = useState('')
  const [searchMode, setSearchMode] = useState('Empresa')

  useEffect(()=>{
    searchCompany()
  },[companyName])

  const nextPage = async () => {
    setPageToShowOnTable(pageToShowOnTable + 1)
    const response = await api.get(`/companies?page=${pageToShowOnTable + 1}&order=${orderPages}`)
    setCompanies(response.data.companies.data)
  }
  const lastPage = async () => {
    setPageToShowOnTable(pageToShowOnTable - 1)
    const response = await api.get(`/companies?page=${pageToShowOnTable - 1}&order=${orderPages}`)
    setCompanies(response.data.companies.data)
  }
  const searchCompany = async () => {
    if (searchMode === 'Empresa' || companyName === '') {
      const response = await api.get(`/companies/${companyName}`)
      companyName === ''
        ? setCompanies(response.data.companies.data)
        : setCompanies(response.data.companies)
    } else {
      const response = await api.get(`/search/${companyName}`)
      setCompanies(response.data.companies)
    }
    setPageToShowOnTable(1)
  }
  const orderResults = async()=> {
    setOrderPages(!orderPages)
    const response = await api.get(`/companies?page=${pageToShowOnTable}&order=${!orderPages}`)
    setCompanies(response.data.companies.data)
  }
  const handleChangeSearchMode = (event: SelectChangeEvent) => {
    setSearchMode(event.target.value);
  }
  const [anchorButtonMenu, setAnchorButtonMenu] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorButtonMenu);
  const handleClickOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorButtonMenu(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorButtonMenu(null);
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <header>
          <div>
            <FormControl variant="filled">
              <InputLabel htmlFor="input-with-icon-adornment">
                Pesquisar por {searchMode}
              </InputLabel>
              <FilledInput
                id="input-with-icon-adornment"
                autoComplete='false'
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
            <FormHelperText>Pesquisar por</FormHelperText>
            <FormControl variant='filled' sx={{ minWidth: 120 }}>
              <Select
                onChange={handleChangeSearchMode}
                value={searchMode}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={'Empresa'}>Empresa</MenuItem>
                <MenuItem value={'Setor'}>Setor</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button onClick={handleClickOpenMenu} sx={{width: '40px',height:'40px',borderRadius: '30px'}} variant="outlined">
              <SlOptionsVertical className='w-4 h-4' />
            </Button>
          </div>
        </header>
        <main>
          <div className={styles.tableWrapperOverFlow}>
            <table>
              <thead>
                <tr>
                  <th>
                      EMPRESA
                  </th>
                  <th>CNPJ </th>
                  <th className={styles.sectorsHeader}>SETORES</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {typeof companies !== 'undefined' &&
                  companies.map((i: any) => {
                    return (
                      <TableRows
                        id={i.id}
                        key={i.id}
                        name={i.name}
                        cnpj={i.cnpj}
                        sectors={i.sectors}
                      />
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
                  pageToShowOnTable <= 1
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
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
        </main>
      </div>
      <SnackBar
        open={showSnackBarDeleteCompany}
        setOpen={setShowSnackBarDeleteCompany}
        error={false}
        message={deleteOrUpdate ? 'Deletado com sucesso' : 'Atualizado com sucesso'}
      />
      <SnackBar
        open={showHomeErros}
        setOpen={setShowHomeErros}
        error={true}
        message={errorMessageToShowHome}
      />
       <Menu
        id="basic-menu"
        anchorEl={anchorButtonMenu}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <p>Ordenar por nome</p>
          <Switch 
            checked={orderPages}  
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={orderResults}
          />
        </MenuItem>
      </Menu>
    </div>
  )
}
