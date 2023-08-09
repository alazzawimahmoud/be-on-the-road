import { data } from '../../data';

export default async function handler(req, res) {
  const { source, seriesId } = req.query;
  const results = data
    .filter(i => source ? (i.source === Number(source)) : true)
    .filter(i => seriesId ? (i.seriesId === Number(seriesId)) : true)

  res.status(200).json({ data: results })
}
