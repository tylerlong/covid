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
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: getLabels(this.startDate, this.endDate),
        datasets: [],
      },
    };

    const confimredConfig: ChartConfiguration = {
      ...config,
      data: {
        ...config.data,
        datasets: [
          {
            label: 'COVID-19 cases in United States',
            data: getData('confirmed_US', this.startDate, this.endDate),
            backgroundColor: 'rgb(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132, 0.5)',
          },
        ],
      },
    };
    confirmedChart = new Chart(
      document.getElementById('confirmedChart') as ChartItem,
      confimredConfig
    );

    const deathsConfig: ChartConfiguration = {
      ...config,
      data: {
        ...config.data,
        datasets: [
          {
            label: 'COVID-19 deaths in United States',
            data: getData('deaths_US', this.startDate, this.endDate),
            backgroundColor: 'rgb(0, 0, 0, 0.2)',
            borderColor: 'rgb(0, 0, 0, 0.2)',
          },
        ],
      },
    };
    deathsChart = new Chart(
      document.getElementById('deathsChart') as ChartItem,
      deathsConfig
    );
  }

  updateChart() {
    deathsChart.data.labels = confirmedChart.data.labels = getLabels(
      this.startDate,
      this.endDate
    );
    confirmedChart.data.datasets[0].data = getData(
      'confirmed_US',
      this.startDate,
      this.endDate
    );
    confirmedChart.update();
    deathsChart.data.datasets[0].data = getData(
      'deaths_US',
      this.startDate,
      this.endDate
    );
    deathsChart.update();
  }
}

const store = useProxy(new Store());

export default store;
