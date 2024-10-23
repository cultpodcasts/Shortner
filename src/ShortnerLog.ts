import { ShortnerLogBot } from "./ShortnerLogBot";
import { ShortnerLogErrors } from "./ShortnerLogErrors";
import { ShortnerLogRequest } from "./ShortnerLogRequest";
import { ShortnerLogResult } from "./ShortnerLogResult";

export interface ShortnerLog {
    errors?: ShortnerLogErrors;
    bot?: ShortnerLogBot;
    result?: ShortnerLogResult;
    request?: ShortnerLogRequest;
}
