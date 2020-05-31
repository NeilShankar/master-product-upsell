import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import ApplyAllNewRecommendation from '../../API-instances/ApplyAllNewRecommendations'
import ApplyAllRecommendation from '../../API-instances/ApplyAllRecommendations'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from '../Loader'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function RPhandler(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [bundleArray, setBundleArray] = React.useState(props.bundlesArray)

  const [openBack, setOpenBack] = React.useState(true);
  const [displayLoader, setDisplayLoader] = React.useState('none')

  const handleClickOpen = () => {
    setOpen(true);
  };

React.useEffect(() => {
  setBundleArray(props.bundlesArray);
}, [props]);

  const [recoms, setRecoms] = React.useState(0)
  const [curRecoms, setCurRecoms] = React.useState(0)

React.useEffect(() => {
  var cur = 0
  bundleArray.forEach(element => {
    if (element.RecommendedProduct.Id !== element.NewRecommendedProduct.Id && element.NewRecommendedProduct.Id !== "None") {
      cur = cur + 1
      setRecoms(cur)
    }
  });
}, [bundleArray, props, open])

React.useEffect(() => {
 var cur = 0
 bundleArray.forEach(element => {
    if (element.RecommendedProduct.Id !== element.SelectedProduct.Id) {
      cur = cur + 1
      setCurRecoms(cur)
    }
  })
}, [bundleArray, props, open])
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleApplyNew = () => {
    if (recoms > 0) {
      setDisplayLoader('block')
      ApplyAllNewRecommendation({
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        props.ChangeAllNewRecoms()
        setRecoms(0)
        setDisplayLoader('none')
      })
    }
  }

  const handleApplyRecoms = () => {
    if (curRecoms > 0) {
      setDisplayLoader('block')
      ApplyAllRecommendation({
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        props.ChangeSelects()
        setCurRecoms(0)
        setDisplayLoader('none')
      })
    }
  }

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
        <div className={classes.root}>
         <LinearProgress style={{ display: displayLoader }} />
        </div>
        <DialogContent dividers>
          <Typography variant="h6">{recoms} New Recommendations</Typography>
        <Typography variant="caption">Pressing apply below will shift all current Recommendations with Updated Recommendations, which might be better, but you have the option to press the Green button in every bundle grid to do it for single bundle. Doing it here applies it to every Bundle. We do updates for all your products at around 00:00 UTC everyday.</Typography><br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyNew} color="primary">
            Apply
          </Button>
        </DialogActions>
        <DialogContent dividers>
        <Typography variant="h6">{curRecoms} Apply-able Recommendations</Typography>
        <Typography variant="caption">Pressing Apply below this dialog will shift all auto recommended products to Selected Products, which will then appear as a bundle with the Source Product.</Typography><br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyRecoms} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}