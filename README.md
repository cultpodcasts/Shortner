# Shortner

Shortner is a url-shortner that uses Cloudflare KV to redirect to a given URL.

It uses a Base64 encoded GUID as the key, and looks up the path from Cloudflare KV and prepends a given prefix to the URL. Thus shortening URLs using just 22-characters with zero collisons.