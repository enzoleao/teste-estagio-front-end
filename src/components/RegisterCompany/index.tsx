import styles from './RegisterCompany.module.scss'
import InputMask from 'react-input-mask'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { useAllContexts } from '@/contexts/ContextsProvider'
import {
  Box,
  Button,
  Chip,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SnackBar } from '../SnackBar'
import { BsBuildingAdd } from 'react-icons/bs'
import api from '@/service/api'

type DataCompany = {
  cnpj: number
  name: string
  sectors: []
}
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export function RegisterCompany() {
  const { register, handleSubmit, reset } = useForm<DataCompany>()
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  }
  const theme = useTheme()
  const { sectors, companies, setCompanies } = useAllContexts()
  const [sectorsSelected, setSectorsSelected] = useState<any>([])
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [responseMenssage, setResponseMenssage] = useState('')
  const [response, setResponse] = useState<any>(false)

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    setSectorsSelected(value)
  }
  const handleRegisterCompany = async (data: DataCompany) => {
    try {
      const response = await api.post('/companies', data)
      setCompanies([
        ...companies,
        {
          id: response.data.company.id,
          name: data.name,
          cnpj: data.cnpj,
          sectors: sectors.filter((secs: any) =>
            data.sectors.some((secs2: any) => secs2.id === secs.id),
          ),
        },
      ])
      setSnackBarOpen(true)
      setResponse(false)
      setResponseMenssage(response.data.message)
      reset()
    } catch (error: any) {
      setSnackBarOpen(true)
      setResponse(true)
      setResponseMenssage(error.response.data.error)
    }
  }

  return (
    <div className={styles.registerCompanyContainer}>
      <form onSubmit={handleSubmit(handleRegisterCompany)} action="">
        <header>
          <BsBuildingAdd className={styles.companyIcon} />
          <Typography
            sx={{ color: 'rgb(21, 73, 122)' }}
            variant="h4"
            component="h2"
          >
            CADASTRO DE EMPRESA
          </Typography>
        </header>
        <main>
          <span>
            <TextField
              {...register('name')}
              id="standard-basic"
              label="Nome da Empresa"
              variant="outlined"
              autoComplete="off"
              sx={{ borderColor: 'white' }}
            />
          </span>
          <span>
            <InputMask
              {...register('cnpj')}
              mask="999.999.99/9999-99"
              disabled={false}
              maskChar=""
            >
              {() => (
                <TextField
                  {...register('cnpj')}
                  sx={{ maxWidth: '320px' }}
                  variant="outlined"
                  label="CNPJ"
                />
              )}
            </InputMask>
          </span>
          <span>
            <FormControl sx={{ maxWidth: '320px' }}>
              <InputLabel id="demo-multiple-chip-label">Setores</InputLabel>
              <Select
                {...register('sectors')}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                label="Setores"
                value={sectorsSelected}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: any) => {
                      return <Chip key={value.id} label={value.name} />
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {sectors.map((name: any) => (
                  <MenuItem
                    key={name.id}
                    value={name}
                    style={getStyles(name, sectorsSelected, theme)}
                  >
                    <Checkbox checked={sectorsSelected.indexOf(name) > -1} />
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </span>
        </main>
        <footer>
          <Button
            type="submit"
            variant="outlined"
            sx={{ color: 'rgb(58, 96, 134)', width: '320px', height: '44px' }}
          >
            CADASTRAR
          </Button>
        </footer>
      </form>
      <SnackBar
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        error={response}
        message={responseMenssage}
      />
    </div>
  )
}
