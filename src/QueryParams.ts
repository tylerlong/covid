import localforage from 'localforage';

class QueryParams {
  range = 30;
  country = 'Worldwide';
  state = 'Countrywide';
  county = 'Statewide';

  async save() {
    const urlSearchParams = new URLSearchParams();

    if (this.range !== 30) {
      urlSearchParams.set('range', this.range.toString());
      await localforage.setItem('range', this.range);
    } else {
      await localforage.removeItem('range');
    }

    if (this.country !== 'Worldwide') {
      urlSearchParams.set('country', this.country);
      await localforage.setItem('country', this.country);
    } else {
      await localforage.removeItem('country');
    }

    if (this.state !== 'Countrywide') {
      urlSearchParams.set('state', this.state);
      await localforage.setItem('state', this.state);
    } else {
      await localforage.removeItem('state');
    }

    if (this.county !== 'Statewide') {
      urlSearchParams.set('county', this.county);
      await localforage.setItem('county', this.county);
    } else {
      await localforage.removeItem('county');
    }

    if (urlSearchParams.toString().length > 0) {
      history.pushState(null, '', '?' + urlSearchParams.toString());
    } else {
      history.pushState(
        null,
        '',
        window.location.origin + window.location.pathname
      );
    }
  }

  static async load(): Promise<QueryParams> {
    const urlSearchParams = new URLSearchParams(
      new URL(window.location.href).search
    );
    const queryParams = new QueryParams();

    let range = urlSearchParams.get('range');
    if (range === null) {
      range = await localforage.getItem('range');
    }
    if (range !== null) {
      queryParams.range = parseInt(range);
    }

    let country = urlSearchParams.get('country');
    if (country === null) {
      country = await localforage.getItem('country');
    }
    if (country !== null) {
      queryParams.country = country;
    }

    let state = urlSearchParams.get('state');
    if (state === null) {
      state = await localforage.getItem('state');
    }
    if (state !== null) {
      queryParams.state = state;
    }

    let county = urlSearchParams.get('county');
    if (county === null) {
      county = await localforage.getItem('county');
    }
    if (county !== null) {
      queryParams.county = county;
    }

    return queryParams;
  }
}

export default QueryParams;
