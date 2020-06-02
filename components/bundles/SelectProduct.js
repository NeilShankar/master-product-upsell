import React, { useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import GetAllProducts from "../../API-instances/GetAllProducts"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SelectProductComp = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([])
  const [ori, setOri] = React.useState([])
  const [search, setSearch] = React.useState("")
  const [originalProds, setOriginalProds] = React.useState([])
  const [filteredProds, setFilteredProds] = React.useState([])
  const [Product, setProduct] = React.useState(0)

  const handleSearch = (e) => {
    setSearch(e.target.value)
    var Rprod = []
    var Rprod = [...ori]
    setProducts(Rprod)
  }


  React.useEffect(() => {
    if (search.length > 0) {
        var newArray = products.filter(function (el) {
        var productTitle = el.title
        var s = search

        var filteredS = s.toLowerCase()
        var filteredTitle = productTitle.toLowerCase()
        return filteredTitle.includes(filteredS)
    });
      
      setProducts(newArray)
    }
  }, [search])

 
  React.useImperativeHandle(ref, () => ({
    handleClickOpen(id) {
        var arrayData = []
        var data = [...products]
        setProduct(parseInt(id))

        data.forEach(element => {
          if (element.id == parseInt(id)) {
            return ;
          } else {
            arrayData.push(element)
          }
        });

        setProducts(arrayData)
        setOri(arrayData)
        setOpen(true)
    }
  }))

  React.useEffect(() => {
    GetAllProducts({
      method: "GET"
    }).then((res) => {
      setProducts(res.data)
      setOriginalProds(res.data)
    })
  }, [])

const handleClose = () => {
    setOpen(false);
    setProducts(originalProds)
    
}

function SelectProduct(id) {
  handleClose()
  props.UpdateSelectProduct(id, Product)
}

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Change Selected Product</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="alert-dialog-description">
            When you select a different product, that will appear as a bundle for your customers on storefront.
          </DialogContentText>
          <Paper elevation={5} component="form" className={classes.root}>
            <InputBase
            value={search}
            onChange={handleSearch}
            className={classes.input}
            placeholder="Search For Products"
            inputProps={{ 'aria-label': 'Search For Products' }}
            />
            <IconButton className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper><br /><Divider></Divider><br />
          <div>
          {products.map((product) =>
          <>
          <Card onClick={() => SelectProduct(product.id)} style={{ cursor: "pointer", boxShadow: "0px 0px 5px 0px rgba(143,140,143,1)" }}>
            <Grid container justify="center">
              <Grid item xs={2}>
                <img style={{ "width": "85px", "margin-left": "45%"}} src={product["image"]} alt=""/>
              </Grid>
              <Divider orientation="vertical" style={{ "margin-left": "15%", "height": "4.9em", "width": "2px"}}/>
              <Grid item xs style={{ textAlign: "center" }}>
                <Typography style={{ "fontWeight":"bold","fontSize":"16px", "margin": "22px 0" }} variant="h5">
                {product.title}
                </Typography>
              </Grid>
            </Grid>
          </Card> 
          <br />
          </>
          )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})


export default SelectProductComp