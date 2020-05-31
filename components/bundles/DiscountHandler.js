   
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DiscountHandler = (props) => {
    const [discountOpen, setDiscountOpen] = React.useState(false);
    const [discountAll, setDiscountAll] = React.useState(0)

    const changeDiscountAll = (e) => {
        setDiscountAll(e.target.value)
    }

    const handleDiscountOpen = () => {
      setDiscountOpen(true);
    };

    const changeDiscAndClose = () => {
        props.changeDiscountAll(discountAll)
        setDiscountOpen(false);
    }
  
    const discountClose = () => {
      setDiscountAll(0)
      props.changeDiscountAll("")
      setDiscountOpen(false);
    };

    const discountCloseOnly = () => {
        setDiscountOpen(false);
      };

    return (
        <>
        <Button variant="outlined" color="primary" onClick={handleDiscountOpen}>
        Options
        </Button>
        <Dialog
            open={discountOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={discountCloseOnly}
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
                value={discountAll}
                onChange={changeDiscountAll}
                id="standard-start-adornment"
                InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={changeDiscAndClose} color="primary">
                Apply
            </Button>
            <Button onClick={discountClose} color="secondary"  variant="contained">
                Reset
            </Button>
            </DialogActions>
        </Dialog>
      </>
    )
}

export default DiscountHandler