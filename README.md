## GitHub Proxy

I do a lot of work using the GitHub API for demos, as it's a detailed API with lots of data, it's well structured and it doesn't need authentication.

Unfortunately I often hit rate limits so I've taken to building this app. It:

- Stores any request from GitHub into a MongoDB and returns that the next time it's asked for.
- This also means you can run it locally and be able to make requests when offline (useful for airplane / train work).

### Supported URLs:

- `/users/:username`
- `/repos/:username/:repoName`
- `/repos/:username/:repoName/issues`

### Todo

- "Smart" caching: cache for 24 hours then re-make request, but always return cache if request fails (never delete cache when offline).

- More endpoints


