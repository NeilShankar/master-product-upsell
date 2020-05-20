import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DateRange() {
  const classes = useStyles();
  const [range, setRange] = React.useState('');

  const handleChange = (event) => {
    setRange(event.target.value);
  };

  return (
    <div style={{ position: "absolute", right: "27px", marginTop: "-72px", float: "right" }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Date Range</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={range}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>All Time</em>
          </MenuItem>
          <MenuItem value={10}>Last week</MenuItem>
          <MenuItem value={20}>This Month</MenuItem>
          <MenuItem value={30}>Last Month</MenuItem>
        </Select>
        <FormHelperText>Select which range you want to view.</FormHelperText>
      </FormControl>
    </div>
  );
}
