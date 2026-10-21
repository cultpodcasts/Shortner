import { GUID_REGEX, kindForRoot, rootFor, toShortId } from './short-id';

/** Matches the escaping the Worker has always used for slugs ( ( and ) as well as encodeURIComponent ). */
export function encodeSlug(slug: string): string {
    return encodeURIComponent(slug).replaceAll("(", "%28").replaceAll(")", "%29");
}

/** Absolute site URL for a playable: /{podcast|news|tv|film}/{slug}/{shortId}. */
export function playableUrl(siteOrigin: string, kind: string | null | undefined, slug: string, guid: string): string {
    return new URL(`/${rootFor(kind)}/${encodeSlug(slug)}/${toShortId(guid, kind)}`, siteOrigin).toString();
}

/**
 * KV values are written by RPP as `{podcastSafeName}/{guid}`, resolved against `redirect`
 * (…/podcast/). A trailing GUID segment is swapped for the short id of the kind its route
 * root implies, so the site does not need a GUID -> short-id 301. Anything else is unchanged.
 */
export function resolveKvValue(value: string, redirectBase: string): string {
    const url = new URL(value, redirectBase);
    const segments = url.pathname.split("/");
    const last = segments[segments.length - 1];
    if (GUID_REGEX.test(last)) {
        const kind = kindForRoot(segments[1] ?? "");
        if (kind) {
            segments[segments.length - 1] = toShortId(last, kind);
            url.pathname = segments.join("/");
        }
    }
    return url.toString();
}

/** Search-index document fields the fallback uses. `podcastName` is the pre-rename field. */
export interface SearchDocument {
    id: string;
    contentKind?: string | null;
    seriesName?: string | null;
    podcastName?: string | null;
    title?: string | null;
    episodeTitle?: string | null;
}

/** Slug the website routes on: the film's own title for Film, the parent name otherwise. */
export function slugFor(item: SearchDocument): string | null {
    const slug = item.contentKind === "Film"
        ? (item.title ?? item.episodeTitle)
        : (item.seriesName ?? item.podcastName);
    return slug && slug.trim() ? slug.trim() : null;
}
