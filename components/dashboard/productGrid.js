import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Doughnut } from "react-chartjs-2";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const data = {
  labels: ['Christmas Bundle', 'Diwali Bundle', 'Thanksgiving Bundle',
           'Halloween Bundle', 'Birthday Bundle'],
  datasets: [
    {
      label: 'Conversions',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: [85, 78, 61, 58, 49]
    }
  ]
};

export default function ProGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid style={{ width: "43%", height: "50%", float: "right", position: "absolute", right: "2.6%", marginTop: "12px"}}>
        <Paper elevation={20} style={{ height: "100%", background: "#fff" }}className={classes.paper}>
          <Doughnut
            data={data}
            options={{
              title:{
                display:true,
                text:'Overall Conversion Performance',
                fontSize:20,
                responsive: true,
                maintainAspectRatio: true,
                responsiveAnimationDuration: 1000
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </Paper>
      </Grid>
      <Grid style={{ width: "calc(50% + 13px)" }} container spacing={3}>
        <Grid item xs>
          <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
            <Typography style={{ fontSize: "1em" }} variant="h6">
              Christmas Product Bundle
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid style={{ width: "calc(50% + 13px)" }} container spacing={3}>
        <Grid item xs>
        <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
            <Typography style={{ fontSize: "1em" }} variant="h6">
              Diwali Bundle
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid style={{ width: "calc(50% + 13px)" }} container spacing={3}>
        <Grid item xs>
        <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
            <Typography style={{ fontSize: "1em" }} variant="h6">
              Thanksgiving Bundle
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid style={{ width: "calc(50% + 13px)" }} container spacing={3}>
        <Grid item xs>
        <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
            <Typography style={{ fontSize: "1em" }} variant="h6">
              Halloween Bundle
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid style={{ width: "calc(50% + 13px)" }} container spacing={3}>
        <Grid item xs>
        <Paper elevation={20} style={{ background: "#fff" }} className={classes.paper}>
            <Typography style={{ fontSize: "1em" }} variant="h6">
              Birthday Bundle
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
