const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: String,
  id: Number,
  name: String,
  company: String,
  blog: String,
  location: String,
  bio: String,
  public_repos: Number,
  public_gists: Number
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;


