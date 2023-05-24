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
export function DeleteModal(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  return (
    <div>
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
            sx={{ color: '#ff0000', fontWeight: 'bold' }}
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
    </div>
  )
}
export function EditModal(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const { register } = useForm()
  return (
    <div>
      <form action="">
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>Editar Empresa</DialogTitle>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <TextField
              sx={{ minWidth: '420px' }}
              autoFocus
              autoComplete="off"
              margin="dense"
              id="name"
              label="Nome da Empresa"
              type="email"
              fullWidth
              variant="outlined"
            />
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
                  label="CNPJ"
                />
              )}
            </InputMask>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              CANCELAR
            </Button>
            <Button variant="outlined" color="success" onClick={handleClose}>
              SALVAR
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}
