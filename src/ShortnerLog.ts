import { ShortnerLogErrors } from "./ShortnerLogErrors";
import { ShortnerLogRequest } from "./ShortnerLogRequest";
import { ShortnerLogResult } from "./ShortnerLogResult";

export interface ShortnerLog {
    errors?: ShortnerLogErrors;
    result?: ShortnerLogResult;
    request?: ShortnerLogRequest;
}
