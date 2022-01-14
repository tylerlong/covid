import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';
import {Spin} from 'antd';

import './index.css';
import store, {Store} from './store';

class App extends Component<{store: Store}> {
  render() {
    return (
      <>
        <h1>Hello world!</h1>
        <Spin size="large" />
      </>
    );
  }
}
const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
