import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Loader(props) {
  const classes = useStyles();
  const [display, setDisplay] = React.useState('none')

  React.useState(() => {
    setDisplay(props.Display)
  }, [props])

  return (
    <div className={classes.root}>
      <LinearProgress style={{ display: display }} />
    </div>
  );
}
