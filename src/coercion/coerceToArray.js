import coerceToArrayOrUndefined from './coerceToArrayOrUndefined.js';

export default attrValue => coerceToArrayOrUndefined(attrValue) || [];
