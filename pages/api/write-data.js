import { data } from '../../data';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const dataPath = path.join('./data', `data_final.json`);
  await fs.writeFile(dataPath, JSON.stringify(data, undefined, 4));
  res.status(200).json({ data: 'OK!' })
}
