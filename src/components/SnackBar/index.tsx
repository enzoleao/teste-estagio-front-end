import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, SyntheticEvent, useState } from 'react';
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
interface SnackBarProps {
    message?: string;
    error?: boolean;
    open: boolean;
    setOpen: any;
}
export function SnackBar(props: SnackBarProps){
    
    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      props.setOpen(false);
    };
  
    return (
   
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        
        {
        props.error ? 
       ( <Alert severity="error">{props.message}</Alert>)
        :
        (<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {props.message}
        </Alert> )
        }       
      </Snackbar> 

    )
}