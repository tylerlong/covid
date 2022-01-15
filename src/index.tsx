import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
import {DatePicker} from 'antd';
import moment from 'moment';

import './index.css';
import store, {Store} from './store';
import {minDate, maxDate, dateFormat} from './utils';

class App extends Component<{store: Store}> {
  render() {
    const {store} = this.props;
    return (
      <>
        <h1>COVID-19</h1>
        <DatePicker.RangePicker
          disabledDate={d =>
            !d ||
            d.isAfter(moment(maxDate, dateFormat)) ||
            d.isBefore(moment(minDate, dateFormat))
          }
          defaultValue={[
            moment(store.startDate, dateFormat),
            moment(store.endDate, dateFormat),
          ]}
          format={dateFormat}
          onChange={(dates, dateStrings) => {
            store.startDate = dateStrings[0];
            store.endDate = dateStrings[1];
            store.updateChart();
          }}
        />
        <canvas id="confirmedChart"></canvas>
        <canvas id="deathsChart"></canvas>
      </>
    );
  }
  componentDidMount() {
    store.initChart();
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
