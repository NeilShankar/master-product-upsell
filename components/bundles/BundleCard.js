import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Image from 'material-ui-image'
import SettingsIcon from '@material-ui/icons/Settings';
import BundleDiscount from '../../API-instances/BundleDiscount'
import BundleAllDiscount from '../../API-instances/BundleAllDiscount'

import Input from '@material-ui/core/Input';

import clsx from 'clsx';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "150px",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "& svg": {
      margin: theme.spacing(1.5)
    },
    "& hr": {
      margin: theme.spacing(0, 0.5)
    }
  },
  textField: {
    width: '25ch',
  },
}));

const BundleCards = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [Discount, setDiscount] = React.useState(props.Discount)

  React.useEffect(() => {
    setDiscount(props.Discount);
  }, [props]);

  const setProd = () => {
    props.selectProduct(props.prod_id)
  }

  const openApplySingle = () => {
    var sProd = {"Title": props.SelectedProduct, "Image": props.SelectedProductImage, "Id": props.SelectedID}
    var rProd = {"Title": props.RecommendedProduct, "Image": props.RecommendedProductImage, "Id": props.RecommendedID}
    var newRec = {"Title": props.NewRecom.Title, "Image": props.NewRecom.ImageSrc, "Id": props.NewRecom.Id}
    props.applyS(sProd, rProd, props.Id, newRec)
  }

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const isInitialMount = React.useRef(true);

  const discountChange = (e) => {
    const re = /^[0-9\b]+$/

    if (e.target.value === '' || re.test(e.target.value)) {
        setDiscount(e.target.value)
    }
  };

  React.useImperativeHandle(ref, () => ({

    changeDiscountsForAll(value) {
      BundleAllDiscount({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          "Discount": value
        }
      }).then((res) => {
        props.changedDiscAll(value)
      })
    }

  }));

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
     } else {
        changeDiscount()
    }
  }, [Discount])

  function changeDiscount() {
    BundleDiscount({
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      data: {
        "prod_id": props.Id,
        "Discount": Discount
      }
    }).then(() => {
      props.discountChangeSingle(Discount, props.Id)
    })
  }

  return (

    <div>
      <Grid style={{ boxShadow: "0px 0px 20px -6px rgba(156,150,156,1)" }} container alignItems="center" className={classes.root}>
            <Grid item xs style={{ textAlign: "center" }}>
                <div style={{"display":"inline-block","float":"left","marginLeft":"5%","height":"auto","width":"30%"}}>
                    <img style={{"width":"101px","height":"92%"}} src={props.SourceProductImage}/>
                </div>
                <div>
                    <Typography style={{ color: "black", marginTop: "15px", fontWeight: "bold", fontSize: ".9rem" }} variant="h6" gutterBottom>
                    {props.SourceProduct}
                    </Typography>
                </div>
            </Grid>        
            <Divider orientation="vertical" flexItem />
            <Grid item xs alignItems="center" textAlign="center" style={{ textAlign: "center" }}>
                <div onClick={openApplySingle} style={{ marginLeft: ".5%", marginTop: "73px"}} class="icon">
                    <i></i>
                </div>
                <div style={{"display":"inline-block","float":"left","marginLeft":"5%","height":"auto","width":"30%"}}>
                    <img style={{"width":"101px","height":"92%"}} src={props.RecommendedProductImage}/>
                </div>
                <div>
                    <Typography style={{ color: "black", marginTop: "15px", fontWeight: "bold", fontSize: ".9rem" }} variant="h6" gutterBottom>
                    {props.RecommendedProduct}
                    </Typography>
                </div>
            </Grid>  
            <Divider orientation="vertical" flexItem />
            <Grid item xs alignItems="center" textAlign="center" style={{ textAlign: "center" }}>
                <div onClick={setProd} style={{ "cursor": "pointer","display":"inherit","position":"absolute","margin":"58px -9px" }}>
                    <SettingsIcon style={{ color: "dark-gray", width: "18px"}} />
                </div>
                <div style={{"display":"inline-block","float":"left","marginLeft":"5%","height":"auto","width":"30%"}}>
                    <img style={{"width":"101px","height":"92%"}} src={props.SelectedProductImage}/>
                </div>
                <div>
                    <Typography style={{ color: "black", marginTop: "15px", fontWeight: "bold", fontSize: ".9rem" }} variant="h6" gutterBottom>
                    {props.SelectedProduct}
                    </Typography>
                </div>
            </Grid>  
            <Divider orientation="vertical" flexItem />
            <Grid item xs alignItems="center" textAlign="center" style={{ textAlign: "center" }}>
            <TextField
            label="Discount"
            value={Discount}
            onChange={discountChange}
            id="standard-start-adornment"
            className={clsx(classes.textField)}
            InputProps={{
             endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            />
            </Grid> 
      </Grid>
    </div>
  );
})

export default BundleCards