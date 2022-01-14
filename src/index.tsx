import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
import Chart, {ChartConfiguration, ChartItem} from 'chart.js/auto';
import * as _ from 'lodash';

import './index.css';
import store, {Store} from './store';
import confirmedData from './data';

class App extends Component<{store: Store}> {
  render() {
    return (
      <>
        <h1>COVID-19</h1>
        <canvas id="myChart"></canvas>
      </>
    );
  }
  componentDidMount() {
    const labels = confirmedData[0].slice(11);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'COVID-19 Cases in United States',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: _.map(
            _.unzip(confirmedData.slice(1).map(item => item.slice(11))),
            _.sum
          ),
        },
      ],
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {},
    };
    new Chart(document.getElementById('myChart') as ChartItem, config);
  }
}
const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
