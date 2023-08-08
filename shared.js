import { chain, kebabCase } from "lodash";

export function mapQuestion({
    id,
    title,
    seriesId,
    image,
    video,
    question,
    answer,
    explanation,
    answerType,
    isMajorFault,
    choices
}) {
    return {
        id,
        title,
        seriesId,
        image,
        video,
        question,
        answer,
        explanation,
        answerType,
        isMajorFault,
        choices
    }
}

export function mapCategories(data) {
    return chain(data)
        .groupBy('seriesId')
        .map((group, seriesId) => {
            const i = group[0];
            return {
                title: i.title,
                slug: kebabCase(i.title),
                path: `/${kebabCase(i.title)}`,
                seriesId,
                total: group.length
            }
        })
        .value();
}

export function mapChoice(type = 'text') {
    return (choice) => ({ [type]: choice });
}

export const VIEW_MODES = {
    LIST: 'LIST',
    SINGLE: 'SINGLE',
    STUDY: 'STUDY',
}

export const ANSWER_TYPES = {
    SINGLE_CHOICE: 'SINGLE_CHOICE',
    YES_NO: 'YES_NO',
    ORDER: 'ORDER',
    INPUT: 'INPUT',
}
