// 현재 이메일 인증 상태
export type EmailVerificationStatus =
    | "IDLE"
    | "SENDING" // 인증 코드 발송 중
    | "SENT" // 인증 코드 발송 완료
    | "VERIFYING" // 인증 코드 확인 중
    | "VERIFIED" // 이메일 인증 완료
    | "EXPIRED" // 인증 코드 만료
    | "ERROR"; // 오류 발생