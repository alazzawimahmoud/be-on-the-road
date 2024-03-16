import { chain, kebabCase } from "lodash";

export function mapQuestion({
    id,
    title,
    seriesId,
    imageId,
    image,
    video,
    question,
    answer,
    explanation,
    answerType,
    isMajorFault,
    choices,
    source,
    images
}) {
    return {
        id,
        title,
        seriesId,
        imageId,
        image,
        video,
        question,
        answer,
        explanation,
        answerType,
        isMajorFault,
        choices,
        source,
        images
    }
}

export function mapCategories(data, source) {
    return chain(data)
        .groupBy('seriesId')
        .map((group, seriesId) => {
            const i = group[0];
            return {
                title: i.title,
                slug: kebabCase(i.title),
                path: `/${kebabCase(i.title)}`,
                seriesId,
                total: group.length,
                source
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

export const ASSETS_BASEURL = 'https://res.cloudinary.com/be-on-the-road-assets/image/upload/v1710625875/be-on-the-road-assets'