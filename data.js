import { chain, kebabCase, snakeCase, uniq, uniqBy } from 'lodash';
import _data from './data.json';

export const categories = chain(_data)
    .groupBy('seriesId')
    .map((group, seriesId) => {
        const i = group[0];
        return {
            title: i.title,
            slug: kebabCase(i.title),
            path: `/${kebabCase(i.title)}`,
            seriesId: Number(seriesId),
            total: group.length
        }
    })
    .value();

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
        answer: generateAnswerValue(s, answerType),
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
            return CONSTANTS.MULTI_CHOICE
        case ['ja', 'neen'].includes(answerValue):
            return CONSTANTS.YES_NO
        default:
            return CONSTANTS.INPUT;

    }
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


    // question is the first part declared as string, rest is an array of strings 

    // this covers the following cases: 
    // ".... kruispunt.<br /><br />A. Juist.<br />B. Niet juist.";
    const [question, ...rest] = rawQuestion.split('<br /><br />');
    if (rest.length > 0) {
        const [options] = rest;
        return {
            question, choices: options.split("<br />")
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
        };
    }

    return {
        question: rawQuestion, choices: []
    };


}