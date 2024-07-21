import { stringify } from "uuid";
import { Buffer } from 'node:buffer';

export function base64ToGuid(key: string): string {
    key = key.replaceAll("-", "/");
    key = key.replaceAll("_", "+");
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
    return uuid;
}

