import _ from 'lodash';

import data from './data';

const header = data[0];
export const minDate = header[11];
export const maxDate = _.last(header);
export const dateFormat = 'M/D/YYYY';

export const getLabels = () => {
  return header.slice(11);
};

export const getData = () => {
  return _.map(_.unzip(data.slice(1).map(item => item.slice(11))), _.sum);
};
