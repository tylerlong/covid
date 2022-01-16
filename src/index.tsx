import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
import {Col, Divider, Row, Select, Space} from 'antd';

import './index.css';
import store, {Store} from './store';
import {states} from './utils';

class App extends Component<{store: Store}> {
  render() {
    const {store} = this.props;
    return (
      <Row>
        <Col offset={1} span={22}>
          <h1>COVID-19</h1>
          <Space>
            <Select
              style={{width: 192}}
              value={store.range}
              onChange={range => store.selectrange(range)}
            >
              <Select.Option value={7}>Last 7 days</Select.Option>
              <Select.Option value={30}>Last 30 days</Select.Option>
              <Select.Option value={90}>Last 90 days</Select.Option>
              <Select.Option value={180}>Last 180 days</Select.Option>
              <Select.Option value={365}>Last 365 days</Select.Option>
              <Select.Option value={-1}>All time</Select.Option>
            </Select>
            <Select
              style={{width: 192}}
              placeholder="State"
              value={store.state}
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
    store.applyQueryParams();
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
