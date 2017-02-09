const fetch = require('isomorphic-fetch');

const TOKEN = process.env.GITHUB_TOKEN;

const fetchWithToken = (url, options = {}) => {
  console.log('GitHub Fetch', url);
  return fetch(url, Object.assign({}, options, {
    headers: {
      'Authorization' : `token ${TOKEN}`
    }
  })).then(d => d.json()).then(d => {
    console.log('GitHub response data received');
    return d;
  });;
}

const githubFetch = (extraUrl, options = {}) => {
  return fetchWithToken(`https://api.github.com${extraUrl}`, options);
};

exports.users = (username) => {
  return githubFetch(`/users/${username}`);
}

exports.repos = (username, repo) => {
  return githubFetch(`/repos/${username}/${repo}`);
};

exports.reposForUser = (username, page = 1) => {
  return githubFetch(`/users/${username}/repos?page=${page}`);
}

exports.issues = (username, repo) => {
  return githubFetch(`/repos/${username}/${repo}/issues`);
};
