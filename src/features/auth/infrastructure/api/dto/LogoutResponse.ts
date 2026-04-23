import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";

export type LogoutResponse = ApiResponse<{
    loggedOut: boolean;
}>;