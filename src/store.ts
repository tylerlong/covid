import {useProxy} from '@tylerlong/use-proxy';
import Chart, {ChartConfiguration, ChartItem} from 'chart.js/auto';
import moment from 'moment';

import {
  getData,
  minDate,
  maxDate,
  getLabels,
  dateFormat,
  setQueryParams,
} from './utils';

let confirmedChart: Chart;
let confirmedChart2: Chart;
let deathsChart: Chart;
let deathsChart2: Chart;

export class Store {
  range = 30;
  get startDate() {
    switch (this.range) {
      case -1: {
        return minDate;
      }
      default: {
        return moment(maxDate, dateFormat)
          .add(-this.range + 1, 'days')
          .format(dateFormat);
      }
    }
  }

  state = 'All';
  county = 'All';

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
      document.getElementById('confirmed-chart') as ChartItem,
      {...confimredConfig, type: 'bar'}
    );
    confirmedChart2 = new Chart(
      document.getElementById('confirmed-chart-2') as ChartItem,
      JSON.parse(JSON.stringify(confimredConfig))
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
      document.getElementById('deaths-chart') as ChartItem,
      {...deathsConfig, type: 'bar'}
    );
    deathsChart2 = new Chart(
      document.getElementById('deaths-chart-2') as ChartItem,
      JSON.parse(JSON.stringify(deathsConfig))
    );
    this.updateChart();
  }

  updateChart() {
    confirmedChart.data.labels =
      confirmedChart2.data.labels =
      deathsChart.data.labels =
      deathsChart2.data.labels =
        getLabels({
          startDate: this.startDate,
        });
    let location = 'United States';
    if (this.state !== 'All') {
      location = `${this.state}, ${location}`;
    }
    if (this.county !== 'All') {
      location = `${this.county}, ${location}`;
    }
    [
      confirmedChart.data.datasets[0].data,
      confirmedChart2.data.datasets[0].data,
    ] = getData({
      type: 'confirmed_US',
      startDate: this.startDate,
      state: this.state,
      county: this.county,
    });
    confirmedChart.data.datasets[0].label = `COVID-19 new cases in ${location}`;
    confirmedChart2.data.datasets[0].label = `COVID-19 total cases in ${location}`;
    confirmedChart.update();
    confirmedChart2.update();
    [deathsChart.data.datasets[0].data, deathsChart2.data.datasets[0].data] =
      getData({
        type: 'deaths_US',
        startDate: this.startDate,
        state: this.state,
        county: this.county,
      });
    deathsChart.data.datasets[0].label = `COVID-19 new deaths in ${location}`;
    deathsChart2.data.datasets[0].label = `COVID-19 total deaths in ${location}`;
    deathsChart.update();
    deathsChart2.update();
  }

  selectState(state: string) {
    this.state = state;
    this.county = 'All';
    this.updateChart();
    this.syncToQueryParams();
  }

  selectRange(range: number) {
    this.range = range;
    this.updateChart();
    this.syncToQueryParams();
  }

  selectCounty(county: string) {
    this.county = county;
    this.updateChart();
    this.syncToQueryParams();
  }

  applyQueryParams() {
    const urlSearchParams = new URLSearchParams(
      new URL(window.location.href).search
    );
    const range = urlSearchParams.get('range');
    if (range !== null) {
      this.range = parseInt(range);
    }
    const state = urlSearchParams.get('state');
    if (state !== null) {
      this.state = state;
    }
    const county = urlSearchParams.get('county');
    if (county !== null) {
      this.county = county;
    }
    this.updateChart();
  }

  syncToQueryParams() {
    const queryParams = [
      {key: 'range', value: this.range.toString()},
      {key: 'state', value: this.state},
    ];
    if (this.state !== 'All') {
      queryParams.push({key: 'county', value: this.county});
    }
    setQueryParams(queryParams);
  }
}

const store = useProxy(new Store());
window.addEventListener('popstate', event => {
  // go back/forward in browser
  store.applyQueryParams();
});

export default store;
