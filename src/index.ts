import { base64ToGuid } from './guid-service'
import { oDataSearchRequest } from './oDataSearchRequest';
import { ShortnerLogCollector } from "./ShortnerLogCollector";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const keyRegex = /\/([A-Za-z0-9+_\-\/]{22})$/;
		const shortnerLog = new ShortnerLogCollector();
		shortnerLog.addCf(request);
		let resp = new Response('Not Found', { status: 404 });
		const matches = keyRegex.exec(request.url);
		if (matches) {
			const key = matches[1];
			shortnerLog.add({ key: key });
			try {
				const kvItem = await env.kv.getWithMetadata<any>(key);
				if (kvItem?.value) {
					const url = new URL(kvItem.value, env.redirect);
					shortnerLog.add({ url: kvItem.value, episodeTitle: kvItem.metadata?.episodeTitle });
					resp = Response.redirect(url.toString());
				} else {
					shortnerLog.add({ keyNotFound: true });
					const uuid = base64ToGuid(key);
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
							const item = body.value[0];
							const encodedPodcastName =
								encodeURIComponent(item.podcastName)
									.replaceAll("(", "%28")
									.replaceAll(")", "%29");
							const url = new URL(`${encodedPodcastName}/${item.id}`, env.redirect);
							shortnerLog.add({ url: url.toString() });
							resp = Response.redirect(url.toString());
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


