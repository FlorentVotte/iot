import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
    const [value, setValue] = React.useState(1000);
      const classes = useStyles();
      const handleChange = (e, newValue) => {
          setValue(newValue);
          console.log(newValue);

         props.changeData(parseInt(newValue));
  };
  return (
    <React.Fragment>
      <Title>Last Value</Title>
      <Typography component="p" variant="h4">
          {props.last[1]} °C
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {props.last[0]}
      </Typography>
      <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" valueLabelDisplay="auto" min={10} max={10000} />
    </React.Fragment>
  );
}
