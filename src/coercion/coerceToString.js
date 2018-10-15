import coerceToStringOrUndefined from './coerceToStringOrUndefined.js';

export default attrValue => coerceToStringOrUndefined(attrValue) || '';
