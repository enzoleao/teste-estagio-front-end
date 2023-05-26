import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputMask from 'react-input-mask'
import { FiAlertTriangle } from 'react-icons/fi'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAllContexts } from '@/contexts/ContextsProvider'
import { useEffect, useState } from 'react'
import { Select } from 'antd'
import styles from './Modals.module.scss'
import api from '@/service/api'
export function DeleteModal(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          id="alert-dialog-title"
        >
          <FiAlertTriangle className="text-red-500 bg-red-100 p-2 h-9 w-9 rounded-full" />
          {'Deletar Empresa'}
        </DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja deletar essa empresa ? Essa ação não
            poderá ser desfeita.
          </DialogContentText>
          <DialogContentText
            sx={{ fontWeight: 'bold' }}
            id="alert-dialog-description"
          >
            {`EMPRESA: ${props.employeeToDelete}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            CANCELAR
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={props.onClick}
            autoFocus
          >
            DELETAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export function EditModal(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  
  const { 
    sectors, 
    setDeleteOrUpdate, 
    setCompanies, 
    setShowSnackBarDeleteCompany, 
    setErrorMessageToShowHome,
    setShowHomeErros } = useAllContexts()
  const { register, handleSubmit, setValue } = useForm<any>()
  const [sectorsSelected, setSectorsSelected] = useState<any>(props.sectorsSelected.map(({ id }: any) => id))
  const filteredOptions =
    typeof sectors !== 'undefined' &&
    sectors.filter((o: any) => !sectorsSelected?.includes(o))
  
  useEffect(()=>{
      setValue('sectors', sectorsSelected)
  },[sectorsSelected, setValue])

  const handleUpdateCompany = async (data: any) => {
    try {
      const response = await api.put(`/companies/${props.id}`, data)
      setCompanies((i: any) => {
        return i.map((objeto: any) => {
          if (objeto.id === props.id) {
            return { ...objeto, ... {
              id: props.id,
              cnpj: data.cnpj,
              name: data.name,
              sectors: sectors.filter((secs: any) =>
              data.sectors?.some((secs2: any) => secs2 === secs.id),
            )
            }};
          }
          setSectorsSelected(data.sectors)
          return objeto;
        });
      });
      setShowSnackBarDeleteCompany(true)
      setDeleteOrUpdate(false)
      props.setOpen(false)
    }catch(err: any){
      setErrorMessageToShowHome(err.response.data.error)
      setShowHomeErros(true)
    }
  }
  return (
    <>
        <Dialog open={props.open} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleUpdateCompany)} action="">
          <DialogTitle>Editar Empresa</DialogTitle>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <TextField
              {...register('name')}
              sx={{ minWidth: '420px' }}
              autoFocus
              autoComplete="off"
              margin="dense"
              id="name"
              label="Nome da Empresa"
              defaultValue={props.name}
              fullWidth
              variant="outlined"
            />
            <InputMask
              {...register('cnpj')}
              mask="999.999.99/9999-99"
              disabled={false}
              maskChar=""
              defaultValue={props.cnpj}
            >
              {/* @ts-ignore: Unreachable code error */}
              {() => (
                <TextField
                  {...register('cnpj')}
                  sx={{ maxWidth: '320px' }}
                  label="CNPJ"
                  defaultValue={props.cnpj}
                />
              )}
            </InputMask>
            <Select
            {...register('sectors')}
              className={styles.customSelect}
              mode="multiple"
              placeholder="Setores"
              value={sectorsSelected}
              defaultValue={props.sectorsSelected.map(({ id }: any) => id)}
              onChange={setSectorsSelected}
              style={{
                width: '100%',
                maxWidth: '320px',
                zIndex: 9999,
                
              }}
              options={
                typeof sectors !== 'undefined' &&
                filteredOptions.map((item: any) => ({
                  value: item.id,
                  label: item.name,
                }))
              }
              size='large'
              dropdownStyle={{ zIndex: 9999 }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              CANCELAR
            </Button>
            <Button
              type='submit'
              variant="outlined"
              color="success"
            >
              SALVAR
            </Button>
          </DialogActions>
      </form>
        </Dialog>
    </>
  )
}
