export type EmailVerificationFeedback =
    | {
        readonly type: "CONFIRM_FAILURE";
        readonly remainingCount: number;
    }
    | {
        readonly type: "RESEND_SUCCESS";
        readonly remainingCount: number;
    };