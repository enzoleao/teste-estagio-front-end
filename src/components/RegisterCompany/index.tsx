import { TextField } from '@mui/material'
import styles from './RegisterCompany.module.scss'
import InputMask from 'react-input-mask'
import { useState } from 'react'
export function RegisterCompany() {
  return (
    <div className={styles.registerCompanyContainer}>
      <form action="">
        <TextField
          id="standard-basic"
          label="Nome da empresa"
          sx={{ width: '320px' }}
          variant="standard"
        />
        <InputMask mask="999.999.99/9999-99" disabled={false} maskChar=" ">
          {() => <TextField variant="standard" label="CNPJ" />}
        </InputMask>
      </form>
    </div>
  )
}
