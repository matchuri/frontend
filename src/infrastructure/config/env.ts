const clientValues = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080', //TODO: .env로 가야 함
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
} as const;