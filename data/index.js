import { mapCategories } from '../shared';
import final from './data_final.json';

// This code was used to generate the final data
// import * as data1 from './data';
// import * as data2 from './data-2';
// import filesMappings from './filesMappings.json';
// export const data = [...data1.data, ...data2.data]
//     .map(item => {
//         item.images.forEach(imageDetail => {
//             if (imageDetail.collection === 'choices') {
//                 item.choices[imageDetail.index][imageDetail.path] = filesMappings[imageDetail.savedFilename];
//                 return
//             }
//             item[imageDetail.path] = filesMappings[imageDetail.savedFilename];
//         });
//         delete item.images;
//         delete item.imageId;
//         return item;
//     })

export const categories = [
    ...mapCategories(final.filter(i => i.source === 1), 1),
    ...mapCategories(final.filter(i => i.source === 2), 2),
];


export const data = final;
