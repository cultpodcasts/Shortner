import { oDataSearchRequest } from './oDataSearchRequest';
import { parseShortKey } from './short-id';
import { playableUrl, resolveKvValue, SearchDocument, slugFor } from './redirect-paths';
import { ShortnerLogCollector } from "./ShortnerLogCollector";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// 22 chars: podcast episode (base-64 GUID). 23 chars: Film / TV / News (kind byte + GUID).
		const keyRegex = /^\/([A-Za-z0-9_\-]{22,23})\/?$/;
		const shortnerLog = new ShortnerLogCollector();
		shortnerLog.addCf(request);
		let resp = new Response('Not Found', { status: 404 });
		const matches = keyRegex.exec(new URL(request.url).pathname);
		if (matches) {
			const key = matches[1];
			shortnerLog.add({ key: key });
			try {
				const parsed = parseShortKey(key);
				const kvItem = parsed ? await env.kv.getWithMetadata<any>(key) : null;
				if (!parsed) {
					shortnerLog.add({ errorMessage: `Key '${key}' is not a valid short id.` });
				} else if (kvItem?.value) {
					const url = resolveKvValue(kvItem.value, env.redirect);
					shortnerLog.add({ url: url, episodeTitle: kvItem.metadata?.episodeTitle });
					resp = Response.redirect(url);
				} else {
					shortnerLog.add({ keyNotFound: true });
					const uuid = parsed.guid;
					var episodeQuery: oDataSearchRequest = {
						search: "",
						filter: `(id eq '${uuid}')`,
						searchMode: "any",
						queryType: "simple",
						count: false,
						skip: 0,
						top: 20,
						facets: [],
						orderby: "release desc"
					};
					shortnerLog.add({ guid: uuid });
					let result = await fetch("https://api.cultpodcasts.com/search", {
						method: "POST",
						body: JSON.stringify(episodeQuery)
					});
					if (result.status == 200) {
						const body: any = await result.json();
						if (body.value && body.value.length == 1) {
							const item: SearchDocument = body.value[0];
							const slug = slugFor(item);
							if (slug) {
								// Route by the indexed kind (authoritative even if a prefixed key says otherwise).
								const url = playableUrl(new URL(env.redirect).origin, item.contentKind, slug, uuid);
								shortnerLog.add({ url: url });
								resp = Response.redirect(url);
							} else {
								shortnerLog.add({ errorMessage: `Search result for '${uuid}' has no slug. contentKind: '${item.contentKind}'.` });
							}
						} else {
							if (!body.value) {
								shortnerLog.add({ errorMessage: `Body value failure. No value. json: '${JSON.stringify(body)}'.` });
							} else {
								shortnerLog.add({ errorMessage: `Body value length failure. length!=1 is '${body.value.length}'. json: '${JSON.stringify(body)}'.` });
							}
						}
					} else {
						shortnerLog.add({ errorMessage: `Failure invoking search-service. Status-code: '${result.status}'.` });
					}
				}
			} catch (error) {
				shortnerLog.add({ exception: error });
			}
		} else {
			let pathName = new URL(request.url).pathname;
			if (pathName.length > 96) {
				pathName = pathName.slice(0, 95);
			}
			shortnerLog.add({ pathName: pathName });
			if (pathName != "/robots.txt" && pathName != "/favicon.ico" && pathName != "/") {
				shortnerLog.add({ pathNotMatch: true, errorMessage: `url '${request.url}' does not match regex` });
			} else {
				shortnerLog.add({ unsupportedRequest: true });
			}
		}
		if (shortnerLog.error) {
			console.error(shortnerLog.toShortnerLog());
		} else {
			console.log(shortnerLog.toShortnerLog());
		}
		return resp;
	}
};


