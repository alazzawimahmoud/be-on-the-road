import { reverse, uniqBy } from 'lodash'
import { data } from '../../data';

export default function handler(req, res) {
  res.status(200).json(data)
}
