// OAuth API 전체 응답 타입
import type { ApiResponse } from "./ApiResponse";
import type { OAuthExchangeData } from "./OAuthExchangeData";

export type OAuthExchangeResponse = ApiResponse<OAuthExchangeData>;