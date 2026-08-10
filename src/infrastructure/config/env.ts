const clientValues = {
  apiBaseUrl: process.env.NEXT_PUBLIC_MATCHURI_BACKEND_ORIGIN,
  kakaoMapAppKey: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY,
  captchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
} as const;

// 필수 값 체크 (fail-fast)
const missing = Object.entries(clientValues)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  throw new Error(
    `[env] 필수 환경 변수가 누락되었습니다: ${missing.join(", ")}`
  );
}

export const clientEnv = {
  apiBaseUrl: clientValues.apiBaseUrl!,
  kakaoMapAppKey: clientValues.kakaoMapAppKey!,
  captchaSiteKey: clientValues.captchaSiteKey!,
  sentryDsn: clientValues.sentryDsn!,
} as const;