import React from 'react';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import { SketchPicker } from 'react-color';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import Style from 'style-it';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Link from 'next/link';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import BallotIcon from '@material-ui/icons/Ballot';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import AppsIcon from '@material-ui/icons/Apps';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import NoSsr from '@material-ui/core/NoSsr';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TuneIcon from '@material-ui/icons/Tune';
// import Debut from '../templates/TemplatePreviews/debut'

import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

import BundleInstance from '../API-instances/BundleInstance'
import GetBundleInstance from '../API-instances/BundleGetInstance'
import DefaultLivePreview from '../templates/HTML/1'
import Container from '@material-ui/core/Container';

import Menu from '@material-ui/core/Menu';

import GetProductsLive from '../API-instances/BundleLivePreviewProducts'
import ColorPicker from "../components/configuration-panel/colorPicker";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var AnalysisType = "Overall"
const ColorLinearProgress = withStyles({
colorPrimary: {
    backgroundColor: '#b2dfdb',
},
barColorPrimary: {
    backgroundColor: '#00695c',
},
})(LinearProgress);

const data = {
  labels: ["3rd May", "6th May", "9th May", "12th May", "15th May", "18 May"],
  datasets: [
    {
      label: "Views",
      data: [233, 453, 385, 541, 244, 465],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Add to Cart",
      data: [133, 225, 135, 251, 254, 176],
      fill: false,
      borderColor: "#742774"
    }
  ]
};

const data2 = {
  labels: ["3rd May", "6th May", "9th May", "12th May", "15th May", "18 May"],
  datasets: [
    {
      label: "Sales",
      data: [125, 153, 185, 141, 144, 265],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};

const options = {
  animationEnabled: true,
  responsive: true,
  maintainAspectRatio: true,
  responsiveAnimationDuration: 1000,
  theme: "dark2",
  title: {
    display: true,
    text: "Impressions and Add To Carts"
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    ]
  }
};

const options2 = {
  animationEnabled: true,
  responsive: true,
  maintainAspectRatio: true,
  responsiveAnimationDuration: 1000,
  theme: "dark2",
  title: {
    display: true,
    text: "Sales Generated"
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    ]
  }
};

