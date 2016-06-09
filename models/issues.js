const mongoose = require('mongoose');

const issuesSchema = new mongoose.Schema({
  repoFullName: String,
  issues: [{
    html_url: String,
    id: Number,
    number: Number,
    title: String,
    user: {
      login: String
    },
    labels: [{ name: String }],
    state: String,
    locked: Boolean,
    created_at: String,
    updated_at: String,
    closed_at: String,
    body: String
  }]
}, {
  timestamps: true
});

const Issues = mongoose.model('Issues', issuesSchema);

module.exports = Issues;
