import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
import {Col, DatePicker, Divider, Row, Select, Space} from 'antd';
import moment from 'moment';

import './index.css';
import store, {Store} from './store';
import {minDate, maxDate, dateFormat, states, counties} from './utils';

class App extends Component<{store: Store}> {
  render() {
    const {store} = this.props;
    return (
      <Row>
        <Col offset={1} span={22}>
          <h1>COVID-19</h1>
          <Space>
            <DatePicker
              disabledDate={d =>
                !d ||
                d.isAfter(moment(maxDate, dateFormat)) ||
                d.isBefore(moment(minDate, dateFormat))
              }
              defaultValue={moment(store.startDate, dateFormat)}
              format={dateFormat}
              onChange={(date, dateString) => {
                store.startDate = dateString;
                store.updateChart();
              }}
            />
            <Select
              style={{width: 192}}
              placeholder="State"
              defaultValue="All"
              onChange={state => store.selectState(state)}
            >
              <Select.Option value="All">All</Select.Option>
              {states.map(state => (
                <Select.Option value={state} key={state}>
                  {state}
                </Select.Option>
              ))}
            </Select>
          </Space>
          <Divider />
          <Row gutter={{xxl: 32}}>
            <Col xs={24} xxl={12}>
              <canvas id="confirmedChart"></canvas>
            </Col>
            <Col xs={24} xxl={12}>
              <canvas id="deathsChart"></canvas>
            </Col>
          </Row>
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
