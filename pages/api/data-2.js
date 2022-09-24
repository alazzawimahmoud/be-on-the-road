import { range, uniqBy } from 'lodash';


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
  const categories = await Promise.all(
    list.map(
      category => fetch(generateURL(category.id))
        .then(data => data.json())
        .then(data => data.map(q => ({ ...q, seriesId: category.id, title: category.label })))
    )
  );
  return categories.flat();
}

async function fetchMultiple() {
  const operations = await Promise.all(range(1, 7).map(() => fetchAll()))
  return uniqBy(operations.flat(), 'questionArray.question');
}



export default async function handler(req, res) {  
  // const data = await fetchMultiple();
  // res.status(200).json({ data });
}
