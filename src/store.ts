import {useProxy} from '@tylerlong/use-proxy';
import Chart, {ChartItem} from 'chart.js/auto';
import moment from 'moment';
import QueryParams from './QueryParams';

import {getData, minDate, maxDate, getLabels, dateFormat} from './utils';

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

  country = 'Worldwide';
  state = 'Countrywide';
  county = 'Statewide';

  initChart() {
    const confirmedDataset = {
      data: [],
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132, 0.5)',
    };
    confirmedChart = new Chart(
      document.getElementById('confirmed-chart') as ChartItem,
      {
        type: 'bar',
        data: {
          datasets: [{...confirmedDataset}],
        },
      }
    );
    confirmedChart2 = new Chart(
      document.getElementById('confirmed-chart-2') as ChartItem,
      {
        type: 'line',
        data: {
          datasets: [{...confirmedDataset}],
        },
      }
    );

    const deathsDataset = {
      data: [],
      backgroundColor: 'rgb(0, 0, 0, 0.2)',
      borderColor: 'rgb(0, 0, 0, 0.2)',
    };
    deathsChart = new Chart(
      document.getElementById('deaths-chart') as ChartItem,
      {
        type: 'bar',
        data: {
          datasets: [{...deathsDataset}],
        },
      }
    );
    deathsChart2 = new Chart(
      document.getElementById('deaths-chart-2') as ChartItem,
      {
        type: 'line',
        data: {
          datasets: [{...deathsDataset}],
        },
      }
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
    let location = this.country === 'Worldwide' ? 'the world' : this.country;
    if (this.state !== 'Countrywide') {
      location = `${this.state}, ${location}`;
    }
    if (this.county !== 'Statewide') {
      location = `${this.county}, ${location}`;
    }
    [
      confirmedChart.data.datasets[0].data,
      confirmedChart2.data.datasets[0].data,
    ] = getData({
      type: 'confirmed',
      startDate: this.startDate,
      country: this.country,
      state: this.state,
      county: this.county,
    });
    confirmedChart.data.datasets[0].label = `COVID-19 new cases in ${location}`;
    confirmedChart2.data.datasets[0].label = `COVID-19 total cases in ${location}`;
    confirmedChart.update();
    confirmedChart2.update();
    [deathsChart.data.datasets[0].data, deathsChart2.data.datasets[0].data] =
      getData({
        type: 'deaths',
        startDate: this.startDate,
        country: this.country,
        state: this.state,
        county: this.county,
      });
    deathsChart.data.datasets[0].label = `COVID-19 new deaths in ${location}`;
    deathsChart2.data.datasets[0].label = `COVID-19 total deaths in ${location}`;
    deathsChart.update();
    deathsChart2.update();
  }

  selectRange(range: number) {
    this.range = range;
    this.updateChart();
    this.saveQueries();
  }

  selectCountry(country: string) {
    this.country = country;
    this.state = 'Countrywide';
    this.county = 'Statewide';
    this.updateChart();
    this.saveQueries();
  }

  selectState(state: string) {
    this.state = state;
    this.county = 'Statewide';
    this.updateChart();
    this.saveQueries();
  }

  selectCounty(county: string) {
    this.county = county;
    this.updateChart();
    this.saveQueries();
  }

  async loadQueries() {
    const queryParams = await QueryParams.load();
    this.range = queryParams.range;
    this.country = queryParams.country;
    this.state = queryParams.state;
    this.county = queryParams.county;
    this.updateChart();
  }

  async saveQueries() {
    const queryParams = new QueryParams();
    queryParams.range = this.range;
    queryParams.country = this.country;
    queryParams.state = this.state;
    queryParams.county = this.county;
    await queryParams.save();
  }
}

const store = useProxy(new Store());
// go back/forward in browser
window.addEventListener('popstate', () => {
  store.loadQueries();
});

export default store;
