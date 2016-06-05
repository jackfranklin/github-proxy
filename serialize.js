const _ = require('lodash');
const stripDbObj = (obj) => {
  const newObj = _.omit(obj, ['_id', 'createdAt', 'updatedAt']);
  Object.keys(newObj).forEach(k => {
    if (_.isPlainObject(newObj[k])) {
      newObj[k] = stripDbObj(newObj[k]);
    } else if (Array.isArray(newObj[k])) {
      newObj[k] = newObj[k].map(x => _.isPlainObject(x) ? stripDbObj(x) : x);
    }
  });

  return newObj;
}

module.exports = (mongoObject, { cache, transform = x => x }) => {
  const mongoObj = mongoObject.toObject({
    versionKey: false
  });

  const mongoId = mongoObj._id;
  const createdAt = mongoObj.createdAt;

  const transformed = transform(mongoObj);

  const proxyObj = {
    __proxy: {
      createdAt,
      mongoId,
      cache
    }
  }


  if (Array.isArray(transformed)) {
    return transformed.map(item => {
      return Object.assign({}, stripDbObj(item), proxyObj);
    });
  } else {
    return Object.assign({}, stripDbObj(transformed), proxyObj);
  }
}
