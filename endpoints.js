const serialize = require('./serialize');

exports.fromCacheOrCreate = ({
  Model,
  findQuery,
  apiRequestFn,
  res,
  inTransform = x => x,
  outTransform = x => x
}) => {
  Model.findOne(findQuery).then((instance) => {
    if (instance) {
      res.json(serialize(instance, {
        cache: true,
        transform: outTransform
      }));
    } else {
      apiRequestFn().then((data) => {
        console.log('got data back from the API');
        return Model.create(inTransform(data)).then((result) => {
          console.log('model was created');
          res.json(serialize(result, {
            cache: false,
            transform: outTransform
          }));
        });
      });
    }
  }).catch(e => {
    console.log('API ERROR', e.message, e.stack);
    res.sendStatus(500);
  });
}
