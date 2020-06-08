import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BundleUpdateEnable from '../../API-instances/BundleUpdateEnable'
import CheckBundleUpdateEnabled from '../../API-instances/CheckBundleUpdateEnabled'

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

export default function EnableUpdates() {
  const [state, setState] = React.useState({
    checkedEnable: true,
  });

  React.useEffect(() => {
    CheckBundleUpdateEnabled({
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => {
      setState({
        checkedEnable: res.data
      })
    })
  }, [])

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    BundleUpdateEnable({
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      data: {
        "Enabled": `${!state.checkedEnable}`
      }
    })
  };

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedEnable} onChange={handleChange} name="checkedEnable" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
