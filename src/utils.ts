/* eslint-disable node/no-unpublished-import */
import _ from 'lodash';

import confirmed from './data/confirmed_US';
import deaths from './data/deaths_US';
import _confirmedGlobal from './data/confirmed_global';
import _deathsGlobal from './data/deaths_global';

const confirmedGlobal = _confirmedGlobal.filter(item => item[1] !== 'US');
const deathsGlobal = _deathsGlobal.filter(item => item[1] !== 'US');

const header = confirmed[0];
export const minDate = header[11] as string;
export const maxDate = _.last(header) as string;
export const dateFormat = 'M/D/YY';

export const countries = [
  ...new Set(confirmedGlobal.slice(1).map(row => row[1])),
  'United States',
].sort();
const usStates = [
  ...new Set(confirmed.slice(1).map(row => row[6])),
] as string[];
export const states: {[country: string]: string[]} = {
  'United States': usStates,
};
for (const row of confirmedGlobal.slice(1)) {
  const country = row[1] as string;
  const state = row[0] as string;
  if (!states[country]) {
    states[country] = [];
  }
  if (state !== null) {
    states[country].push(state);
  }
}
export const counties: {[state: string]: string[]} = {};
for (const row of confirmed.slice(1)) {
  const state = row[6] as string;
  const county = row[5] as string;
  if (!counties[state]) {
    counties[state] = [];
  }
  if (county !== null) {
    counties[state].push(county);
  }
}

export const getLabels = (options: {startDate: string}): string[] => {
  const {startDate} = options;
  const startIndex = header.indexOf(startDate);
  return header.slice(startIndex) as string[];
};

export const getData = (options: {
  type: 'confirmed' | 'deaths';
  startDate: string;
  country: string;
  state: string;
  county: string;
}): [number[], number[]] => {
  const {type, startDate, country, state, county} = options;
  let filteredData: (string | number | null)[][] = [];
  let startIndex = 0;
  switch (type) {
    case 'confirmed': {
      if (country === 'United States') {
        startIndex = header.indexOf(startDate);
        filteredData = confirmed.slice(1);
      } else {
        const header = confirmedGlobal[0];
        startIndex = header.indexOf(startDate);
        filteredData = confirmedGlobal.slice(1);
      }
      break;
    }
    case 'deaths': {
      if (country === 'United States') {
        const header = deaths[0];
        startIndex = header.indexOf(startDate);
        filteredData = deaths.slice(1);
      } else {
        const header = deathsGlobal[0];
        startIndex = header.indexOf(startDate);
        filteredData = deathsGlobal.slice(1);
      }
      break;
    }
    default: {
      return [[], []];
    }
  }
  if (country !== 'United States') {
    filteredData = filteredData.filter(row => row[1] === country);
  }
  if (state !== 'All') {
    filteredData = filteredData.filter(
      row => row[6] === state || row[0] === state
    );
    if (county !== 'All') {
      filteredData = filteredData.filter(row => row[5] === county);
    }
  }
  const result = _.map(
    _.unzip(filteredData.map(item => item.slice(startIndex))),
    _.sum
  );
  const result2 = [...result];
  if (startDate === minDate) {
    result.unshift(0);
  } else {
    result.unshift(_.sum(filteredData.map(item => item[startIndex - 1])));
  }
  for (let i = result.length - 1; i > 0; i--) {
    result[i] = result[i] - result[i - 1];
  }
  return [result.slice(1).map(item => (item < 0 ? 0 : item)), result2];
};

export const setQueryParams = (qps: {key: string; value: string}[]) => {
  const queryParams = new URLSearchParams();
  for (const qp of qps) {
    queryParams.set(qp.key, qp.value);
  }
  history.pushState(null, '', '?' + queryParams.toString());
};
