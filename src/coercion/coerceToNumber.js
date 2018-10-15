import coerceToNumberOrUndefined from './coerceToNumberOrUndefined.js';

export default attrValue => coerceToNumberOrUndefined(attrValue) || 0;
