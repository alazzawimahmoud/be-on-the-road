import { data, categories } from '../../data';
import { CONSTANTS } from '../../data/data';
import { ANSWER_TYPES, mapChoice } from '../../shared';

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
      // Perform MISC operations
      .map((question) => {
        // TODO: Move this operation to parsing stage
        if (question.answerType === ANSWER_TYPES.SINGLE_CHOICE && question.choices.length === 0) {
          question.answerType = ANSWER_TYPES.YES_NO
          question.choices = CONSTANTS.YES_NO_VALUES.map(mapChoice('text'))
        }
        return question
      })
  }

  if (type === 'categories') {
    results = categories
  }

  res.status(200).json({ data: results })
}
