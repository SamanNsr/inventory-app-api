import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface IState {
  name: string;
  code: string;
  country_id?: number;
}

const csvData = fs.readFileSync(
  path.join(__dirname, '..', 'db', 'sources', 'ir_states.csv'),
  'utf8'
);

const states: { data: IState[] } = Papa.parse(csvData, {
  header: true,
});

export const irState = states.data.map((state: IState) => ({
  name: state.name,
  code: state.code,
}));
