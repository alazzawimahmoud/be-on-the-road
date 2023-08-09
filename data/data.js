import { last, random } from 'lodash';
import _data from './data.json';
import { ANSWER_TYPES, mapQuestion, mapCategories, mapChoice } from '../shared';

export const categories = mapCategories(_data, 1)

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
    const { question, choices } = parseQuestion(q, answerType, s);
    const source = 1;
    const image = generateImageURL(qid, seriesId);
    return mapQuestion({
        id,
        title,
        seriesId,
        imageId: qid,
        image,
        question,
        answer: generateAnswerValue(s, answerType),
        explanation: generateExplanation(e),
        answerType,
        isMajorFault: Number(qw) > 1,
        choices,
        source,
        images: [
            {
                url: image,
                path: 'image',
                savedFilename: `${source}__${seriesId}__${qid}.jpg`
            },
        ]
    });
});


function generateExplanation(rawExplanation = '') {
    const parts = rawExplanation.split(']<br />');

    return last(parts);
}

function generateImageURL(imageId, seriesId) {
    return `${CONSTANTS.ASSETS_BASEURL}/${seriesId}/${imageId}.jpg`;
}

function generateAnswerValue(answerValue, answerType) {
    const answerValueMappings = {
        'a': 0,
        'b': 1,
        'c': 2,
        'ja': 0,
        'neen': 1,
    }
    if (answerType === 'INPUT') {
        return answerValue;
    }

    return answerValueMappings[answerValue] !== undefined ?
        answerValueMappings[answerValue] :
        answerValue;
}

function generateAnswerType(answerValue) {
    switch (true) {
        case ['a', 'b', 'c'].includes(answerValue):
            return ANSWER_TYPES.SINGLE_CHOICE;
        case ['ja', 'neen'].includes(answerValue):
            return ANSWER_TYPES.SINGLE_CHOICE;
        default:
            return ANSWER_TYPES.INPUT;

    }
}

function parseQuestion(rawQuestion, answerType, rawAnswer) {

    if (answerType === ANSWER_TYPES.INPUT) {
        return {
            question: rawQuestion,
            choices: [
                rawAnswer,
                // TODO Mocking data, remove when change answerType from INPUT to SINGLE_CHOICE
                random(100, 500), random(20, 200)
            ].map(mapChoice('text')),
        };
    }

    if (answerType === ANSWER_TYPES.YES_NO) {
        return {
            question: rawQuestion,
            choices: CONSTANTS.YES_NO_VALUE.map(mapChoice('text')),
        };
    }


    // question is the first part declared as string, rest is an array of strings 

    // this covers the following cases: 
    // ".... kruispunt.<br /><br />A. Juist.<br />B. Niet juist.";
    const [question, ...rest] = rawQuestion.split('<br /><br />');
    if (rest.length > 0) {
        const [options] = rest;
        return {
            question, choices: options.split("<br />").map(mapChoice('text'))
        };
    }

    // this covers the following case:
    // - "... noemt men ...<br /> <br />A. ... ademtest.<br />B. ... ademanalyse.",
    // - "... dan 1,35 m moet ...<br />A. een gewone veiligheidsgordel dragen.<br />B. in een ..."    
    const [questionB, ...restB] = rawQuestion.split('<br />A.');
    if (restB.length > 0) {
        const [options] = restB;
        return {

            question: questionB,
            choices: options.split("<br />")
                // We add A. to the first element because it was removed earlier by the .split operation
                .map((value, index) => index === 0 ? `A.${value}` : value)
                .map(mapChoice('text'))
        };
    }

    return {
        question: rawQuestion, choices: []
    };


}