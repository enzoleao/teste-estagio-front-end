import styles from './RegisterCompany.module.scss'
import InputMask from 'react-input-mask'
import { useAllContexts } from '@/contexts/ContextsProvider'
import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SnackBar } from '../SnackBar'
import { BsBuildingAdd } from 'react-icons/bs'
import { Select } from 'antd'
import api from '@/service/api'
type DataCompany = {
  cnpj: number
  name: string
  sectors: []
}

export function RegisterCompany() {
  const { register, handleSubmit, reset } = useForm<DataCompany>()

  const { sectors, companies, setCompanies } = useAllContexts()
  const [sectorsSelected, setSectorsSelected] = useState<any>([])
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [responseMenssage, setResponseMenssage] = useState('')
  const [response, setResponse] = useState<any>(false)
  const filteredOptions =
    typeof sectors !== 'undefined' &&
    sectors.filter((o: any) => !sectorsSelected.includes(o))
  const handleRegisterCompany = async (data: DataCompany) => {
    console.log(data)
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
              {/* @ts-ignore: Unreachable code error */}
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

          <Select
            {...register('sectors')}
            mode="multiple"
            placeholder="Setores"
            value={sectorsSelected}
            onChange={setSectorsSelected}
            style={{
              zIndex: 9999,
            }}
            size="large"
            options={
              typeof sectors !== 'undefined' &&
              filteredOptions.map((item: any) => ({
                value: item.id,
                label: item.name,
              }))
            }
          />
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
