import * as csv from 'fast-csv';
import * as fs from 'fs';

export const parseCsv = <T = any>(path: string): Promise<Array<T>> =>
  new Promise<Array<T>>((resolve, reject) => {
    try {

      fs.readFile(path, (err: any, data: any) => {
        if (err) {
          return reject(err);
        }
        const rows: Array<T> = [];

        csv
          .parseString(data, { headers: true })
          .on('error', reject)
          .on('data', (row) => {
            rows.push(row)
          })
          .on('end', () => resolve(rows));

      });
    } catch (err) {
      reject(err);
    }
  });

export default parseCsv;
