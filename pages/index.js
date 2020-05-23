import React from 'react';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
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
import { Line, Bar } from "react-chartjs-2";
import NoSsr from '@material-ui/core/NoSsr';

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

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [metrics, setMetrics] = React.useState({
  //   views: 0,
  //   addToCarts: 0,
  //   sales: ""
  // });
  const anchorRef = React.useRef(null);
  const [MenuOpen, setMenuOpen] = React.useState(false);
  const [displayProgress, setDisplayProgress] = React.useState('block');
  const bull = <span className={classes.bullet}>•</span>;

  React.useEffect(() => {
    setDisplayProgress('none')    
  }, [])

  // Get Sales Metric

  // React.useEffect(() => {
  //   GetMetricSales({
  //     method: "GET"
  //   }).then((response) => {
      
  //   })
  // }, [])

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
      >
        <div className={classes.toolbar}>
        <Typography variant="h6" noWrap>
            Navigation Panel
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button key={"Dashboard"}>
          <Link href="/" color="inherit">
            <ListItemIcon><AssessmentIcon /></ListItemIcon>
          </Link>
          <Link href="/" color="inherit">
            <ListItemText primary={"Dashboard"} />
          </Link>
        </ListItem>      
        <ListItem button key={"Bundles"}>
          <Link href="/bundles" color="inherit">
            <ListItemIcon><AddShoppingCartIcon /></ListItemIcon>
          </Link>
          <Link href="/bundles" color="inherit">
            <ListItemText primary={"Bundles"} />
          </Link>
        </ListItem>           
        </List>
        <Divider />
        <List>
        <ListItem button key={"Settings"}>
          <Link href="/settings" color="inherit">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
          </Link>
          <Link href="/settings" color="inherit">
            <ListItemText primary={"Settings"} />
          </Link>
        </ListItem>      
        <ListItem button key={"Account"}>
          <Link href="/account" color="inherit">
            <ListItemIcon><AccountBoxIcon /></ListItemIcon>
          </Link>
          <Link href="/account" color="inherit">
            <ListItemText primary={"Account"} />
          </Link>
        </ListItem>       
        <ListItem button key={"FAQ"}>
          <Link href="/frequently-asked-questions" color="inherit">
            <ListItemIcon><LiveHelpIcon /></ListItemIcon>
          </Link>
          <Link href="/frequently-asked-questions" color="inherit">
            <ListItemText primary={"FAQ"} />
          </Link>
        </ListItem>        
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />       
        <HeaderBar />
        <br />
        <Divider />
        <br></br>
        <Typography variant="h6">
          Overall Performance
        </Typography>
        <br></br>
        <Grid container spacing={3}>
        <Grid item xs>
          <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
              Impressions<br/><br/>
              <Typography style={{ fontWeight: "bold" , color: "black" }} variant="h5">
                  15k <FontAwesomeIcon style={{ color: "red" }} icon={faArrowDown} />                                  
              </Typography>           
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
              Add to Carts<br/><br/>
              <Typography style={{ fontWeight: "bold" , color: "black" }} variant="h5">
                  700 <FontAwesomeIcon style={{ color: "green" }} icon={faArrowUp} />
              </Typography>
              </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
              Sales Generated<br/><br/>
              <Typography style={{ fontWeight: "bold" , color: "black" }} variant="h5">
                  $1.2k <FontAwesomeIcon style={{ color: "green" }} icon={faArrowUp} />
              </Typography>
              </Paper>
        </Grid>
      </Grid>
        <br></br><br></br>
        <Typography variant="h5">
          Breakdown Performance
        </Typography>
        <Typography variant="caption" display="block">
        Choose from a range of analysis options for your store!
        </Typography>
        <br></br>
        <DropdownMenu />
        <DateRange style={{ float: "right" }}/>
        <br></br>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
              <Line data={data} options={options} legend={legend}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
              <Bar data={data2} options={options2} legend={legend}/>
            </Paper>
          </Grid>
        </Grid>
        <br></br><br></br>
        <Typography variant="h5">Top Performing Products</Typography>
        <Typography variant="caption" display="block">
        View your top 5 performing product bundles.
        </Typography>
        <br></br>
        <Container>
            <ProGrid />
        </Container>        
      </main>
    </div>
    </NoSsr>
  );
}
