// 일반 로그인 성공 응답 타입
import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";
import type { LoginMember } from "@/features/auth/domain/model/LoginMember";

export interface LoginResponseData {
    readonly accessToken: string;
    readonly refreshToken: string | null;
    readonly expiresIn: number;
    readonly member: LoginMember;
}

export type LoginResponse = ApiResponse<LoginResponseData>;