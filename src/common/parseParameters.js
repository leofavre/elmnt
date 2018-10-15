export default ({ parameters = [] }) => parameters
  .map(param => {
    if (param.attrProp != null) {
      const { attrProp, ...remaining } = param;
      const attr = attrProp;
      const prop = attrProp;
      return { attr, prop, ...remaining };
    }
    return param;
  });
