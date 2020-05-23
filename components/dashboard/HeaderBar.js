import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GetStoreInfo from '../../API-instances/StoreInfo'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

export default function HeaderBar() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [Store, setStore] = React.useState({
      User: "John Doe",
      Shop: "Test Store"
  })

  React.useEffect(() => {
    GetStoreInfo({
      method: "GET"
    }).then((response) => {
      console.log(response.data.User)
      setStore({
        User: response.data.User,
        Shop: response.data.Shop
      })
    })
  }, []);

  return (
    <Card style={{ background: "#e1dfdf", borderColor: "#767373" }} className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Hello {Store.User}, this is your Dashboard.
        </Typography>
        <br></br>
        <Typography variant="h5" style={{ textTransform: "uppercase" }} component="h2">
          {Store.Shop}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Running on the Basic Plan.
        </Typography>
        <Typography variant="body2" component="p">
          To setup product bundles or customize any thing, you can click the below button!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="/bundles">Configure App</Button> 
        <Button size="small" href="/frequently-asked-question">Support</Button>
      </CardActions>
    </Card>
  );
}
