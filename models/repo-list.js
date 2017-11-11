const mongoose = require('mongoose');

const repoListSchema = new mongoose.Schema({
  repos: [ {} ],
  url: String,
}, {
  timestamps: true
});

const RepoList = mongoose.model('RepoList', repoListSchema);

module.exports = RepoList;
