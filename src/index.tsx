import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
// import {Spin} from 'antd';
import Chart, {ChartConfiguration, ChartItem} from 'chart.js/auto';

import './index.css';
import store, {Store} from './store';

class App extends Component<{store: Store}> {
  render() {
    return (
      <>
        <h1>Hello world!</h1>
        <canvas id="myChart"></canvas>
      </>
    );
  }
  componentDidMount() {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {},
    };
    const myChart = new Chart(
      document.getElementById('myChart') as ChartItem,
      config
    );
  }
}
const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
