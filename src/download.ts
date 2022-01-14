/* eslint-disable node/no-unpublished-import */
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const download = async () => {
  const r = await axios.get<Buffer>(
    'https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv',
    {responseType: 'arraybuffer'}
  );
  fs.writeFileSync(path.join(__dirname, 'us-confirmed.csv'), r.data);
};

download();
