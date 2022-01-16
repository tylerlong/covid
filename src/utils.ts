import _ from 'lodash';

import confirmed from './data/confirmed_US';
import deaths from './data/deaths_US';

const header = confirmed[0];
export const minDate = header[11] as string;
export const maxDate = _.last(header) as string;
export const dateFormat = 'M/D/YY';

export const states = [...new Set(confirmed.slice(1).map(row => row[6]))];
export const counties: {[state: string]: string[]} = {};
for (const row of confirmed.slice(1)) {
  const state = row[6] as string;
  const county = row[5] as string;
  if (!counties[state]) {
    counties[state] = [];
  }
  if (county != null) {
    counties[state].push(county);
  }
}

export const getLabels = (options: {
  startDate: string;
  endDate: string;
}): string[] => {
  const {startDate, endDate} = options;
  const startIndex = header.indexOf(startDate);
  const endIndex = header.indexOf(endDate);
  return header.slice(startIndex, endIndex + 1) as string[];
};

export const getData = (options: {
  type: 'confirmed_US' | 'deaths_US';
  startDate: string;
  endDate: string;
  state: string;
}): number[] => {
  const {type, startDate, endDate, state} = options;
  switch (type) {
    case 'confirmed_US': {
      const startIndex = header.indexOf(startDate);
      const endIndex = header.indexOf(endDate);
      let filteredData = confirmed.slice(1);
      if (state !== 'All') {
        filteredData = filteredData.filter(row => row[6] === state);
      }
      return _.map(
        _.unzip(filteredData.map(item => item.slice(startIndex, endIndex + 1))),
        _.sum
      );
    }
    case 'deaths_US': {
      const header = deaths[0];
      const startIndex = header.indexOf(startDate);
      const endIndex = header.indexOf(endDate);
      let filteredData = deaths.slice(1);
      if (state !== 'All') {
        filteredData = filteredData.filter(row => row[6] === state);
      }
      return _.map(
        _.unzip(filteredData.map(item => item.slice(startIndex, endIndex + 1))),
        _.sum
      );
    }
    default: {
      return [];
    }
  }
};
