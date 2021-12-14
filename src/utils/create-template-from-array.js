export const createTemplateFromArray = (array, cb) => array.map((item) => cb(item)).join('');
