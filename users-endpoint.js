const router = require('express').Router();
const User = require('./models/user');
const RepoList = require('./models/repo-list');
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

router.get('/:username/repos', (req, res) => {
  const username = req.params.username;
  fromCacheOrCreate({
    res,
    Model: RepoList,
    findQuery: {
      url: req.url,
    },
    inTransform: (data) => {
      return {
        url: req.url,
        repos: data
      }
    },
    outTransform: data => {
      return data.repos
    },
    apiRequestFn: () => api.reposForUser(username, req.params.page)
  })

})

module.exports = router;


