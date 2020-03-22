import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const url = process.env.API_URL || 'http://localhost:9000';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default class Deposits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last: ['00:00', 0]
        };
    };

    componentDidMount() {
        this.getAPI();
        this.timerID = setInterval(
            () => this.getAPI(),
            10000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getAPI() {
        let currentComponent = this;
        fetch(url + '/value?sensor=Dev_sensors', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function(res){ return res.json(); })
            .then(function(data){
                let last = [data[0].date, data[0].value];
                currentComponent.setState({ last: last });
            });
    }


    render() {
        return (
            <DepositsC last={this.state.last} />
        );
    }
}

function dataFormat(date) {
    let raw = new Date(date);
    let formated = raw.getHours() + ':' + raw.getMinutes() + ' ' + raw.getDate() + '/' + (parseInt(raw.getMonth()) + 1) + '/' + raw.getFullYear();
    return formated;
}

function DepositsC(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Last Value</Title>
      <Typography component="p" variant="h4">
          {props.last[1]} °C
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {dataFormat(props.last[0])}
      </Typography>
    </React.Fragment>
  );
}
