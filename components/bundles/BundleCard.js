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

export default function BundleCards(props) {
  const classes = useStyles();
  const [Discount, setDiscount] = React.useState(props.Discount)

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const discountChange = (event) => {
    setDiscount(event.target.value)
    BundleDiscount({
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      data: {
        "prod_id": props.prod_id,
        "discount": Discount
      }
    })
  };

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
                <div style={{ marginLeft: ".5%", marginTop: "73px"}} class="icon">
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
                <div style={{ "display":"inherit","position":"absolute","margin":"58px -9px" }}>
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
}