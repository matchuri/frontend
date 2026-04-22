// OAuth code 교환 API의 전체 응답 타입.
import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";
import type { OAuthExchangeData } from "@/features/auth/domain/model/OAuthExchangeData";

export type OAuthExchangeResponse = ApiResponse<OAuthExchangeData>;