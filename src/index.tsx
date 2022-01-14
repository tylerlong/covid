import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
import Chart, {ChartConfiguration, ChartItem} from 'chart.js/auto';

import './index.css';
import store, {Store} from './store';
import {getLabels, getData} from './utils';

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
    const labels = getLabels();

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'COVID-19 Cases in United States',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: getData(),
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
