import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Last Value</Title>
      <Typography component="p" variant="h4">
          {props.last[1]} °C
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {props.last[0]}
      </Typography>
    </React.Fragment>
  );
}
