import React from 'react';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import GetStoreInfo from '../API-instances/StoreInfo'
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DropdownMenu from '../components/dashboard/dropdownMenu'
import DateRange from '../components/dashboard/dateRange'
import ProGrid from '../components/dashboard/productGrid'
import HeaderBar from '../components/dashboard/HeaderBar'

import Container from '@material-ui/core/Container';
import axios from 'axios'
import TuneIcon from '@material-ui/icons/Tune';
import { Line, Bar } from "react-chartjs-2";
import NoSsr from '@material-ui/core/NoSsr';

import Grow from '@material-ui/core/Grow';
import NextNprogress from 'nextjs-progressbar';
import GetMetrics from '../API-instances/StoreMetrics'

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
    background:"white",
    color:"black"
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
    background:"#313140",
    color:"white"
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

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [MenuOpen, setMenuOpen] = React.useState(false);
  const [displayProgress, setDisplayProgress] = React.useState('block');
  const bull = <span className={classes.bullet}>•</span>;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [firstTime, setFirstTime] = React.useState(true)
  const [checkTimer, setCheckTimer] = React.useState(0)
  const [user, setUser] = React.useState({
    name: "",
    store: "",
  })

  React.useEffect(() => {
    if (sessionStorage.getItem('firstTime') !== null) {
      if (sessionStorage.getItem('firstTime') === true) {
        setFirstTime(true)
        localStorage.removeItem('bundlesData')
        localStorage.removeItem('BundleConfig')
        localStorage.removeItem('userData')
        localStorage.removeItem('PreviewRes')
      } else {
        setFirstTime(false)
      }
    } else {
      checkBundlesInitialised()
      setInterval(checkBundlesInitialised, 15000)
    }
  }, [])

  async function checkBundlesInitialised() {
    if (firstTime === true) {
      console.log("Checking.")
      axios.get(`${process.env.REACT_APP_HOST}/api/checkFirstTime`)
      .then((res) => {
        if (res.data === true) {
          setFirstTime(true)
          localStorage.removeItem('bundlesData')
          localStorage.removeItem('BundleConfig')
          localStorage.removeItem('PreviewRes')
          localStorage.removeItem('userData')
        } else if (res.data === false) {
          setFirstTime(false)
        }
      })
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem('userData') === null) {
      GetStoreInfo({
        method: "GET"
      }).then((response) => {
        setUser({
          name: response.data.User,
          store: response.data.Shop
        })
        localStorage.setItem('userData', JSON.stringify({
          name: response.data.User,
          store: response.data.Shop
        }));
      })
    } else {
      var userData = JSON.parse(localStorage.getItem('userData'))
      setUser(userData)
    }
  }, []);

  const handleClickUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const [metric, setMetric] = React.useState({
    Sales: "$0",
    Views: 0,
    AddToCarts: 0
  });

  const [conv, setConv] = React.useState({
    SalesColor: "white",
    AddToCartsColor: "white",
    ViewsColor: "white",
  });

  React.useEffect(() => {
    GetMetrics({
      method: "GET"
    }).then((res) => {
      console.log(res.data.Sales)
      setMetric({
        Sales: res.data.Sales,
        Views: res.data.Views,
        AddToCarts: res.data.AddToCart
      })
      setConv({
        SalesColor: res.data.SalesColor,
        AddToCartsColor: res.data.AddToCartColor,
        ViewsColor: res.data.ViewsColor
      })
    })
  }, [])

  React.useEffect(() => {
    setDisplayProgress('none')    
  }, [])

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

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
            Dashboard
          </Typography>
          <IconButton style={{"position":"absolute","right":"33px","fontSize":"2.5em"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickUser}>
           <AccountCircleRoundedIcon style={{ color: "black" }} />
          </IconButton>
          {/* <Typography style={{"position":"absolute","right":"33px","fontSize":".6em"}} variant="h6"><b>{user.name}</b></Typography> */}
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
           
          <ListItem button key={"Configurations"} style={{ display: (firstTime === true) ? 'none' : 'flex' }}>
            <Link href="/bundle-configuration" shallow={true}>
              <ListItemIcon><TuneIcon style={{ color: "white" }} /></ListItemIcon>
            </Link>
            <Link href="/bundle-configuration" shallow={true}>
              <ListItemText primary={"Configurations"} />
            </Link>
          </ListItem>     

          <ListItem button key={"Bundles"} style={{ display: (firstTime === true) ? 'none' : 'flex' }}>
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
        <ListItem button key={"FAQ"}>
          <Link disabled={firstTime} href="/frequently-asked-questions" shallow={true}>
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
        <Paper style={{"marginBottom":"24px","position":"relative","marginTop":"-24px","padding":"14px", display: (firstTime === false) ? 'block' : 'none' }}>
          <Typography variant="h5">Welcome To ShopLee!</Typography>
          <Typography variant="caption">You are All Setup, and ready to roll! You may view the options on the left navigation, to customize the styles or configure any of your bundles! If you need any help to get started, you may leave us a message in the chat or mail us to neilshankarnath@gmail.com</Typography>
        </Paper> 
      <Grow in={firstTime}>
        <Grid container style={{"margin":"auto","width":"70%", display: (firstTime === true) ? 'block' : 'none' }}>
            <Paper elevation={5} style={{ padding: "2em" }}>
              <Typography variant="h5">Making Bundles - One Time Setup</Typography>
              <br/>
              <Typography style={{"display":"inline-block","maxWidth":"60%"}} variant="caption">Our App is making the perfect combinations of bundles, that will sell a lot! As making a good choice takes a bit of time, our app needs some times (Less than you think). Check back here after a cup of coffee and we will be ready!</Typography>
              <img style={{"width":"196px","height":"auto","position":"absolute","float":"right","right":"21%","top":"14%"}} src="https://i.stack.imgur.com/i6NG3.gif" alt="" />
            </Paper>
          </Grid>
      </Grow>
        <br />
        <HeaderBar />
        <br />
        <Divider />
        <br></br>
        <Typography variant="h6">
          Overall Performance
        </Typography>
        <Typography variant="caption">
          Showing Overall Performance for this Month. Options to view more will be added soon!
        </Typography>
        <br></br><br></br>
        <Grid container spacing={3}>
        <Grid item xs>
          <Paper elevation={20} style={{ background: conv.ViewsColor }} className={classes.paper}>
              Impressions<br/><br/>
              <Typography style={{ fontWeight: "bold" , color: "black" }} variant="h5">
                  {metric.Views}
              </Typography>           
              <img src="https://cdn.shopify.com/s/files/1/0278/4611/5389/t/1/assets/Untitled_design_7.png?v=1591108190" style={{ float: "left", marginTop: "-6em", position: "relative" }} alt="" />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={20} style={{ background: conv.AddToCartsColor }} className={classes.paper}>
              Add to Carts<br/><br/>
              <Typography style={{ fontWeight: "bold" , color: "black" }} variant="h5">
              {metric.AddToCarts}
              </Typography>
              <img src="https://cdn.shopify.com/s/files/1/0278/4611/5389/t/1/assets/Untitled_design_8.png" style={{ float: "left", marginTop: "-6em", position: "relative" }} alt="" />
              </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={20} style={{ background: conv.SalesColor }} className={classes.paper}>
              Sales Generated (Est)<br/><br/>
              <Typography style={{ fontWeight: "bold" , color: "black" }} variant="h5">
                {metric.Sales}
              </Typography>
              <img src="https://cdn.shopify.com/s/files/1/0278/4611/5389/t/1/assets/Untitled_design_9.png" style={{ float: "left", marginTop: "-6em", position: "relative" }} alt="" />
              </Paper>
        </Grid>
      </Grid>
      <br></br><br></br>
        <Divider />
        <br></br><br></br>
        <Grid container>
          <Paper elevation={20} style={{"padding":"2em","textAlign":"center","margin":"0 17%"}}>
            <Typography variant="h5">Support Our App On Shopify App Store!</Typography>
            <Typography variant="caption">Your support would mean alot to us, so could you please place a review for our app at Shopify App Store? If you need any other kind of support from our side, we are always ready to help!</Typography>
            <br/><br/><Button style={{"background":"black","color":"white"}} variant="contained" >Leave A Review</Button>
          </Paper>
        </Grid>
      </main>
    </div>
    </NoSsr>
  );
}
