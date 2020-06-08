import React from 'react';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import InfiniteLoadingList from 'react-simple-infinite-loading'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Zoom from '@material-ui/core/Zoom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import SaveIcon from '@material-ui/icons/Save';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TuneIcon from '@material-ui/icons/Tune';
// import Debut from '../templates/TemplatePreviews/debut'
import InfoIcon from '@material-ui/icons/Info';
import DiscountHandler from '../components/bundles/DiscountHandler'
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import ResetProducts from '../API-instances/ResetSelectedProduct'
import Collapse from '@material-ui/core/Collapse';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';

import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

import BundleInstance from '../API-instances/BundleInstance'
import SelectProduct from '../API-instances/SelectProduct'
import GetBundleInstance from '../API-instances/BundleGetInstance'
import DefaultLivePreview from '../templates/HTML/1'
import Container from '@material-ui/core/Container';
import BundleCard from "../components/bundles/BundleCard";
import SPhandler from "../components/bundles/SelectProductHandler";
import RPhandler from "../components/bundles/RecommendedProductHandler"

import GetAllBundles from '../API-instances/GetAllBundles'
import InfiniteScroll from "react-infinite-scroll-component";
import SelectProductComp from '../components/bundles/SelectProduct'
import ApplySingle from '../components/bundles/ApplySingle'

