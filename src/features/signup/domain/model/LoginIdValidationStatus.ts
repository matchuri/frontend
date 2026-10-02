export type LoginIdValidationStatus =
    | "IDLE"
    | "CHECKING"
    | "AVAILABLE"
    | "DUPLICATED"
    | "INVALID"
    | "ERROR";