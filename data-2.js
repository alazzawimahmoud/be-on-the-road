const generateURL = (id) => `https://mijnrijbewijs.eu/actions/mijnrijbewijs/data/getPractice?cat=${id}&type=rijbewijsb`
const list = [
    { "label": "Voorrang", "id": "voorrang" },
    { "label": "Bewegingen en manoeuvres", "id": "bewegenenmanoeuvres" },
    { "label": "Alcohol en afleiding", "id": "alcoholenafleiding" },
    {
        "label": "Hierarchie verkeersvoorschriften en de overweg",
        "id": "hierarchieverkeersvoorschriftenendeoverweg"
    },
    { "label": "Lading, pech en ongeval", "id": "ladingpechenongeval" },
    {
        "label": "Mobiliteit, rijbewijs en milieu",
        "id": "mobiliteitrijbewijsenmilieu"
    },
    { "label": "Openbare weg en markeringen", "id": "openbarewegenmarkeringen" },
    { "label": "Snelheid", "id": "snelheid" },
    { "label": "Stilstaan en parkeren", "id": "stilstaanenparkeren" },
    { "label": "Techniek voertuig", "id": "techniekvoertuigengordeldracht" },
    { "label": "Verkeersborden", "id": "verkeersborden" },
    { "label": "Voor de expert", "id": "voordeexpert" }
];

const results = []
async function fetchAll() {
    return Promise.all(
        list.map(
            category => fetch(generateURL(category.id))
                .then(data => data.json())
                .then(data => data.map(q => ({ ...q, seriesId: category.category.id, title: category.category.label })))
        )
    )
}


import _data from './data-2.json';
import { mapQuestion } from './shared';

const ANSWER_TYPES = {
    NORMAL: 'NORMAL',
    ORDER: 'ORDER',
    INPUT: 'INPUT',
}

const answerTypesMappings = { normaalAntwoord: ANSWER_TYPES.NORMAL, volgordeAntwoord: ANSWER_TYPES.ORDER, invulAntwoord: ANSWER_TYPES.INPUT };

export const rawData = _data.map(q => ({ ...q, answerType: answerTypesMappings[q.answerArray[0].type] }));
export const data = rawData.map(({
    answerArray,
    clarification,
    givenAnswer,
    pointsCategory,
    questionArray,
    seriesId,
    title,
    answerType,
}, index) => {

    let answer, question;
    let choices = [];
    switch (answerType) {
        case ANSWER_TYPES.INPUT:
            question = `${questionArray.question} </ br> ${answerArray[0].fields.zin}`;
            break;
        default:
            answer = answerArray.findIndex(a => a.fields.correct === "1");
            question = questionArray.question;
            choices = answerArray.map(a => a.fields.tekst);
            break;
    }
    return mapQuestion({
        id: `${seriesId}_${index + 1}`,
        title,
        seriesId,
        image: questionArray.image,
        question,
        answer,
        explanation: '',
        points: '',
        answerType,
        isMajorFault: '',
        choices,
    })
})