import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
import Chart, {ChartConfiguration, ChartItem} from 'chart.js/auto';
import {DatePicker} from 'antd';
import moment from 'moment';

import './index.css';
import store, {Store} from './store';
import {getLabels, getData, getDateRange} from './utils';

const dateFormat = 'M/D/YYYY';

const {start, end} = getDateRange();

class App extends Component<{store: Store}> {
  private chart!: Chart;

  render() {
    return (
      <>
        <h1>COVID-19</h1>
        <DatePicker.RangePicker
          disabledDate={d => !d || d.isAfter(end) || d.isBefore(start)}
          defaultValue={[moment(start, dateFormat), moment(end, dateFormat)]}
          format={dateFormat}
          onChange={val => {
            console.log(val);
          }}
        />
        <canvas id="myChart"></canvas>
      </>
    );
  }
  componentDidMount() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: getLabels(),
        datasets: [
          {
            label: 'COVID-19 Cases in United States',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: getData(),
          },
        ],
      },
    };
    this.chart = new Chart(
      document.getElementById('myChart') as ChartItem,
      config
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
