import { data } from '../../data';
import { data as data2 } from '../../data-2';

export default function handler(req, res) {
  res.status(200).json({ data, data2 })
}
