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


import { shuffle } from 'lodash';
import _data from './data-2.json';
import { mapQuestion, ANSWER_TYPES, mapCategories, mapChoice } from '../shared';

export const categories = mapCategories(_data);

const answerTypesMappings = {
    normaalAntwoord: ANSWER_TYPES.SINGLE_CHOICE,
    volgordeAntwoord: ANSWER_TYPES.ORDER,
    invulAntwoord: ANSWER_TYPES.INPUT
};

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
    // TODO Support For video & for Text only questions
    let answer, question;
    let choices = [];
    question = questionArray.question;
    answer = answerArray.findIndex(a => a.fields.correct === "1");
    choices = answerArray.map(a => ({
        text: a.fields.tekst,
        image: a.fields.afbeelding,
    }));
    switch (answerType) {
        case ANSWER_TYPES.INPUT:
            question = `${questionArray.question} </ br> ${answerArray[0].fields.zin}`;
            break;

        case ANSWER_TYPES.ORDER:
            // Extract the text or images values
            const [options = { fields: {} }] = answerArray;
            const {
                zin1, zin2, zin3,
                afbeelding1, afbeelding2, afbeelding3
            } = options.fields;
            const textOptions = zin1 && zin2 && zin3;
            const imageOptions = afbeelding1 && afbeelding2 && afbeelding3;

            // Arrange them in the correct order
            if (imageOptions) {
                answer = [afbeelding1, afbeelding2, afbeelding3].map(mapChoice('image'));
            }

            if (textOptions) {
                answer = [zin1, zin2, zin3].map(mapChoice('text'));
            }

            // Shuffle the choices, and provide the answer as indexed values of the given choices.
            if (imageOptions || textOptions) {
                choices = shuffle(answer);
                answer = choices.map(choice => answer.findIndex(answerValue => answerValue === choice))
            }

            break;
    }

    return mapQuestion({
        id: `${seriesId}_${index + 1}`,
        title,
        seriesId,
        image: questionArray.image,
        video: questionArray.video,
        question,
        answer,
        explanation: clarification,
        answerType,
        isMajorFault: Number(pointsCategory) > 1,
        choices,
    });


})
// .filter(item => item.answerType === ANSWER_TYPES.ORDER)