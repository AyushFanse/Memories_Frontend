import * as React from 'react';
import { Stack, Alert, Snackbar, Slide } from '@mui/material';

function Transition(props) {
  return <Slide {...props} direction="left" />;
}

const Error = ({ msg, mode }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {
        msg
          ?
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} TransitionComponent={Transition} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
              <Alert elevation={6} onClose={handleClose} severity={mode} sx={{ width: '100%' }}>
                {msg}
              </Alert>
            </Snackbar>
          </Stack>
          :
          null
      }
    </>
  );
}

export default Error;