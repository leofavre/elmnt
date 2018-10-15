export default attrValue => (attrValue == null || attrValue === '')
  ? undefined
  : attrValue.split(',');
