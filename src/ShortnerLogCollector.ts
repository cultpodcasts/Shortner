import { ShortnerLog } from "./ShortnerLog";
import { ShortnerLogCollection } from "./ShortnerLogCollection";

export class ShortnerLogCollector implements ShortnerLogCollection {
    unsupportedRequest?: boolean;
    guid?: string;
    errorMessage?: string;
    exception?: unknown;
    pathNotMatch?: boolean;
    pathName?: string;
    url?: string;
    keyNotFound?: boolean;
    key?: string;
    country?: string;
    city?: string;
    userAgent?: string;
    ipAddress?: string;
    asn?: string;
    clientTrustScoretr?: string;
    error?: boolean;

    add(changes: ShortnerLogCollection) {
        if (changes.hasOwnProperty("unsupportedRequest")) {
            this.unsupportedRequest = changes.unsupportedRequest;
            this.error = true;
        }
        if (changes.hasOwnProperty("guid")) {
            this.guid = changes.guid;
        }
        if (changes.hasOwnProperty("errorMessage")) {
            this.errorMessage = changes.errorMessage;
            this.error = true;
        }
        if (changes.hasOwnProperty("exception")) {
            this.exception = changes.exception;
            this.error = true;
        }
        if (changes.hasOwnProperty("pathNotMatch")) {
            this.pathNotMatch = changes.pathNotMatch;
            this.error = true;
        }
        if (changes.hasOwnProperty("pathName")) {
            this.pathName = changes.pathName;
        }
        if (changes.hasOwnProperty("url")) {
            this.url = changes.url;
        }
        if (changes.hasOwnProperty("keyNotFound")) {
            this.keyNotFound = changes.keyNotFound;
            this.error = true;
        }
        if (changes.hasOwnProperty("key")) {
            this.key = changes.key;
        }
        if (changes.hasOwnProperty("country")) {
            this.country = changes.country;
        }
        if (changes.hasOwnProperty("city")) {
            this.city = changes.city;
        }
        if (changes.hasOwnProperty("userAgent")) {
            this.userAgent = changes.userAgent;
        }
        if (changes.hasOwnProperty("ipAddress")) {
            this.ipAddress = changes.ipAddress;
        }
        if (changes.hasOwnProperty("asn")) {
            this.asn = changes.asn;
        }
        if (changes.hasOwnProperty("clientTrustScoretr")) {
            this.clientTrustScoretr = changes.clientTrustScoretr;
        }
    }

    toShornerLog(): ShortnerLog {
        const shortnerLog: ShortnerLog = {
            request: {
                country: this.country,
                city: this.city,
                userAgent: this.userAgent,
                ipAddress: this.ipAddress,
                asn: this.asn,
                clientTrustScoretr: this.clientTrustScoretr
            },
            result: {
                guid: this.guid,
                pathName: this.pathName,
                url: this.url,
                key: this.key
            }
        };
        if (this.error) {
            shortnerLog.errors = {
                exception: this.exception,
                keyNotFound: this.keyNotFound,
                errorMessage: this.errorMessage,
                unsupportedRequest: this.unsupportedRequest,
                pathNotMatch: this.pathNotMatch
            };
        }
        return shortnerLog;
    }

    addCf(request: Request<unknown, CfProperties<unknown>>) {
        if (request.cf != undefined && request.cf) {
            this.add({
                clientTrustScoretr: request.cf.clientTrustScoretr as string,
                asn: request.cf.asn as string,
                ipAddress: request.headers.get('cf-connecting-ip') as string,
                userAgent: request.headers.get('User-Agent') as string
            });
            if (request.cf.city) {
                this.add({ city: request.cf.city as string });
            }
            if (request.cf.country) {
                this.add({ country: request.cf.country as string });
            }
        }
    }

}
