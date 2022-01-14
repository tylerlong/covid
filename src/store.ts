import {useProxy} from '@tylerlong/use-proxy';

export class Store {}

const store = useProxy(new Store());

export default store;
