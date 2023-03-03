/* eslint-disable node/no-unpublished-import */
import axios from 'axios';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

/*
Too much data, skip some ancient ones
skip 710 days then we start with 2022-01-01
*/
const skip_days = 710;

let startDate: string | number | null = '';
const download = async (type: string) => {
  const r = await axios.get<Buffer>(
    `https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_${type}.csv`,
    {responseType: 'arraybuffer'}
  );
  const p = Papa.parse<(string | number | null)[]>(r.data.toString().trim(), {
    dynamicTyping: true,
  });
  if (type === 'confirmed_US') {
    startDate = p.data[0][11];
  }
  const startIndex = p.data[0].indexOf(startDate);
  for (const line of p.data) {
    line.splice(startIndex, skip_days);
  }
  const data = `const data: (string|number|null)[][] = ${JSON.stringify(
    p.data
  )};

export default data;`;
  fs.writeFileSync(path.join(__dirname, 'data', `${type}.ts`), data);
};

const main = async () => {
  await download('confirmed_US');
  download('deaths_US');
  download('confirmed_global');
  download('deaths_global');
};

main();
