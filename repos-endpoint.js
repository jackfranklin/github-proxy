const router = require('express').Router();
const Repo = require('./models/repo');
const Issues = require('./models/issues');
const api = require('./api');
const fromCacheOrCreate = require('./endpoints').fromCacheOrCreate;

router.get('/:username/:repo', (req, res) => {
  const username = req.params.username;
  const repo = req.params.repo;
  fromCacheOrCreate({
    res,
    Model: Repo,
    findQuery: {
      full_name: `${username}/${repo}`
    },
    apiRequestFn: () => api.repos(username, repo)
  });
});

router.get('/:username/:repo/issues', (req, res) => {
  const username = req.params.username;
  const repo = req.params.repo;

  const repoFullName = `${username}/${repo}`;

  fromCacheOrCreate({
    res,
    Model: Issues,
    findQuery: {
      repoFullName
    },
    apiRequestFn: () => api.issues(username, repo),
    inTransform: (data) => {
      return {
        repoFullName,
        issues: data
      }
    },
    outTransform: (model) => {
      return model.issues
    }
  });
});

module.exports = router;


