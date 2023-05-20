import { Button, TextField } from '@mui/material'
import styles from './RegisterCompany.module.scss'
import InputMask from 'react-input-mask'
import { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { useAllContexts } from '@/contexts/ContextsProvider'
import { useForm } from 'react-hook-form'

type DataCompany = {
  cnpj: number
  name: string
  sectors: []
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
  const { sectors } = useAllContexts()

  const [sectorsName, setSectorsName] = useState<any>([])

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    setSectorsName(
      // On autofill we get a stringified value.
      value,
    )
  }
  const handleRegisterCompany = (data: DataCompany) => {
    console.log(data)
  }

  return (
    <div className={styles.registerCompanyContainer}>
      <form onSubmit={handleSubmit(handleRegisterCompany)} action="">
        <span>
          <TextField
            {...register('name')}
            id="standard-basic"
            label="Nome da empresa"
            sx={{ width: '320px' }}
            variant="standard"
            required
            autoComplete="off"
          />
        </span>
        <span>
          <InputMask
            {...register('cnpj')}
            mask="999.999.99/9999-99"
            disabled={false}
            maskChar=" "
          >
            {() => (
              <TextField
                {...register('cnpj')}
                sx={{ width: '320px' }}
                variant="standard"
                label="CNPJ"
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
              {...register('sectors')}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
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
        <footer>
          <Button
            type="submit"
            variant="outlined"
            sx={{ color: 'rgb(58, 96, 134)' }}
          >
            CADASTRAR
          </Button>
        </footer>
      </form>
    </div>
  )
}
