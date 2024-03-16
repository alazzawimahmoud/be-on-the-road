import { data, categories } from '../../data';

export default async function handler(req, res) {
  const { source, categoryId, type } = req.query;

  if (!type) {
    res.status(500).json({ data: [], error: 'Please provide a type, it can either be `questions` or `categories`.' })
  }

  if (type === 'questions' && !categoryId) {
    res.status(500).json({ data: [], error: 'Please provide a categoryId.' })
  }

  let results = []
  if (type === 'questions' && categoryId) {
    results = data
      .filter(i => source ? (i.source == source) : true)
      .filter(i => i.seriesId == categoryId)
  }

  if (type === 'categories') {
    results = categories
  }

  res.status(200).json({ data: results })
}
