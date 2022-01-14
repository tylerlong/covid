import _ from 'lodash';

import data from './data';

export const getLabels = () => {
  return data[0].slice(11);
};

export const getData = () => {
  return _.map(_.unzip(data.slice(1).map(item => item.slice(11))), _.sum);
};
