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
  selectedState = 'All';

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
            label: 'COVID-19 cases in United States',
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
            label: 'COVID-19 deaths in United States',
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
    deathsChart.data.labels = confirmedChart.data.labels = getLabels({
      startDate: this.startDate,
      endDate: this.endDate,
    });
    confirmedChart.data.datasets[0].data = getData({
      type: 'confirmed_US',
      startDate: this.startDate,
      endDate: this.endDate,
      state: this.selectedState,
    });
    confirmedChart.update();
    deathsChart.data.datasets[0].data = getData({
      type: 'deaths_US',
      startDate: this.startDate,
      endDate: this.endDate,
      state: this.selectedState,
    });
    deathsChart.update();
  }

  selectState(state: string) {
    this.selectedState = state;
    this.updateChart();
  }
}

const store = useProxy(new Store());

export default store;
