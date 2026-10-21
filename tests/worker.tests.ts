import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test'
import { afterEach, describe, expect, test, vi } from 'vitest'
import worker from '../src/index'

// Synthetic data only. KV here is Miniflare's local, per-test store (never production).
const A = "0f1e2d3c-4b5a-6978-8796-a5b4c3d2e1f0";
const ORIGIN = "https://cultpodcasts.example";

async function get(path: string): Promise<Response> {
  const ctx = createExecutionContext();
  const resp = await worker.fetch(new Request(`https://s.example${path}`) as any, env as any, ctx);
  await waitOnExecutionContext(ctx);
  return resp;
}

function mockSearch(value: unknown[] | null, status = 200) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(value === null ? {} : { value }), { status }));
}

afterEach(() => vi.restoreAllMocks());

describe("KV hit", () => {
  test("podcast record redirects to the 22-char short id", async () => {
    await env.kv.put("PC0eD1pLeGmHlqW0w9Lh8A", `Synthetic-Podcast/${A}`, { metadata: { episodeTitle: "Synthetic" } });
    const search = mockSearch([]);
    const resp = await get("/PC0eD1pLeGmHlqW0w9Lh8A");
    expect(resp.status).toBe(302);
    expect(resp.headers.get("location")).toBe(`${ORIGIN}/podcast/Synthetic-Podcast/PC0eD1pLeGmHlqW0w9Lh8A`);
    expect(search).not.toHaveBeenCalled();
  });

  test("query strings and a trailing slash still match", async () => {
    await env.kv.put("PC0eD1pLeGmHlqW0w9Lh8A", `Synthetic-Podcast/${A}`);
    mockSearch([]);
    for (const path of ["/PC0eD1pLeGmHlqW0w9Lh8A?utm_source=x", "/PC0eD1pLeGmHlqW0w9Lh8A/"]) {
      const resp = await get(path);
      expect(resp.status).toBe(302);
    }
  });
});

describe("KV miss -> search fallback", () => {
  test("podcast episode uses seriesName (no more /podcast/undefined)", async () => {
    const search = mockSearch([{ id: A, contentKind: "Episode", seriesName: "Synthetic Podcast" }]);
    const resp = await get("/PC0eD1pLeGmHlqW0w9Lh8A");
    expect(resp.status).toBe(302);
    expect(resp.headers.get("location")).toBe(`${ORIGIN}/podcast/Synthetic%20Podcast/PC0eD1pLeGmHlqW0w9Lh8A`);
    const body = JSON.parse((search.mock.calls[0][1] as RequestInit).body as string);
    expect(body.filter).toBe(`(id eq '${A}')`);
  });

  test.each([
    ["bjwtHg9aS3hph5altMPS4fA", { contentKind: "NewsReport", seriesName: "Synthetic News" }, "/news/Synthetic%20News/bjwtHg9aS3hph5altMPS4fA"],
    ["dDwtHg9aS3hph5altMPS4fA", { contentKind: "TvShowEpisode", seriesName: "Synthetic Show" }, "/tv/Synthetic%20Show/dDwtHg9aS3hph5altMPS4fA"],
    ["ZjwtHg9aS3hph5altMPS4fA", { contentKind: "Film", seriesName: "x", title: "Synthetic Film" }, "/film/Synthetic%20Film/ZjwtHg9aS3hph5altMPS4fA"],
  ])("23-char key %s routes by kind", async (key, doc, path) => {
    const search = mockSearch([{ id: A, ...doc }]);
    const resp = await get(`/${key}`);
    expect(resp.status).toBe(302);
    expect(resp.headers.get("location")).toBe(`${ORIGIN}${path}`);
    const body = JSON.parse((search.mock.calls[0][1] as RequestInit).body as string);
    expect(body.filter).toBe(`(id eq '${A}')`);
  });

  test("an old 22-char link to a moved item goes straight to its new kind", async () => {
    mockSearch([{ id: A, contentKind: "NewsReport", seriesName: "Synthetic News" }]);
    const resp = await get("/PC0eD1pLeGmHlqW0w9Lh8A");
    expect(resp.headers.get("location")).toBe(`${ORIGIN}/news/Synthetic%20News/bjwtHg9aS3hph5altMPS4fA`);
  });

  test("the indexed kind wins over the key's prefix", async () => {
    mockSearch([{ id: A, contentKind: "TvShowEpisode", seriesName: "Synthetic Show" }]);
    const resp = await get("/bjwtHg9aS3hph5altMPS4fA");
    expect(resp.headers.get("location")).toBe(`${ORIGIN}/tv/Synthetic%20Show/dDwtHg9aS3hph5altMPS4fA`);
  });

  test.each([
    ["no results", []],
    ["no slug", [{ id: A, contentKind: "Episode" }]],
    ["no value", null],
  ])("404 when %s", async (_, value) => {
    mockSearch(value as unknown[] | null);
    expect((await get("/PC0eD1pLeGmHlqW0w9Lh8A")).status).toBe(404);
  });

  test("404 when search fails", async () => {
    mockSearch([], 500);
    expect((await get("/PC0eD1pLeGmHlqW0w9Lh8A")).status).toBe(404);
  });
});

describe("non-matching paths", () => {
  test.each(["/", "/robots.txt", "/favicon.ico", "/short", "/a/PC0eD1pLeGmHlqW0w9Lh8A", "/PC0eD1pLeGmHlqW0w9Lh8AAA"])("%s -> 404 without lookups", async (path) => {
    const search = mockSearch([]);
    expect((await get(path)).status).toBe(404);
    expect(search).not.toHaveBeenCalled();
  });

  test("23-char key with an unknown prefix -> 404 without lookups", async () => {
    const search = mockSearch([]);
    expect((await get("/eDwtHg9aS3hph5altMPS4fA")).status).toBe(404);
    expect(search).not.toHaveBeenCalled();
  });
});
