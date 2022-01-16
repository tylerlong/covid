/* eslint-disable node/no-unpublished-import */
import axios from 'axios';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

const download = async (type: string) => {
  const r = await axios.get<Buffer>(
    `https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_${type}.csv`,
    {responseType: 'arraybuffer'}
  );
  const p = Papa.parse(r.data.toString().trim(), {dynamicTyping: true});
  const data = `const data: (string|number|null)[][] = ${JSON.stringify(
    p.data
  )};

export default data;`;
  fs.writeFileSync(path.join(__dirname, 'data', `${type}.ts`), data);
};

download('confirmed_US');
download('deaths_US');
download('recovered_global');
download('confirmed_global');
download('deaths_global');
