
module.exports = (model, fieldName) => Promise.all([
    model
      .find({}, fieldName)
      .sort({ [fieldName]: 1 })
      .limit(1),
    model
      .find({}, fieldName)
      .sort({ [fieldName]: -1 })
      .limit(1)
  ])
  .then(res => ({
    min: res[0][0][fieldName],
    max: res[1][0][fieldName]
  }));
