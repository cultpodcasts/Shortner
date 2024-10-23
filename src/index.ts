import { base64ToGuid } from './guid-service'
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
				const redirectPath = await env.kv.get(key);
				if (redirectPath) {
					const url = new URL(redirectPath, env.redirect);
					shortnerLog.add({ url: redirectPath });
					resp = Response.redirect(url.toString());
				} else {
					shortnerLog.add({ keyNotFound: true });
					const uuid = base64ToGuid(key);
					var episodeQuery = {
						"search": "",
						"filter": `(id eq '${uuid}')`,
						"searchMode": "any",
						"queryType": "simple",
						"count": false,
						"skip": 0,
						"top": 20,
						"facets": [],
						"orderby": "release desc"
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
								shortnerLog.add({ error: true, errorMessage: `Body value failure. No value. json: '${JSON.stringify(body)}'.` });
							} else {
								shortnerLog.add({ error: true, errorMessage: `Body value length failure. length!=1 is '${body.value.length}'. json: '${JSON.stringify(body)}'.` });
							}
						}
					} else {
						shortnerLog.add({ error: true, errorMessage: `Failure invoking search-service. Status-code: '${result.status}'.` });
					}
				}
			} catch (error) {
				shortnerLog.add({exception:error, error:true});
			}
		} else {
			shortnerLog.add({error:true,errorMessage:`url '${request.url}' does not match regex`});
			let pathName = new URL(request.url).pathname;
			if (pathName.length > 96) {
				pathName = pathName.slice(0, 95);
			}
			shortnerLog.add({pathName:pathName});
			if (pathName != "/robots.txt" && pathName != "/favicon.ico" && pathName != "/") {
				shortnerLog.add({error:true});
			} else {
				shortnerLog.add({unsupportedRequest:true});
			}
			shortnerLog.add({pathNotMatch:true});
		}
		if (shortnerLog.error) {
			console.error(shortnerLog.toShornerLog());
		} else {
			console.log(shortnerLog.toShornerLog());
		}
		return resp;
	}
};


