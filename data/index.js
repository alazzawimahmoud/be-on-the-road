import * as data1 from './data';
import * as data2 from './data-2';
export const categories = [...data1.categories, ...data2.categories];
export const data = [...data1.data, ...data2.data]
    // .filter(i => i.question === "Welk voertuig is prioritair?")
