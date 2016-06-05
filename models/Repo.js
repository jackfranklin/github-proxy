const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  login: String,
  name: String,
  full_name: String,
  description: String,
  fork: Boolean,
  created_at: String,
  updated_at: String,
  pushed_at: String,
  stargazers_count: Number,
  watchers_count: Number,
  language: String,
  forks_count: Number,
  open_issues_count: Number,
}, {
  timestamps: true
});

const Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;

