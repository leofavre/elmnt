import isNumeric from '../helpers/isNumeric.js';

export default attrValue => (isNumeric(attrValue))
  ? parseFloat(attrValue, 2)
  : undefined;
