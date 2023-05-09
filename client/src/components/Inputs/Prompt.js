import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { st_home_post,ft_home_post } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify';



export default function FormDialog(props) {
  const [linkText, setLinkText] = useState(props.linkText || '');
  var res;
  const handleInputChange = (event) => {
    setLinkText(event.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const myLink = {
        email: props.emailID,
        edit: linkText,
        type: 'Link'
    }

    if (props.userType === 'F') {
      res = await ft_home_post(myLink)
    } else {
      res = await st_home_post(myLink);

    }
    
    if (res.status === 200) {
        console.log('Link Updated');
        toast.success('Link Updated')
      } else {
        console.error('Error submitting the data');
        toast.error('Error submitting the data')
      }



    props.handleClose(linkText);
  };

  const handleCancel = () => {

    props.handleClose('cancel');
  };

  return (
    <>
    <ToastContainer/>
    <Dialog open={true} onClose={props.handleClose} PaperProps={{ sx: { width: '800px' } }}>
      <DialogTitle>Edit Web Link</DialogTitle>
      <DialogContent>
        <DialogContentText>You can add or edit your weblink here</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Paste link here"
          type="text"
          fullWidth
          variant="standard"
          value={linkText}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
