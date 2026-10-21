import { describe, expect, test } from 'vitest'
import { parseShortKey, toShortId } from '../src/short-id'

// Synthetic GUIDs. Expected ids computed independently (Python uuid.bytes_le + the site's -/_ swap),
// i.e. the same encoding as the website GuidService and RPP ToBase64 / CatalogueShortId.
const A = "0f1e2d3c-4b5a-6978-8796-a5b4c3d2e1f0";
const B = "fbfffeff-fdff-4fff-bfff-ffffffffffff";

describe("toShortId", () => {
  test.each([
    [A, null, "PC0eD1pLeGmHlqW0w9Lh8A"],
    [A, "Episode", "PC0eD1pLeGmHlqW0w9Lh8A"],
    [A, "NewsReport", "bjwtHg9aS3hph5altMPS4fA"],
    [A, "TvShowEpisode", "dDwtHg9aS3hph5altMPS4fA"],
    [A, "Film", "ZjwtHg9aS3hph5altMPS4fA"],
    [B, null, "--7-_--9-0_----------w"],
    [B, "NewsReport", "bv-_--v--f9Pv---------8"],
  ])("%s as %s -> %s", (guid, kind, expected) => {
    expect(toShortId(guid, kind)).toBe(expected);
  });
});

describe("parseShortKey", () => {
  test("22-char key is a podcast-shaped id with unknown kind", () => {
    expect(parseShortKey("PC0eD1pLeGmHlqW0w9Lh8A")).toEqual({ guid: A, kind: null });
    expect(parseShortKey("--7-_--9-0_----------w")).toEqual({ guid: B, kind: null });
  });

  test.each([
    ["bjwtHg9aS3hph5altMPS4fA", "NewsReport"],
    ["dDwtHg9aS3hph5altMPS4fA", "TvShowEpisode"],
    ["ZjwtHg9aS3hph5altMPS4fA", "Film"],
  ])("23-char key %s decodes its kind %s", (key, kind) => {
    expect(parseShortKey(key)).toEqual({ guid: A, kind });
  });

  test("23-char key with url-safe chars", () => {
    expect(parseShortKey("bv-_--v--f9Pv---------8")).toEqual({ guid: B, kind: "NewsReport" });
  });

  test("unknown prefix byte is rejected", () => {
    // 'x' + A's bytes
    const key = toShortId(A, "Film").replace(/^Zj/, "eD");
    expect(parseShortKey(key)).toBeNull();
  });

  test("other lengths are rejected", () => {
    expect(parseShortKey("PC0eD1pLeGmHlqW0w9Lh8")).toBeNull();
    expect(parseShortKey("PC0eD1pLeGmHlqW0w9Lh8AAA")).toBeNull();
  });

  test("round trip", () => {
    for (const kind of ["NewsReport", "TvShowEpisode", "Film"] as const) {
      expect(parseShortKey(toShortId(B, kind))).toEqual({ guid: B, kind });
    }
  });
});
