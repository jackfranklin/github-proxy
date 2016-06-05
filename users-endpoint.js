const router = require('express').Router();
const User = require('./models/user');
const api = require('./api');
const fromCacheOrCreate = require('./endpoints').fromCacheOrCreate;

router.get('/:username', (req, res) => {
  const username = req.params.username;

  fromCacheOrCreate({
    res,
    Model: User,
    findQuery: {
      login: username
    },
    apiRequestFn: () => api.users(username)
  });
});

module.exports = router;


