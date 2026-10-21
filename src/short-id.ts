import { Buffer } from 'node:buffer';
import { base64ToGuid } from './guid-service';

/** Search-index / RPP content kinds. Podcast episodes are "Episode" (or absent on old records). */
export type ContentKind = "Episode" | "Film" | "TvShowEpisode" | "NewsReport";

export const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const prefixes: Record<string, ContentKind> = { f: "Film", t: "TvShowEpisode", n: "NewsReport" };

function prefixFor(kind: string | null | undefined): string | null {
    switch (kind) {
        case "Film": return "f";
        case "TvShowEpisode": return "t";
        case "NewsReport": return "n";
        default: return null;
    }
}

/** Site route root for a kind. Anything that is not Film/TV/News is a podcast episode. */
export function rootFor(kind: string | null | undefined): "podcast" | "film" | "tv" | "news" {
    switch (kind) {
        case "Film": return "film";
        case "TvShowEpisode": return "tv";
        case "NewsReport": return "news";
        default: return "podcast";
    }
}

export function kindForRoot(root: string): ContentKind | null {
    switch (root) {
        case "film": return "Film";
        case "tv": return "TvShowEpisode";
        case "news": return "NewsReport";
        case "podcast": return "Episode";
        default: return null;
    }
}

function guidToBytes(guid: string): number[] {
    const bytes: number[] = [];
    guid.split('-').forEach((part, index) => {
        const pairs = part.match(/.{1,2}/g)!;
        (index < 3 ? pairs.reverse() : pairs).forEach(pair => bytes.push(parseInt(pair, 16)));
    });
    return bytes;
}

function toUrlBase64(bytes: number[]): string {
    return Buffer.from(bytes).toString("base64")
        .replaceAll("/", "-").replaceAll("+", "_").replaceAll("=", "");
}

/**
 * Same encoding as the website's GuidService / RPP: podcast episodes get the 22-char id,
 * Film / TV / News get a one-byte kind prefix ('f' / 't' / 'n') giving a 23-char id.
 */
export function toShortId(guid: string, kind?: string | null): string {
    const prefix = prefixFor(kind);
    const bytes = guidToBytes(guid);
    return toUrlBase64(prefix ? [prefix.charCodeAt(0), ...bytes] : bytes);
}

export interface ParsedKey { guid: string; kind: ContentKind | null; }

/** 22-char key -> podcast-shaped (kind unknown); 23-char key -> kind from its prefix byte. */
export function parseShortKey(key: string): ParsedKey | null {
    if (key.length === 22) {
        return { guid: base64ToGuid(key), kind: null };
    }
    if (key.length === 23) {
        const bytes = Buffer.from(`${key.replaceAll("-", "/").replaceAll("_", "+")}=`, "base64");
        if (bytes.length !== 17) {
            return null;
        }
        const kind = prefixes[String.fromCharCode(bytes[0])];
        if (!kind) {
            return null;
        }
        return { guid: base64ToGuid(toUrlBase64([...bytes.subarray(1)])), kind };
    }
    return null;
}
