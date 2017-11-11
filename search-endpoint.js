const router = require('express').Router();
const RepoList = require('./models/repo-list');
const api = require('./api');
const fromCacheOrCreate = require('./endpoints').fromCacheOrCreate;

router.get('/repositories', (req, res) => {
  const query = req.query.q;
  fromCacheOrCreate({
    res,
    Model: RepoList,
    findQuery: {
      url: query,
    },
    inTransform: (data) => {
      return {
        url: query,
        repos: data.items,
      }
    },
    outTransform: data => {
      return { items: data.repos }
    },
    apiRequestFn: () => api.searchRepositories(query)
  });
});

module.exports = router;
