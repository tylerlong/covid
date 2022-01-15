import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
import {Col, DatePicker, Divider, Row} from 'antd';
import moment from 'moment';

import './index.css';
import store, {Store} from './store';
import {minDate, maxDate, dateFormat} from './utils';

class App extends Component<{store: Store}> {
  render() {
    const {store} = this.props;
    return (
      <Row>
        <Col offset={2} span={20}>
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
          <Divider />
          <canvas id="confirmedChart"></canvas>
          <Divider />
          <canvas id="deathsChart"></canvas>
        </Col>
      </Row>
    );
  }
  componentDidMount() {
    store.initChart();
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
