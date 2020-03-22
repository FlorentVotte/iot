import React, { Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

const url = process.env.API_URL || 'http://localhost:9000';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
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
                let formated = data.reverse().map(item => createData(dataFormat(item.date), item.value));
                currentComponent.setState({ data: formated });
            });
    }


    render() {
        return (
            <ChartLine data={this.state.data} />
        );
    }
}

function createData(time, value) {
    return { time, value };
}

function dataFormat(date) {
    let raw = new Date(date);
    let formated = raw.getHours() + ':' + raw.getMinutes() + ' ' + raw.getDate() + '/' + (parseInt(raw.getMonth()) + 1) + '/' + raw.getFullYear();
    return formated;
}

function ChartLine(props) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
          <LineChart
              data={props.data}
              margin={{
                  top: 16,
                  right: 16,
                  bottom: 0,
                  left: 24,
              }}
          >
              <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary}>
                  <Label
                      angle={270}
                      position="left"
                      style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                  >
                      Values
                  </Label>
              </YAxis>
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={theme.palette.primary.main} dot={false} />
          </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
