import { categories } from '../../data';

export default async function handler(req, res) {
  res.status(200).json({ data: categories })
}
