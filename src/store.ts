import {useProxy} from '@tylerlong/use-proxy';

export class Store {
  country?: string;
  state?: string;
  county?: string;
}

const store = useProxy(new Store());

export default store;
