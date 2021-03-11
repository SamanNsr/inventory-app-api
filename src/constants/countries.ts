import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const csvData = fs.readFileSync(
  path.join(__dirname, '..', 'db', 'sources', 'countries.csv'),
  'utf8'
);

interface ICountry {
  name: string;
  'alpha-2': string;
}

const countries: { data: ICountry[] } = Papa.parse(csvData, {
  header: true,
});

export const countriesList = countries.data.map((country: ICountry) => ({
  name: country.name,
  code: country['alpha-2'],
}));
