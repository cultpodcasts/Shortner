export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const keyRegex = /\/([A-Za-z0-9+/]{22})$/;
		const matches = keyRegex.exec(request.url);
		if (matches) {
			const key = matches[1];
			try {
				const redirectPath = await env.kv.get(key);
				if (redirectPath) {
					const url = new URL(redirectPath, env.redirect);
					return Response.redirect(url.toString());
				}
			} catch (error) {
				console.log(error);
			}
		}
		return new Response('Not Found', { status: 404 });
	},
};
