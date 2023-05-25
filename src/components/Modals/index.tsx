import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputMask from 'react-input-mask'
import { FiAlertTriangle } from 'react-icons/fi'
import { Box, Checkbox, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Theme, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAllContexts } from '@/contexts/ContextsProvider'
import { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual';
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}
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
    </div>
  )
}
export function EditModal(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const theme = useTheme()
  const { sectors } = useAllContexts()
  const { register } = useForm()
  const [sectorsSelected, setSectorsSelected] = useState<any>(props.sectorsSelected)
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  }
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    setSectorsSelected(value)
  }

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
              value={props.name}
              fullWidth
              variant="outlined"
            />
            <InputMask
              {...register('cnpj')}
              mask="999.999.99/9999-99"
              disabled={false}
              maskChar=""
              value={props.cnpj}
            >
              {/* @ts-ignore: Unreachable code error */}
              {() => (
                <TextField
                  {...register('cnpj')}
                  sx={{ maxWidth: '320px' }}
                  label="CNPJ"
                  value={props.cnpj}
                />
              )}
            </InputMask>
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
                input={<OutlinedInput id="select-multiple-chip" label="Setores" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: any) => {
                      return <Chip key={value.id}  label={value.name} />
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {typeof sectors !=='undefined' &&  sectors.map((name: any) =>{
                 return (
                  <MenuItem
                    key={name.id}
                    value={name}
                    style={getStyles(name, sectorsSelected, theme)}
                  >
                  
                    {name.name}
                  </MenuItem>
                 )}
                )}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              CANCELAR
            </Button>
            <Button variant="outlined" color="success" onClick={()=>console.log(sectorsSelected)}>
              SALVAR
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}
