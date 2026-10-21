import { describe, expect, test } from 'vitest'
import { playableUrl, resolveKvValue, slugFor } from '../src/redirect-paths'

const A = "0f1e2d3c-4b5a-6978-8796-a5b4c3d2e1f0";
const BASE = "https://cultpodcasts.example/podcast/";
const ORIGIN = "https://cultpodcasts.example";

describe("resolveKvValue", () => {
  test("RPP podcast value {safeName}/{guid} -> /podcast/{safeName}/{22-char short id}", () => {
    expect(resolveKvValue(`Synthetic-Podcast/${A}`, BASE))
      .toBe(`${ORIGIN}/podcast/Synthetic-Podcast/PC0eD1pLeGmHlqW0w9Lh8A`);
  });

  test("encoded names are kept as written", () => {
    expect(resolveKvValue(`Synthetic%20Show%20%28Pilot%29/${A}`, BASE))
      .toBe(`${ORIGIN}/podcast/Synthetic%20Show%20%28Pilot%29/PC0eD1pLeGmHlqW0w9Lh8A`);
  });

  test.each([
    [`/news/Synthetic%20News/${A}`, `/news/Synthetic%20News/bjwtHg9aS3hph5altMPS4fA`],
    [`/tv/Synthetic%20Show/${A}`, `/tv/Synthetic%20Show/dDwtHg9aS3hph5altMPS4fA`],
    [`/film/Synthetic%20Film/${A}`, `/film/Synthetic%20Film/ZjwtHg9aS3hph5altMPS4fA`],
  ])("root-relative catalogue value %s uses the prefixed id", (value, path) => {
    expect(resolveKvValue(value, BASE)).toBe(`${ORIGIN}${path}`);
  });

  test("values already using a short id are unchanged", () => {
    expect(resolveKvValue("Synthetic-Podcast/PC0eD1pLeGmHlqW0w9Lh8A", BASE))
      .toBe(`${ORIGIN}/podcast/Synthetic-Podcast/PC0eD1pLeGmHlqW0w9Lh8A`);
  });

  test("unknown roots keep the GUID", () => {
    expect(resolveKvValue(`/other/x/${A}`, BASE)).toBe(`${ORIGIN}/other/x/${A}`);
  });
});

describe("playableUrl", () => {
  test.each([
    ["Episode", "Synthetic Podcast (Live)", `/podcast/Synthetic%20Podcast%20%28Live%29/PC0eD1pLeGmHlqW0w9Lh8A`],
    [undefined, "Synthetic Podcast", `/podcast/Synthetic%20Podcast/PC0eD1pLeGmHlqW0w9Lh8A`],
    ["NewsReport", "Synthetic News", `/news/Synthetic%20News/bjwtHg9aS3hph5altMPS4fA`],
    ["TvShowEpisode", "Synthetic & Show", `/tv/Synthetic%20%26%20Show/dDwtHg9aS3hph5altMPS4fA`],
    ["Film", "A Synthetic Film", `/film/A%20Synthetic%20Film/ZjwtHg9aS3hph5altMPS4fA`],
  ])("%s", (kind, slug, path) => {
    expect(playableUrl(ORIGIN, kind, slug, A)).toBe(`${ORIGIN}${path}`);
  });
});

describe("slugFor", () => {
  test("film uses its own title", () => {
    expect(slugFor({ id: A, contentKind: "Film", title: "A Synthetic Film", seriesName: "ignored" })).toBe("A Synthetic Film");
  });
  test("others use seriesName", () => {
    expect(slugFor({ id: A, contentKind: "NewsReport", seriesName: " Synthetic News " })).toBe("Synthetic News");
  });
  test("falls back to legacy podcastName", () => {
    expect(slugFor({ id: A, contentKind: "Episode", podcastName: "Legacy Podcast" })).toBe("Legacy Podcast");
  });
  test("no slug -> null", () => {
    expect(slugFor({ id: A, contentKind: "Episode" })).toBeNull();
  });
});
