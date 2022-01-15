import _ from 'lodash';

import confirmed from './data/confirmed_US';
import deaths from './data/deaths_US';

const header = confirmed[0];
export const minDate = header[11];
export const maxDate = _.last(header);
export const dateFormat = 'M/D/YY';

export const getLabels = (): string[] => {
  return header.slice(11) as string[];
};

export const getData = (type: 'confirmed_US' | 'deaths_US'): number[] => {
  switch (type) {
    case 'confirmed_US': {
      return _.map(
        _.unzip(confirmed.slice(1).map(item => item.slice(11))),
        _.sum
      );
    }
    case 'deaths_US': {
      return _.map(_.unzip(deaths.slice(1).map(item => item.slice(12))), _.sum);
    }
    default: {
      return [];
    }
  }
};
