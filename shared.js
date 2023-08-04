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

export const VIEW_MODES = {
    LIST: 'LIST',
    SINGLE: 'SINGLE',
    STUDY: 'STUDY',
}