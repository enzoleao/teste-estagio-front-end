import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { forwardRef, SyntheticEvent, useState } from 'react'
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
interface SnackBarProps {
  message?: string
  error?: boolean
  open: boolean
  setOpen: any
}
export function SnackBar(props: SnackBarProps) {
  const [state] = useState<any>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  })
  const { vertical, horizontal } = state
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    props.setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={props.open}
      autoHideDuration={5000}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      {props.error ? (
        <Alert onClose={handleClose} severity="error">
          {props.message}
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      )}
    </Snackbar>
  )
}
