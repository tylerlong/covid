import {useProxy} from '@tylerlong/use-proxy';
import Chart, {ChartConfiguration, ChartItem} from 'chart.js/auto';

import {getData, minDate, maxDate, getLabels} from './utils';

let confirmedChart: Chart;
let deathsChart: Chart;

export class Store {
  country?: string;
  state?: string;
  county?: string;
  startDate = minDate;
  endDate = maxDate;

  initChart() {
    const confimredConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: getLabels(),
        datasets: [
          {
            label: 'COVID-19 Cases in United States',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: getData('confirmed_US'),
          },
        ],
      },
    };
    const deathsConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: getLabels(),
        datasets: [
          {
            label: 'COVID-19 Deaths in United States',
            data: getData('deaths_US'),
          },
        ],
      },
    };
    confirmedChart = new Chart(
      document.getElementById('confirmedChart') as ChartItem,
      confimredConfig
    );
    deathsChart = new Chart(
      document.getElementById('deathsChart') as ChartItem,
      deathsConfig
    );
  }

  updateChart() {
    confirmedChart.data.labels = [];
    confirmedChart.data.datasets[0].data = [];
    confirmedChart.update();
    deathsChart.data.labels = [];
    deathsChart.data.datasets[0].data = [];
    deathsChart.update();
  }
}

const store = useProxy(new Store());

export default store;
