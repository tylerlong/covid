import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from '@tylerlong/use-proxy/build/react';

import './index.css';

import store, {Store} from './store';

class App extends Component<{store: Store}> {
  render() {
    return <h1>Hello world!</h1>;
  }
}
const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
