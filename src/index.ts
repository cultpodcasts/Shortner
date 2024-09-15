import { base64ToGuid } from './guid-service'

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const keyRegex = /\/([A-Za-z0-9+_\-\/]{22})$/;
		let dataPoint: AnalyticsEngineDataPoint = { indexes: [], blobs: [] };

		let ipAddress: string = "";
		let asn: string = "";
		let city: string = "";
		if (request.cf != undefined && request.cf) {
			dataPoint.blobs!.push(request.cf.clientTrustScoretr as string);
			asn = request.cf.asn as string;
			dataPoint.blobs!.push(asn);
			ipAddress = request.headers.get('cf-connecting-ip') as string
			dataPoint.blobs!.push(ipAddress);
			dataPoint.blobs!.push(request.headers.get('User-Agent') as string);
			if (request.cf.city) {
				city = request.cf.city as string;
				dataPoint.blobs!.push(city);
			}
			if (request.cf.country) {
				dataPoint.blobs!.push(request.cf.country as string);
			}
		}
		let resp = new Response('Not Found', { status: 404 });
		const matches = keyRegex.exec(request.url);
		if (matches) {
			const key = matches[1];
			dataPoint.indexes!.push(key);
			try {
				const redirectPath = await env.kv.get(key);
				if (redirectPath) {
					const url = new URL(redirectPath, env.redirect);
					dataPoint.blobs!.push(redirectPath);
					resp = Response.redirect(url.toString());
				} else {
					dataPoint.blobs!.push("Key not found");
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
					console.log(`Querying for guid '${uuid}'.`)
					let result = await fetch("https://api.cultpodcasts.com/search", {
						method: "POST",
						body: JSON.stringify(episodeQuery)
					});
					if (result.status == 200) {
						const body: any = await result.json();
						if (body.value && body.value.length == 1) {
							const item = body.value[0];
							const url = new URL(`${encodeURIComponent(item.podcastName)}/${item.id}`, env.redirect);
							dataPoint.blobs!.push(redirectPath);
							resp = Response.redirect(url.toString());
						} else {
							if (!body.value)
								console.log(`Body value failure. No value. json: '${JSON.stringify(body)}'.`)
							else
								console.log(`Body value length failure. length!=1 is '${body.value.length}'. json: '${JSON.stringify(body)}'.`)
						}
					} else {
						console.log(`Failure invoking search-service. Status-code: '${result.status}'.`);
					}
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log(`url '${request.url}' does not match regex`);
			let pathName = new URL(request.url).pathname;
			if (pathName.length > 96) {
				pathName = pathName.slice(0, 95);
			}
			dataPoint.indexes!.push(pathName);
			dataPoint.blobs!.push("Path does not match");
		}
		try {
			env.analytics.writeDataPoint(dataPoint);
		} catch (error) {
			console.log(error);
		}
		return resp;
	}
};
