import { authApi } from "@/features/auth/infrastructure/api/authApi";
import type { LoginRequest } from "@/features/auth/domain/model/LoginRequest";
import {
    clearAuth,
    setAuthenticated,
} from "@/features/auth/application/store/authStore";

export async function login(request: LoginRequest) {
    try {
        const response = await authApi.login(request);
        const accessToken = response.data.accessToken;

        setAuthenticated(accessToken);

        return response;
    } catch (error) {
        clearAuth();
        throw error;
    }
}