import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";

export interface RefreshData {
    accessToken: string;
}

export type RefreshResponse = ApiResponse<RefreshData>;