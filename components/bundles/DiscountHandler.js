import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DiscountHandler() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Options
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Discount Options"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You can set a discount percentage to all of your product bundles all at once from here! Pressing Reset will set discount percentage for all products to 0.
          </DialogContentText>
          <TextField
            label="Discount"
            id="standard-start-adornment"
            InputProps={{
             endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Apply
          </Button>
          <Button onClick={handleClose} color="secondary"  variant="contained">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}