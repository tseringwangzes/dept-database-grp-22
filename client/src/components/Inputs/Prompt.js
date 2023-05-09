import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
  return (
    <Dialog open={true} onClose={props.handleClose} PaperProps={{ sx: { width: '800px' } }}>     
     <DialogTitle>Edit Web Link</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can add or edit your weblink here
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Paste link here"
          type="text"
          fullWidth
          variant="standard"
          value={props.linkText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
