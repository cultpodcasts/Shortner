import { stringify } from "uuid";
import { Buffer } from 'node:buffer';

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
					const base64 = `${key}==`;
					const uint8Array = new Uint8Array(Buffer.from(base64, "base64"));
					const first4 = uint8Array.subarray(0, 4).reverse();
					const second2 = uint8Array.subarray(4, 6).reverse();
					const third2 = uint8Array.subarray(6, 8).reverse();
					const remainder = uint8Array.subarray(8, 16);
					const ordered = new Uint8Array(16);
					ordered.set(first4);
					ordered.set(second2, 4);
					ordered.set(third2, 6);
					ordered.set(remainder, 8);
					const uuid = stringify(ordered);
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
					let result = await fetch("https://api.cultpodcasts.com/search", {
						method: "POST",
						body: JSON.stringify(episodeQuery)
					});
					if (result.status == 200) {
						const body: any = await result.json();
						if (body.value && body.value.length == 1) {
							const item = body.value[0];
							const url = new URL(`${item.podcastName}/${item.id}`, env.redirect);
							dataPoint.blobs!.push(redirectPath);
							resp = Response.redirect(url.toString());
						} else {
							if (!body.value)
								console.log(`Body value failure. No value. json: '${body}'.`)
							else
								console.log(`Body value length failure. length!=1 is '${body.value.length}'. json: '${body}'.`)
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