import EnableBundles from '../components/bundles/Enable'
import { FixedSizeList as ReactList } from 'react-window';

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
  inputRoot: {
    padding: '2px 4px',
    display: 'flex',
    float: "left",
    alignItems: 'center',
    width: 1000,
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

  const [hasMore, setHasMore] = React.useState([true])
  const [ bundles, setBundles ] = React.useState([])

  const [ DisplayBundles, setDisplayBundles ] = React.useState([])
  const [ oriBundles, setOriBundles ] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [totalPage, setTotalPage] = React.useState(1)

  const [displayProgress, setDisplayProgress] = React.useState('block');
  const bull = <span className={classes.bullet}>•</span>;
  const [save, saveOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false)
  const [discountAll, setDiscountAll] = React.useState(0)
  const [search, setSearch] = React.useState({
    term: "",
    items: [],
    timeout: 0,
    searching: false
  })
  const [loaded, setLoaded] = React.useState(false)
  const [searchTimeout, setSearchTimeout] = React.useState(0)

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const discountChangeSing = (Discount, Id) => {
    var updateArr = []
    bundles.forEach(element => {
      var Elem = element
      if (element._id === Id) {
        Elem.Discount = Discount
      }
      updateArr.push(Elem)
    });
    setBundles(updateArr)
    if (search.searching === true) {
      searchFunc(search.term)
    } else {
      setDisplayBundles(paginate(bundles, 10, page))
    }
  }

  const controlSearch = (e) => {
    if (e.target.value === "" || e.target.value.length < 1) {
      setTimeout(() => {
        setPage(1)
        setSearch({ searching: false })
        setDisplayBundles(paginate(bundles, 10, page))
        var rounded = Math.ceil(bundles.length / 10) * 10
        var distance = bundles.length
        
        var pages = rounded / 10

        if (distance > rounded) {
          pages = pages + 1
        }

        setTotalPage(pages)
        setDisplayProgress('none') 
      }, 3000);
    }
  }

  async function handleSearch(e) {
      setSearch({ 
        term: e.target.value,
      })
      
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }      

        setDisplayProgress('block')
        setSearchTimeout({
          timeout: setTimeout(() => {     
            if (search.term !== "") {
              searchFunc(search.term)
            }            
          }, 2000)
        })

        controlSearch(e)
  }

  React.useEffect(() => {    
    if (loaded === true)  {
      setDisplayBundles(paginate(bundles, 10, page))
      var rounded = Math.ceil(bundles.length / 10) * 10
      var distance = bundles.length
      
      var pages = rounded / 10

      if (distance > rounded) {
        pages = pages + 1
      }

      setTotalPage(pages)
    }
  }, [bundles])

  const [pageButtons, setPageButtons]  = React.useState({
    next: true,
    prev: true
  })

  React.useEffect(() => {
      if (page === 1 && totalPage > 1) {
        setPageButtons({
          next: false,
          prev: true
        })
      } else if (totalPage === 1) {
        setPageButtons({
          next: true,
          prev: true
        })
      }
  }, [totalPage])

  
  React.useEffect(() => {
    if (page === 1 && totalPage > 1) {
      setPageButtons({
        next: false,
        prev: true
      })
    } else if (page > 1 && page < totalPage) {
      setPageButtons({
        next: false,
        prev: false
      })
    } else if (totalPage === 1){
      setPageButtons({
        next: true,
        prev: true
      })
    } else if (page === totalPage) {
        setPageButtons({
          next: true,
          prev: false
        })
    }
  }, [page])

  const [discountChange, setDiscountChange] = React.useState(0)


  const discountRef = React.useRef()
  const sApply = React.useRef()

  function paginate(array, page_size, page_number) {
    setPage(page_number)
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  function searchFunc(nameKey){
    if (!nameKey){
      setDisplayBundles(paginate(bundles, 10, 1))

      var rounded = Math.ceil(bundles.length / 10) * 10
      var distance = bundles.length
      
      var pages = rounded / 10

      if (distance > rounded) {
        pages = pages + 1
      }

      setTotalPage(pages)
    } else {
      var searchArray = []
      bundles.forEach(element => {
        var title = element.SourceProduct.Title
        var searchTerm = nameKey
        var filteredS = searchTerm.toLowerCase()
        var filteredT = title.toLowerCase()

        if (filteredT.includes(filteredS)) {
          searchArray.push(element)                                           
        }
      });
        setDisplayBundles(paginate(searchArray, 10, 1))

        var rounded = Math.ceil(searchArray.length / 10) * 10
        var distance = searchArray.length
        
        var pages = rounded / 10

        if (distance > rounded) {
          pages = pages + 1
        }

        setTotalPage(pages)
        setDisplayProgress('none')  
        setSearch({ searching: true })  
    }
  }

  const nextPage = () => {
    if (search.searching === true) {
      if (Array.isArray(search.items)) {
        setDisplayBundles(paginate(search.items, 10, page+1))
      } 
    } else {
      setDisplayBundles(paginate(bundles, 10, page+1))
    }
  }

  const prevPage = () => {
    if (search.searching === true) {
      if (Array.isArray(search.items)) {
        setDisplayBundles(paginate(search.items, 10, page-1))
      } 
    } else {
      setDisplayBundles(paginate(bundles, 10, page-1))
    }
  }

  const chSelects = () => {
    setDisplayProgress('block')
    var updateArray = []

    var arr = []
    arr = [...bundles]

    arr.forEach(element => {
      var Elem = element
      Elem.SelectedProduct = Elem.RecommendedProduct
      updateArray.push(Elem)
    })

    setBundles(updateArray)
    setDisplayProgress('none')
  }

  const changeAllNewRecommendations = () => {
    setDisplayProgress('block')
    var updateArray = []

    var arr = []
    arr = [...bundles]

    arr.forEach(element => {
      var Elem = element
      if (Elem.NewRecommendedProduct.Id !== "None") {
        Elem.RecommendedProduct = Elem.NewRecommendedProduct
      }
      updateArray.push(Elem)
    })

    setBundles(updateArray)
    setDisplayProgress('none')
  }

  const ChSelectedProd = (bundleId, prodInfo) => {
    setDisplayProgress('block')
    var updateArray = []
 
    var arr = []
    arr = [...bundles]

    arr.forEach(element => {
      var Elem = element
      if (Elem._id === bundleId) {
        Elem.SelectedProduct = {
          "Id": prodInfo.Id,
          "Title": prodInfo.Title,
          "ImageSrc": prodInfo.Image
        }
      }
      updateArray.push(Elem)
    })

  setBundles(updateArray)
    setDisplayProgress('none')
  }

  const ChRecomProd = (bundleId, prodInfo) => {
    setDisplayProgress('block')
    var updateArray = []
 
    var arr = []
    arr = [...bundles]

    arr.forEach(element => {
      var Elem = element
      if (Elem._id === bundleId) {
        Elem.RecommendedProduct = {
          "Id": prodInfo.Id,
          "Title": prodInfo.Title,
          "ImageSrc": prodInfo.Image
        }
      }
      updateArray.push(Elem)
    })

    setBundles(updateArray)
    setDisplayProgress('none')
  }


  function rProducts() {
    setDisplayProgress('block')
    ResetProducts({
      method: "GET",
    }).then((res) => {
      renderUpdate()
    })
  }

  function renderUpdate() {
    GetAllBundles({
      method: "GET"
    }).then((res) => {
      var arr = []
      arr = [...res.data]
      setBundles(arr)
      setDisplayProgress('none')
      setChecked(true)  
    })
  }


  React.useEffect(() => {
    if (localStorage.getItem('bundlesData') === null) {
      GetAllBundles({
        method: "GET"
      }).then((res) => {
        var arr = []
        arr = [...res.data]
        setBundles(arr)

        var array = paginate(res.data, 10, 1)
        setDisplayBundles(array)

        var rounded = Math.ceil(res.data.length / 10) * 10
        var distance = res.data.length
        
        var pages = rounded / 10

        if (distance > rounded) {
          pages = pages + 1
        }

        setTotalPage(pages)

        setDisplayProgress('none')
        setChecked(true)  
        setLoaded(true)

        localStorage.setItem('bundlesData', JSON.stringify(res.data))
      })
    } else {
      var arr = JSON.parse(localStorage.getItem('bundlesData'))
      setBundles(arr)

      var array = paginate(arr, 10, 1)
      setDisplayBundles(array)

      var rounded = Math.ceil(arr.length / 10) * 10
      var distance = arr.length
      
      var pages = rounded / 10

      if (distance > rounded) {
        pages = pages + 1
      }

      setTotalPage(pages)

      setDisplayProgress('none')
      setChecked(true)  
      setLoaded(true)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('bundlesData', JSON.stringify(bundles))
  }, [bundles])

  const SelectProductUpdate = (id, sId) => {
    setDisplayProgress('block')
    SelectProduct({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        "SourceProduct": sId,
        "SelectedProduct": id,
      }
    }).then((res) => {
      var updateArray = []
 
      var arr = []
      arr = [...bundles]
      arr.forEach(element => {
        var Elem = element
        if (Elem.SourceProduct.Id === res.data.SourceProduct.Id) {
          Elem.SelectedProduct = {
            "Id": res.data.SelectedProduct.Id,
            "Title": res.data.SelectedProduct.Title,
            "ImageSrc": res.data.SelectedProduct.ImageSrc
          }
        }
        updateArray.push(Elem)
      });
      
      setBundles(updateArray)
      setDisplayProgress('none')
    })
  }

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

  const changeDiscountAll = (e) => {
    setDiscountAll(e.target.value)
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

  const changeDiscAll = (discountValue) => {
    discountRef.current.changeDiscountsForAll(discountValue)
    setDisplayProgress('block')
    setChecked(false)
  }

  const sProd = React.useRef()

  function selectProd(prodID) {
    sProd.current.handleClickOpen(prodID)
  }

  function applySingleOpen(slProd, rProd, bunId, newRec) {
    // console.log(slProd, newRec)
    sApply.current.openApplySingle(slProd, rProd, bunId, newRec)
  }

  function handleUpdate(value) {
    let newArr = [...bundles];
    var newAr = []

    newArr.forEach(element => {
      var Elem = element
      Elem.Discount = value
      newAr.push(Elem)
    });

    setBundles(newAr);
    setChecked(true)
    setDisplayProgress('none') 
  }

  const changedDiscAll = (discountValue) => {
    handleUpdate(discountValue)      
  }

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
            All Bundles
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
            Bundles
        </Typography>  
        <Typography variant="caption">
          We know that machines aren't perfect in picking the best bundles ever, so we gave an option to choose any other product you like with any product!
        </Typography>
        <br /><br />
        <EnableBundles />
        <br></br>
        <Divider></Divider>
        <br></br>
        <Grid style={{ display: "flex" }}>
            <Grid item xs style={{ textAlign: "center", padding: "10px 0" }}>
                <Typography variant="h6">
                    Source Product
                    <Tooltip TransitionComponent={Zoom} title="This is the main product which appears first in the bundle, the one which the customer is currently viewing." aria-label="add" arrow interactive>
                    <InfoIcon style={{"width":"14px","margin":"3px 4px"}} />
                </Tooltip>
                </Typography>
            </Grid>

            <Grid item xs style={{ textAlign: "center", padding: "10px 0"}}>
                <Typography variant="h6">
                    Auto Recommended
                    <Tooltip TransitionComponent={Zoom} title="The Products in this row are auto generated by our software, according to your orders and customer activity. They will be displayed with the Source Product as a bundle, unless you specify a selected product yourself." aria-label="add" arrow interactive>
                        <InfoIcon style={{"width":"14px","margin":"3px 4px"}} />
                    </Tooltip>
                </Typography>                
            </Grid>
            
            <Grid item xs style={{ textAlign: "center", padding: "10px 0"}}>
                <Typography variant="h6">
                    Selected Product
                    <Tooltip TransitionComponent={Zoom} title="The Products shown here are the ones which will be displayed in the store side, with the source product as a bundle. You can select the product which will Display as a bundle of the Source Product too!" aria-label="add" arrow interactive>
                    <InfoIcon style={{"width":"14px","margin":"3px 4px"}} />
                </Tooltip>
                </Typography>                
            </Grid>

            <Grid item xs style={{ textAlign: "center", padding: "10px 0"}}>
                <Typography variant="h6">
                    Discount
                    <Tooltip TransitionComponent={Zoom} title="Specify How much discount will be added to the customer's cart when They add a bundle to the cart, leave the field empty for no discount." aria-label="add" arrow interactive>
                    <InfoIcon style={{"width":"14px","margin":"3px 4px"}} />
                </Tooltip>
                </Typography>
                
            </Grid>
        </Grid>
        <Grid  style={{ display: "flex" }}>
            <Grid item xs style={{ textAlign: "center", padding: "10px 0"}}>
            </Grid>

            <Grid item xs style={{ textAlign: "center", padding: "10px 0"}}>
                <RPhandler ChangeSelects={chSelects} ChangeAllNewRecoms={changeAllNewRecommendations} bundlesArray={bundles} />
            </Grid>

            <Grid item xs style={{ textAlign: "center", padding: "10px 0"}}>
                <SPhandler resetProducts={rProducts} />
            </Grid>

            <Grid item xs style={{ textAlign: "center", padding: "10px 0"}}>
              <DiscountHandler changeDiscountAll={changeDiscAll} Discount={""} />
            </Grid>
        </Grid><br></br><Divider /> <br />

          <Paper component="form" className={classes.inputRoot} style={{ boxShadow: "1px 0px 10px 4px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"}}>
            <InputBase
            className={classes.input}
            value={search.term}
            onChange={handleSearch}
            placeholder="Search Any Of Your Products"
            inputProps={{ 'aria-label': 'Search Any Of Your Products' }}
            />
              <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

        {/* Pagination Here */}
          <Grid style={{"width":"fit-content","border":"1px solid #ccbdbd", "marginBottom": "1em","borderRadius":"12px","background":"#dbdbdb","float":"right"}} container alignItems="center">
              <IconButton onClick={prevPage} aria-label="Next Page" disabled={pageButtons.prev}>
                <NavigateBeforeIcon />
              </IconButton>
            <Divider orientation="vertical" flexItem />
              <IconButton onClick={nextPage} disabled={pageButtons.next} aria-label="Next Page">
                <NavigateNextIcon />
              </IconButton>
          </Grid>          

          {DisplayBundles.map((d) =>
                <div>
                  <BundleCard applyS={applySingleOpen} NewRecom={d.NewRecommendedProduct} selectProduct={selectProd} Id={d._id} changedDiscAll={changedDiscAll} ref={discountRef} discountChangeSingle={discountChangeSing} key={d._id} SelectedID={d.SelectedProduct.Id} RecommendedID={d.RecommendedProduct.Id} SourceProduct={d.SourceProduct.Title} RecommendedProduct={d.RecommendedProduct.Title} SelectedProduct={d.SelectedProduct.Title} SourceProductImage={d.SourceProduct.ImageSrc} RecommendedProductImage={d.RecommendedProduct.ImageSrc} SelectedProductImage={d.SelectedProduct.ImageSrc} Discount={d.Discount} prod_id={d.SourceProduct.Id}/><br/>
                </div>   
          )}

      <SelectProductComp ref={sProd} UpdateSelectProduct={SelectProductUpdate} />
      <ApplySingle ChangeRecommendedProduct={ChRecomProd} ChangeSelectedProduct={ChSelectedProd} ref={sApply} />
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
