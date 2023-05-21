import styles from './RegisterCompany.module.scss'
import InputMask from 'react-input-mask'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { useAllContexts } from '@/contexts/ContextsProvider'
import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SnackBar } from '../SnackBar'
import { BsBuildingAdd } from 'react-icons/bs'
type DataCompany = {
  cnpj: number
  name: string
  sectorsId: []
}
export function RegisterCompany() {
  const { register, handleSubmit } = useForm<DataCompany>()
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  }
  const { sectors, handleCreateCompany } = useAllContexts()

  const [sectorsName, setSectorsName] = useState<any>([])
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [responseMenssage, setResponseMenssage] = useState('')
  const [response, setResponse] = useState<any>()

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    setSectorsName(
      // On autofill we get a stringified value.
      value,
    )
  }
  const handleRegisterCompany = async (data: DataCompany) => {
    try {
      const response = await handleCreateCompany(data)
      setSnackBarOpen(true)
      setResponseMenssage(response.data.message)
      setResponse(false)
    }catch(err){
      setResponse(true)
      setSnackBarOpen(true)
    }
  }

  return (
    <div className={styles.registerCompanyContainer}>
      <form onSubmit={handleSubmit(handleRegisterCompany)} action="">
        <header>
          <BsBuildingAdd className={styles.companyIcon}/>
          <Typography sx={{color:"rgb(21, 73, 122)"}} variant="h4" component="h2">
             CADASTRO DE EMPRESA
          </Typography>
        </header>
        <main>
          <span>
            <TextField
              {...register('name')}
              id="standard-basic"
              label="Nome da empresa"
              
              variant="outlined"
              required
              autoComplete="off"
            />
          </span>
          <span>
            <InputMask
              {...register('cnpj')}
              mask="999.999.99/9999-99"
              disabled={false}
              maskChar=""
              required
            >
              {() => (
                <TextField
                  {...register('cnpj')}
                  sx={{ maxWidth: '320px' }}
                  variant="outlined"
                  label="CNPJ"
                  required
                />
              )}
            </InputMask>
          </span>
          <span>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Setores</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={sectorsName}
                placeholder="Selecione"
                {...register('sectorsId')}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                sx={{maxWidth:'320px'}}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {sectors.map((name: any) => (
                  <MenuItem key={name.id} value={name.id}>
                    <Checkbox checked={sectorsName.indexOf(name.id) > -1} />
                    <ListItemText primary={name.name} />
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
            sx={{ color: 'rgb(58, 96, 134)', width:'320px', height:'44px' }}
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