const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14
  }
};


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FrequentlyBought() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const anchorRef = React.useRef(null);
  const [MenuOpen, setMenuOpen] = React.useState(false);
  const [SkeletonDisplay, setSkeletonDisplay] = React.useState('block');
  const [PrevDisplay, setPrevDisplay] = React.useState('none');
  const [displayProgress, setDisplayProgress] = React.useState('block');
  const bull = <span className={classes.bullet}>•</span>;
  const [save, saveOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [previewBody, setPreviewBody] = React.useState({ __html: "<div></div>" })

  const [previewData, setPreviewData] = React.useState({ 
    title: "Frequently Bought Products",
    titleColor: "#000",
    buttonText: "Add Bundle To Cart",
    buttonBackground: "#000",
    buttonTextColor: "#fff",
    buttonBorderColor: "#fff",
    buttonHoverBackground: "#fff",
    buttonHoverTextColor: "#000",
    buttonHoverBorderColor: "#000"
  })

  const [loaded, setLoaded] = React.useState(false)

  const [res, setPreviewRes] = React.useState({
    data: {}
  })

  const [number, setNumber] = React.useState(0)

  React.useEffect(() => {
    if (number === 0) {
      setNumber(number+1)
    } else{
      const timer = setTimeout(() => {
        setDisplayProgress('block')
        saveBundleConfigs()
        setDisplayProgress('none')
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [previewData])

  function saveBundleConfigs() {
    axios.post('https://912288751566.ngrok.io/api/saveBundleInfo', {
      bundleConfigs: previewData
    })
    .then((response) => {
      console.log("Updated database with following stuff:", response);
    }, (error) => {
      console.log(error);
    });
  }

  const handlePanelChanges = (e) => {
    var key = e.target.name
    var value = e.target.value
    var obj = Object.assign({}, previewData)
    obj[key] = value
    setPreviewData(obj)
  }

  const handleColorChanges = (color, key) =>{
    var value = color
    var obj = Object.assign({}, previewData)
    obj[key] = value
    setPreviewData(obj)
  }

  React.useEffect(() => {
    if (loaded === true) {
      setSkeletonDisplay('none')
      loadPreview()
    }
  }, [previewData])

  React.useEffect(() => {
    GetProductsLive({
      method: "GET"
    }).then(async (res) => {
      setPreviewRes({ data: await res.data })
      setLoaded(true)
    })
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      if (loaded === true) {
        loadPreview()
        axios.get('https://912288751566.ngrok.io/api/getBundleInfo')
        .then((response) => {
          setPreviewData(response.data)
          setDisplayProgress('none')
        }, (error) => {
          console.log(error);
        });
      }      
    }, 3000);
  }, [loaded])

  const loadPreview = () => {
    var DiscountAmount = Math.round((res.data.Discount / 100) * parseInt(Math.trunc(res.data.products[0].variants[0].price)) + parseInt(Math.trunc(res.data.products[1].variants[0].price)))
      var TotalPrice = parseInt(Math.trunc(res.data.products[0].variants[0].price)) + parseInt(Math.trunc(res.data.products[1].variants[0].price))
      var DiscountedPrice = TotalPrice - DiscountAmount

      let DisplayPriceText 

      if (res.data.Discount > 0) {
        DisplayPriceText = `<span style="color: #1bbf3c;">${DiscountedPrice} ${res.data.currency}</span> <span style="text-decoration: line-through; color: gray;">${TotalPrice} ${res.data.currency}</span>`
      } else {
        DisplayPriceText = `<span style="color: #1bbf3c;">${TotalPrice} ${res.data.currency}</span>` 
      }   

      let sourceVariant
      let selectVariant

      var countSource = 0
      var sourceVariants = res.data.products[0].variants.map((v, index) => { 
        if (v.inventory_quantity < 1) {
          return `<option disabled value=${v.id}>${v.title} - Sold Out</option>`;
        } else {
          if (countSource < 1) {
            sourceVariant = index
            countSource = countSource + 1
          }
          return `<option value=${v.id}>${v.title}</option>`;                  
        }
      })

      var countSelect = 0
      var selectVariants = res.data.products[1].variants.map((v, index) => {                 
        if (v.inventory_quantity < 1) {
          return `<option disabled value=${v.id}>${v.title} - Sold Out</option>`;
        } else {                  
          if (countSelect < 1) {
            selectVariant = index
            countSelect = countSelect + 1
          }
          return `<option value=${v.id}>${v.title}</option>`;
        }
      })

      var sourceProductVariantText = res.data.products[0].title + " - " + res.data.products[0].variants[0].title + " - " + res.data.products[0].variants[0].price + ` ${res.data.currency}`
      var selectProductVariantText = res.data.products[1].title + " - " + res.data.products[1].variants[0].title + " - " + res.data.products[1].variants[0].price + ` ${res.data.currency}`
      
      setPreviewBody({ __html: `
        <h3 class='shopLee_title' style="color: ${previewData.titleColor} !important;">${previewData.title}</h3>
        <div class="shopLee_triple">
        <div class="shopLee_sideByside shopLee_product">
        <a href='/products/${res.data.products[0].handle}'>
        <img class="shopLee_productFirstImage" src='${res.data.products[0].image.src}' />
          </a>
          </div>
        <div class="shopLee_sideBysideIcon shopLee_icon">
        <img class="shopLee_plus" src="https://cdn.shopify.com/s/files/1/0278/4611/5389/t/1/assets/plus.svg?v=1591170063" alt="plus-icon" />
          </div>
        <div class="shopLee_sideByside shopLee_product">
        <a href='/products/${res.data.products[1].handle}'>
        <img class="shopLee_productSecondImage" src='${res.data.products[1].image.src}' />
          </a>
          </div>
        <br style="clear: left;" />
          </div>
        <div class="shopLee_price">
        <input onClick="disableCheck()" checked type="checkbox" id="productSource" name="productSource" value="SourceProduct">
        <label id="sourceProductVariantTxt" for="productSource">${sourceProductVariantText}</label>
        <select class="shopLee_variantSelect" name="Variants" id="sourceProductVariants">
        ${sourceVariants}
          </select>
        <br>
        <input onClick="disableCheck()" checked type="checkbox" id="productSelect" name="productSelect" value="SelectProduct">
        <label id="selectProductVariantTxt" style="margin-top: 8px;" for="productSelect">${selectProductVariantText}</label>
        <select class="shopLee_variantSelect" name="Variants" id="selectProductVariants">
        ${selectVariants}
        </select>
        <br>
        <p id="shopLee_pricing" class="shopLee_priceText">${DisplayPriceText}</p>
        <button class="shopLee_button">${previewData.buttonText}</button>
        </div>
        <style>
        .shopLee_button {
          background-color: ${previewData.buttonBackground} !important;
          color: ${previewData.buttonTextColor} !important;
          border-color: ${previewData.buttonBorderColor} !important;
        }
        .shopLee_button:hover {
          background-color: ${previewData.buttonHoverBackground} !important;
          color: ${previewData.buttonHoverTextColor} !important;
          border-color: ${previewData.buttonHoverBorderColor} !important;
        }
        </style>
      `})
  }

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -387) {
      console.log(currPos.y)
    } else {
      return ;
    }
  })

  const handleClickUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const saveSuccess = () => {
    saveOpen(true);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(MenuOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && MenuOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = MenuOpen;
  }, [MenuOpen]);

  return (
  <NoSsr>
    <div className={classes.root}>
    <CssBaseline />
      <ColorLinearProgress style={{ display: displayProgress, margin: "0", position: "fixed", top: "0px", width: "100%", zIndex: "9999" }} className={classes.margin} />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >          
        <Toolbar>        
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Bundle Display Configurations
          </Typography>
          <IconButton style={{"position":"absolute","right":"33px","fontSize":"2.5em"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickUser}>
           <AccountCircleRoundedIcon style={{ color: "black" }} />
          </IconButton>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseUser}
          >
          <MenuItem onClick={handleCloseUser}>Account</MenuItem>
          <MenuItem onClick={handleCloseUser}>Bundle Configs</MenuItem>
          </Menu>
          {/* pagename */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        style={{
          "background":"#313140",
          "color":"white"
        }}
      >
        <div className={classes.toolbar}>
        <img style={{"height":"37px"}} src="https://cdn.shopify.com/s/files/1/0278/4611/5389/t/1/assets/SHOP.png?v=1591108196" alt=""/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: "white" }}/> : <ChevronLeftIcon style={{ color: "white" }}/>}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button key={"Dashboard"}>
            <Link href="/" shallow={true}>
              <ListItemIcon><AssessmentIcon style={{ color: "white" }} /></ListItemIcon>
            </Link>
            <Link href="/" shallow={true}>
              <ListItemText primary={"Dashboard"} />
            </Link>
          </ListItem>     
           
          <ListItem button key={"Configurations"}>
            <Link href="/bundle-configuration" shallow={true}>
              <ListItemIcon><TuneIcon style={{ color: "white" }} /></ListItemIcon>
            </Link>
            <Link href="/bundle-configuration" shallow={true}>
              <ListItemText primary={"Configurations"} />
            </Link>
          </ListItem>     

          <ListItem button key={"Bundles"}>
            <Link href="/bundles" shallow={true}>
              <ListItemIcon><AddShoppingCartIcon style={{ color: "white" }} /></ListItemIcon>
            </Link>
            <Link href="/bundles" shallow={true}>
              <ListItemText primary={"Bundles"} />
            </Link>
          </ListItem>     
        </List>
        <Divider />
        <List>
        <ListItem button key={"Settings"}>
          <Link href="/settings" shallow={true}>
            <ListItemIcon><SettingsIcon style={{ color: "white" }} /></ListItemIcon>
          </Link>
          <Link href="/settings" shallow={true}>
            <ListItemText primary={"Settings"} />
          </Link>
        </ListItem>      
        <ListItem button key={"Account"}>
          <Link href="/account" shallow={true}>
            <ListItemIcon><AccountBoxIcon style={{ color: "white" }} /></ListItemIcon>
          </Link>
          <Link href="/account" shallow={true}>
            <ListItemText primary={"Account"} />
          </Link>
        </ListItem>       
        <ListItem button key={"FAQ"}>
          <Link href="/frequently-asked-questions" shallow={true}>
            <ListItemIcon><LiveHelpIcon style={{ color: "white" }} /></ListItemIcon>
          </Link>
          <Link href="/frequently-asked-questions" shallow={true}>
            <ListItemText primary={"FAQ"} />
          </Link>
        </ListItem>        
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />       
        <Paper style={{"marginBottom":"24px","position":"relative","marginTop":"-24px","padding":"14px"}}>
        <Typography variant="h5">Bundle Configuration Panel</Typography>
        <Typography variant="caption">This is where you may change the settings for your bundles! Like, the title of the snippet and more...</Typography>
        </Paper>  
        <br />
        <Divider />
        <br />  <br /> 
        <Grid container>
          <Grid item xs={7}>
            <Paper style={{ padding: "2em" }} elevation={10}>
              <Typography style={{ marginBottom: ".5em" }} variant="h5">Display Configurations</Typography>
              <Typography variant="caption">Can you please place the below tag in your product page template in your theme, so that we can display our snippet in the exact position? We have normally seen this tag being placed in section/product-template.liquid file. But if you need any sort of help with it, you may drop us an email!</Typography>
              <br />
              <Card style={{"padding":"1em","marginTop":"1em","textAlign":"center","boxShadow":"0px 2px 19px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"}}>
                <Typography variant="caption">{" {% render 'shoplee-bundles' %} "}</Typography>
              </Card>
            </Paper>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
        <div>
        <Grid style={{"position":"absolute","width":"100em","right":"2%","maxWidth":"45%","height":"95em"}} item xs={5}>
          <Paper id="live-preview" style={{"float":"right","padding":"2em","position":"sticky","width":"97%","top":"101px"}} elevation={10}>
            <Typography style={{ marginTop: "-22px" }} variant="h5">Live Preview</Typography>
            <Typography variant="caption">To view a working preview, you have to visit a product in your store. </Typography>
            <Divider />
            <br />
            <div dangerouslySetInnerHTML={previewBody}></div>
            <div style={{ display: SkeletonDisplay }}>
              <Skeleton variant="rect" width={210} height={118}/>
            </div>
          </Paper>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Paper style={{ padding: "2em" }} elevation={10}>
              <Typography style={{ marginBottom: ".25em" }} variant="h5">Title Styling</Typography>
              <Typography variant="caption">Now, you may set the title of the snippet, and adjust some colors!</Typography>
              <br /><br />
              <Typography variant="Overline">
                Title Text
              </Typography><br />
              <form className="customForm" style={{ marginTop: ".6em", width: "100%" }}>
                <TextField id="outlined-basic" label="Display Title" variant="outlined" onChange={handlePanelChanges} name="title" value={previewData.title}/>
              </form>
              <br />
              <Typography variant="Overline">
                Title Color
              </Typography>
              <br />
              <br />
              <ColorPicker handleChangeColor={handleColorChanges} name="titleColor" color={previewData.titleColor} />
              <br />
            </Paper>
          </Grid>
          {/* Preview Block */}
        </Grid>
        <br />
        <Grid container>
          <Grid item xs={6}>
            <Paper style={{ padding: "2em" }} elevation={10}>
              <Typography style={{ marginBottom: ".25em" }} variant="h5">Button Styling</Typography>
              <Typography variant="caption">You can now adjust the colors, and text which will be displayed in the Action Button!</Typography>
              <br /><br />
              <Typography variant="Overline">
                Button Text
              </Typography><br />
              <form className="customForm" style={{ marginTop: ".6em", width: "100%" }}>
                <TextField id="outlined-basic" label="Display Text" variant="outlined" onChange={handlePanelChanges} name="buttonText" value={previewData.buttonText} />
              </form>
              <br />
              <Typography style={{ marginBottom: ".25em" }} variant="Overline">
                Button Background Color
              </Typography>
              <br />
              <br />
              <ColorPicker handleChangeColor={handleColorChanges} name="buttonBackground" color={previewData.buttonBackground} />
              <br /><br />
              <Typography style={{ marginBottom: ".25em" }} variant="Overline">
                Button Text Color
              </Typography>
              <br />
              <br />
              <ColorPicker handleChangeColor={handleColorChanges} name="buttonTextColor" color={previewData.buttonTextColor} />
              <br /><br />
              <Typography style={{ marginBottom: ".25em" }} variant="Overline">
                Button Border Color
              </Typography>
              <br />
              <br />
              <ColorPicker handleChangeColor={handleColorChanges} name="buttonBorderColor" color={previewData.buttonBorderColor} />
              <br />
            </Paper>
          </Grid>
        </Grid>
        <br />
        <Grid container>
          <Grid item xs={6}>
            <Paper style={{ padding: "2em" }} elevation={10}>
              <Typography style={{ marginBottom: ".25em" }} variant="h5">Button Hover Styling</Typography>
              <Typography variant="caption">You can now adjust the colors displayed when the user hovers over the Action Button!</Typography>
              <br /><br />
              <Typography style={{ marginBottom: ".25em" }} variant="Overline">
                Button Background Color
              </Typography>
              <br />
              <br />
              <ColorPicker handleChangeColor={handleColorChanges} name="buttonHoverBackground" color={previewData.buttonHoverBackground} />
              <br /><br />
              <Typography style={{ marginBottom: ".25em" }} variant="Overline">
                Button Text Color
              </Typography>
              <br />
              <br />
              <ColorPicker handleChangeColor={handleColorChanges} name="buttonHoverTextColor" color={previewData.buttonHoverTextColor} />
              <br /><br />
              <Typography style={{ marginBottom: ".25em" }} variant="Overline">
                Button Border Color
              </Typography>
              <br />
              <br />
              <ColorPicker handleChangeColor={handleColorChanges} name="buttonHoverBorderColor" color={previewData.buttonHoverBorderColor} />
              <br />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <br></br>
     <Divider />
     <br></br>
      <Grid container>
          <Paper elevation={20} style={{"padding":"2em","textAlign":"center","margin":"0 17%"}}>
            <Typography variant="h5">Support Our App On Shopify App Store!</Typography>
            <Typography variant="caption">Your support would mean alot to us, so could you please place a review for our app at Shopify App Store? If you need any other kind of support from our side, we are always ready to help!</Typography>
            <br/><br/><Button style={{"background":"black","color":"white"}} variant="contained" >Leave A Review</Button>
          </Paper>
        </Grid>
        <br></br><br></br>
      </main>
    </div>
  </NoSsr>
  );
}
