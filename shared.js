export function mapQuestion({
    id,
    title,
    seriesId,
    image,
    question,
    answer,
    explanation,
    points,
    answerType,
    isMajorFault,
    choices
}) {
    return {
        id,
        title,
        seriesId,
        image,
        question,
        answer,
        explanation,
        points,
        answerType,
        isMajorFault,
        choices
    }
}