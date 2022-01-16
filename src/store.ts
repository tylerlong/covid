import {useProxy} from '@tylerlong/use-proxy';
import Chart, {ChartConfiguration, ChartItem} from 'chart.js/auto';

import {getData, minDate, maxDate, getLabels} from './utils';

let confirmedChart: Chart;
let deathsChart: Chart;

export class Store {
  country?: string;
  county?: string;
  startDate = minDate;
  state = 'All';

  initChart() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: [],
        datasets: [],
      },
    };

    const confimredConfig: ChartConfiguration = {
      ...config,
      data: {
        ...config.data,
        datasets: [
          {
            data: [],
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
            data: [],
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
    this.updateChart();
  }

  updateChart() {
    confirmedChart.data.labels = deathsChart.data.labels = getLabels({
      startDate: this.startDate,
    });
    confirmedChart.data.datasets[0].data = getData({
      type: 'confirmed_US',
      startDate: this.startDate,
      state: this.state,
    });
    if (this.state === 'All') {
      confirmedChart.data.datasets[0].label = 'COVID-19 cases in United States';
    } else {
      confirmedChart.data.datasets[0].label = `COVID-19 cases in ${this.state}, United States`;
    }
    confirmedChart.update();
    deathsChart.data.datasets[0].data = getData({
      type: 'deaths_US',
      startDate: this.startDate,
      state: this.state,
    });
    if (this.state === 'All') {
      deathsChart.data.datasets[0].label = 'COVID-19 deaths in United States';
    } else {
      deathsChart.data.datasets[0].label = `COVID-19 deaths in ${this.state}, United States`;
    }
    deathsChart.update();
  }

  selectState(state: string) {
    this.state = state;
    this.updateChart();
  }
}

const store = useProxy(new Store());

export default store;
