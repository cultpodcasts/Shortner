# Shortner

Shortner is a url-shortner that uses Cloudflare KV to redirect to a given URL.

It uses a Base64 encoded GUID as the key, and looks up the path from Cloudflare KV and prepends a given prefix to the URL. Thus shortening URLs using just 22-characters with zero collisons.

## Keys and redirects

- **22-char key**: base-64 GUID of a podcast episode (written to KV by RedditPodcastPoster as `{podcastSafeName}/{guid}`).
- **23-char key**: Film / TV episode / news report short id, a one-byte kind prefix (`f`, `t`, `n`) plus the GUID, the same id the website uses in `/film`, `/tv` and `/news` URLs.

A KV hit redirects to `redirect` + the stored value, with a trailing GUID swapped for its short id. A miss looks the GUID up in the search index and redirects by its `contentKind` to `/podcast|/news|/tv|/film/{slug}/{shortId}` (slug is the film's title for Film, else `seriesName`).

## Tests

`npx vitest run` (synthetic data; KV is Miniflare's local store). For `wrangler dev`, put `redirect=…` in an uncommitted `.dev.vars`.
