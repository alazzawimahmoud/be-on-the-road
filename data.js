import { kebabCase, snakeCase, uniq, uniqBy } from 'lodash';
import _data from './data.json';

export const categories = uniqBy(_data, 'seriesId')
    .map(i => ({
        title: i.title, slug: kebabCase(i.title), path: `/${kebabCase(i.title)}`, seriesId: i.seriesId
    }));

const example = {
    "id": "12607",
    // image
    "qid": "1103",
    // points
    "qw": "1",
    // question
    "q": "Wanneer moet je de bandenspanning controleren?<br /><br />A. Als de banden warm zijn.<br />B. Als de banden koud zijn.",
    // answer
    "s": "b",
    // explination
    "e": "LES 31 - &#039;Techniek&#039;.<br />De bandenspanning controleer je als de banden koud zijn en de auto horizontaal staat."
};

export const CONSTANTS = {
    MULTI_CHOICE: 'MULTI_CHOICE',
    YES_NO: 'YES_NO',
    INPUT: 'INPUT',
    YES_NO_VALUES: ['Ja', 'Neen'],
    ASSETS_BASEURL: 'https://examen.gratisrijbewijsonline.be/afbeeldingen'
}


export const data = _data.map(({
    // id
    id,
    // image
    qid,
    // points, 1 or 5
    qw,
    // question, html content with options
    q,
    // answer, a, b, c, ja, neen
    s,
    // explanation, html with links
    e,
    // group id, used for grouping and constructing image path
    seriesId,
    // title that this item belongs to
    title
}) => {
    const answerType = generateAnswerType(s)
    const { question, choices } = parseQuestion(q, answerType);
    return {
        id,
        title,
        seriesId,
        image: generateImageURL(qid, seriesId),
        question,
        answer: s,
        explanation: e,
        points: qw,
        answerType,
        isMajorFault: Number(qw) > 1,
        choices
    }
});

function generateImageURL(imageId, seriesId) {
    return `${CONSTANTS.ASSETS_BASEURL}/${seriesId}/${imageId}.jpg`;
}

function generateAnswerType(answerValue) {
    return ['a', 'b', 'c'].includes(answerValue) ?
        CONSTANTS.MULTI_CHOICE :
        (['ja', 'neen'].includes(answerValue) ?
            CONSTANTS.YES_NO :
            CONSTANTS.INPUT);
}

function parseQuestion(rawQuestion, answerType) {

    if (answerType === CONSTANTS.INPUT) {
        return {
            question: rawQuestion, choices: [],
        };
    }

    if (answerType === CONSTANTS.YES_NO) {
        return {
            question: rawQuestion, choices: CONSTANTS.YES_NO_VALUES,
        };
    }

    // "Waarmee moet een trambestuurder rekening houden?<br />1. De bevelen van een bevoegd persoon.<br />2. De verkeerslichten.<br />3. De voorrangsregels.<br /><br />A. Alleen met 1.<br />B. Alleen met 1 en 2.<br />C. Met 1, 2, en 3.",
    // "Wanneer je hier de bebouwde kom verlaat, dan is de maximaal toegelaten snelheid: 70 km per uur, tot aan het eerstvolgende kruispunt.<br /><br />A. Juist.<br />B. Niet juist.";

    // question is the first part declared as string, rest is an array of strings 
    const [question, ...rest] = rawQuestion.split('<br /><br />');

    if (!rest || rest.length === 0) {
        return {
            question, choices: []
        };
    }

    const [options] = rest;

    return {
        question, choices: options.split("<br />")
    };
}