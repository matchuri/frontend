import { authApi } from "@/features/auth/infrastructure/api/authApi";
import { clearAuth } from "@/features/auth/application/store/authStore";

export async function logout() {
    try {
        await authApi.logout();
    } finally {
        clearAuth();
    }
}