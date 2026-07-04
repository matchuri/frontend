import { clearAuth } from "@/features/auth/application/store/authStore";
import { deleteMember } from "@/features/settings/infrastructure/api/settingsApi";

export async function deleteMemberAccount() {
    try {
        await deleteMember();
    } finally {
        clearAuth();
    }
}