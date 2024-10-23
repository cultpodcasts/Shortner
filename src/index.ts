import { base64ToGuid } from './guid-service'
import { ShortnerLog } from './ShortnerLog';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const keyRegex = /\/([A-Za-z0-9+_\-\/]{22})$/;
		let shortnerLog: ShortnerLog = {};
		if (request.cf != undefined && request.cf) {
			shortnerLog.clientTrustScoretr = request.cf.clientTrustScoretr as string;
			shortnerLog.asn = request.cf.asn as string;
			shortnerLog.ipAddress = request.headers.get('cf-connecting-ip') as string;
			shortnerLog.userAgent = request.headers.get('User-Agent') as string;
			if (request.cf.city) {
				shortnerLog.city = request.cf.city as string;
			}
			if (request.cf.country) {
				shortnerLog.country = request.cf.country as string;
			}
		}
		let resp = new Response('Not Found', { status: 404 });
		const matches = keyRegex.exec(request.url);
		if (matches) {
			const key = matches[1];
			shortnerLog.key = key;
			try {
				const redirectPath = await env.kv.get(key);
				if (redirectPath) {
					const url = new URL(redirectPath, env.redirect);
					shortnerLog.url = redirectPath;
					resp = Response.redirect(url.toString());
				} else {
					shortnerLog.keyNotFound = true;
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
					shortnerLog.guid = uuid;
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
							shortnerLog.url = url.toString();
							resp = Response.redirect(url.toString());
						} else {
							shortnerLog.error = true;
							if (!body.value)
								shortnerLog.errorMessage = `Body value failure. No value. json: '${JSON.stringify(body)}'.`;
							else
								shortnerLog.errorMessage = `Body value length failure. length!=1 is '${body.value.length}'. json: '${JSON.stringify(body)}'.`;
						}
					} else {
						shortnerLog.error = true;
						shortnerLog.errorMessage = `Failure invoking search-service. Status-code: '${result.status}'.`;
					}
				}
			} catch (error) {
				shortnerLog.exception = error;
				shortnerLog.error = true;
			}
		} else {
			shortnerLog.error = true;
			shortnerLog.errorMessage = `url '${request.url}' does not match regex`;
			let pathName = new URL(request.url).pathname;
			if (pathName.length > 96) {
				pathName = pathName.slice(0, 95);
			}
			shortnerLog.pathName = pathName;
			shortnerLog.pathNotMatch = true;
		}
		if (shortnerLog.error) {
			console.error(shortnerLog);
		} else {
			console.log(shortnerLog);
		}
		return resp;
	}
};
