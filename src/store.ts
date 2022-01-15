import {useProxy} from '@tylerlong/use-proxy';
import Chart, {ChartConfiguration, ChartItem} from 'chart.js/auto';

import {getData, minDate, maxDate, getLabels} from './utils';

let chart: Chart;

export class Store {
  country?: string;
  state?: string;
  county?: string;
  startDate = minDate;
  endDate = maxDate;

  initChart() {
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
    chart = new Chart(document.getElementById('myChart') as ChartItem, config);
  }

  updateChart() {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
  }
}

const store = useProxy(new Store());

export default store;
