import React from 'react';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
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
  const [bundleTitle, setBundleTitle] = React.useState('Frequently Bought Products')
  const [bundleTheme, setBundleTheme] = React.useState(1)

  const [ProductTitle, setProductTitle] = React.useState('')
  const [ProductPrice, setProductPrice] = React.useState('')
  const [ProductImage, setProductImage] = React.useState('')

  const [Product1Image, setProduct1Image] = React.useState('')
  const [Product1Price, setProduct1Price] = React.useState('')
  const [Product1Title, setProduct1Title] = React.useState('')

  const [TotalPrice, setTotalPrice] = React.useState('')


  const anchorRef = React.useRef(null);
  const [MenuOpen, setMenuOpen] = React.useState(false);
  const [SkeletonDisplay, setSkeletonDisplay] = React.useState('block');
  const [PrevDisplay, setPrevDisplay] = React.useState('none');
  const [displayProgress, setDisplayProgress] = React.useState('block');
  const bull = <span className={classes.bullet}>•</span>;
  const [save, saveOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    GetBundleInstance({
      method: "GET"
    }).then((res) => {
      setBundleTitle(res.data.Title)
      setDesignTheme(res.data.Theme)
    })
  }, []);

  
React.useEffect(() => {
  GetProductsLive({
    method: "GET"
  }).then((response) => {
    setProductTitle(response.data.ProductTitle)
    setProductImage(response.data.ProductImage)
    setProductPrice(response.data.ProductPrice)
    setProduct1Price(response.data.Product1Price)
    setProduct1Image(response.data.Product1Image)
    setProduct1Title(response.data.Product1Title)
    setTotalPrice(response.data.TotalPrice)
    setDisplayProgress('none')
    setSkeletonDisplay('none')
    setPrevDisplay('block')
  })
}, [])

  const saveSuccess = () => {
    saveOpen(true);
  };

  const saveClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    saveOpen(false);
  };

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const changeTitle = (e) => {
    setBundleTitle(e.target.value);
  }

  const changeTheme = (e) => {
    setBundleTheme(e.target.value);
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setMenuOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setMenuOpen(false);
    }
  }

  function saveBundleInfo(e) {
    setDisplayProgress('block')
    e.preventDefault()
    BundleInstance({
      method: 'POST',
      data: {
        Title: bundleTitle,
        Theme: designTheme
      }
    }).then((response) => {
      console.log("Updated")
      setDisplayProgress('none')
      saveSuccess()
    })
  }  

  function createLiveMarkup() { return {__html: DefaultLivePreview(bundleTitle, ProductTitle, ProductPrice, ProductImage, Product1Title, Product1Price, Product1Image, TotalPrice)}; };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(MenuOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && MenuOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = MenuOpen;
  }, [MenuOpen]);

  const [designTheme, setDesignTheme] = React.useState('10');

  const handleChange = (event) => {
    setDesignTheme(event.target.value);
  };

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
        <Typography variant="h5">
            Bundles Configuration
        </Typography>   
        <Typography variant="caption">
            Setup configurations for displaying frequently bought products on your Store.
        </Typography> 
        <Button variant="contained" style={{ float: "right" }} onClick={saveBundleInfo} color="primary" startIcon={<SaveIcon />}>
        Save
        </Button>
        <br></br><br></br>
        <Divider/>
        <br></br><br></br>
        <Grid>
            <Grid item xs={6}> 
                <Paper style={{ padding: "33px"}} elevation={20}>
                    <Typography variant="h6">
                        Display Setup
                    </Typography> 
                    <Typography variant="caption">
                        Include the code below in your product template, wherever you want the frequently bought products to appear! If you need any sort of assistance in doing this please do not hesitate, we recommend if you are not comfortable with editing your theme files, you may contact us to prevent any errors in your theme.
                    </Typography> 
                    <br></br><br></br>
                    <Paper variant="outlined" style={{ backgroundColor: "rgb(176, 179, 184)", padding: "11px 23%"}}>
                        {"{% render 'frequently-bought-products' %}"}
                    </Paper>
                </Paper>  
            </Grid>            
        </Grid>
        <br></br><br></br>
        <Divider/>
        <br></br>
        <Grid>
            <Grid style={{ height: "44%"}} item xs={6}> 
                <Paper style={{ padding: "33px"}} elevation={20}>
                    <Typography variant="h6">
                        Display Customizations
                    </Typography>    
                    <Typography variant="caption">
                        Now you can configure how the snippet will look in your store, you can choose from our pre-built themes and change the title of the snippet! If you feel like you need a custom design for your store, please don't hesitate to contact us!
                    </Typography>      
                    <br></br><br></br>      
                    <Typography variant="overline">
                       Title
                    </Typography><br></br>
                    <TextField style={{ width: "100%" }} id="outlined-basic" label="Enter Title Here" variant="outlined" value={bundleTitle} onChange={changeTitle}/>
                    <br></br><br></br>
                    <Typography variant="overline">
                    Theme
                    </Typography><br></br>
                    <FormControl variant="outlined" style={{ width: "100%"}}>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={designTheme}
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Debut</MenuItem>
                    <MenuItem value={20}>Flow</MenuItem>
                    </Select>
                </FormControl>
                </Paper>  
            </Grid>   
            <Grid item style={{ width: "48%", float: "right", marginTop: "-33%" }}>
                <Paper style={{ padding: "34px" }}elevation={20}>
                    <br></br><br></br>
                    <Container style={{ display: SkeletonDisplay }}>
                      <Skeleton animation="wave" variant="text" />
                      <Skeleton animation="wave" variant="rect" width={210} height={165} />
                      <Skeleton animation="wave" variant="text" width={135} height={40} />
                      <Skeleton animation="wave" variant="text" />
                      <Skeleton animation="wave" variant="text" />
                      <Skeleton animation="wave" variant="rect" />
                    </Container>
                    <Container style={{ display: PrevDisplay }} id="LivePreviewBox" dangerouslySetInnerHTML={createLiveMarkup()}>

                    </Container>
                </Paper>
            </Grid>         
        </Grid>
        <Snackbar open={save} autoHideDuration={6000} onClose={saveClose}>
          <Alert onClose={saveClose} severity="success">
            Saved Successfully
          </Alert>
        </Snackbar>
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
