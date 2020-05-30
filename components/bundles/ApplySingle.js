import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SelectedNotSame from '../ConditionalRenderingElems/SelectedNotSame'
import SelectedSame from '../ConditionalRenderingElems/SelectedSame'
import NewRecomNotSame from '../ConditionalRenderingElems/NewRecomNotSame'
import NewRecomSame from '../ConditionalRenderingElems/NewRecomSame'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ApplySingle = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [selectedSame, setSelectedSame] = React.useState(false)
  const [bunId, setBID] = React.useState("")
  const [selectedProduct, setSelectedProduct] = React.useState({
      "Title": "",
      "Image": "",
      "Id": ""
  })

const [newRecom, setNewRecom] = React.useState({
    "Title": "",
    "Image": "",
    "Id": ""
})

  const [recommendation, setRecommendation] = React.useState({
    "Title": "",
    "Image": "",
    "Id": ""
  })

  const changedSelected = () => {
      setSelectedProduct(recommendation)
      props.ChangeSelectedProduct(bunId, recommendation)
  }

  const chRecoms = () => {
      setRecommendation(newRecom)
      props.ChangeRecommendedProduct(bunId, newRecom)
  }

  React.useImperativeHandle(ref, () => ({
    openApplySingle(sProd, rProd, bId, newRec) {
        setOpen(true);
        setSelectedProduct(sProd)
        setBID(bId)
        setRecommendation(rProd)
        setNewRecom(newRec)
    }
  }))

  const handleClose = () => {
    setOpen(false);
  };

let recommendationShift
if (selectedProduct.Id === recommendation.Id) {
    recommendationShift = <SelectedSame selectedProductImage={selectedProduct.Image} selectedProductTitle={selectedProduct.Title} handleClose={handleClose} />
} else {
    recommendationShift = <SelectedNotSame changeSelect={changedSelected} bundleID={bunId} selectedId={selectedProduct.Id} selectedProductImage={selectedProduct.Image} selectedProductTitle={selectedProduct.Title} recommendationImage={recommendation.Image} recommendationTitle={recommendation.Title} handleClose={handleClose}/>
}

let newRecommendation

if (newRecom.Id === recommendation.Id || newRecom.Id === "None") {
    newRecommendation = <NewRecomSame />
} else {
    newRecommendation = <NewRecomNotSame bundleID={bunId} changeRecoms={chRecoms} newRecomInfo={newRecom} Recom={recommendation}/>
}

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers>
          <Typography variant="h6">
            Replace Selected Product
          </Typography>
          <Typography variant="caption">
            Pressing apply will replace the Selected product for the current Product, and will appear as a bundle in storefront.
          </Typography>       
          {recommendationShift}
        </DialogContent>
        <DialogContent dividers>
          <Typography variant="h6">
            Apply New Recommendations
          </Typography>
          <Typography variant="caption">
            Pressing apply will replace the current Recommendation with the new recommendation, as shown below! Updates are run every day at around 00:00 UTC for every product.
          </Typography>
          {newRecommendation}
        </DialogContent>
      </Dialog>
    </div>
  );
})

export default ApplySingle
