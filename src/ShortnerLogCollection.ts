export interface ShortnerLogCollection {
    error?: boolean;
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
}
