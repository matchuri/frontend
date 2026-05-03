"use client";

import { useAtomValue } from "jotai";
import { useAuthGuard } from "@/features/routeGuard/application/hooks/useAuthGuard";
import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";
import { isLocalLoginAtom } from "@/features/settings/application/selectors/settingsSelectors";
import { useSettingsProfile } from "@/features/settings/application/hooks/useSettingsProfile";
import ProfileManagementSection from "@/features/settings/ui/components/ProfileManagementSection";
import AccountManagementSection from "@/features/settings/ui/components/AccountManagementSection";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

export default function SettingsPage() {
    const { isAuthenticated, isAuthLoading } = useAuthGuard();

    useSettingsProfile(isAuthenticated);

    const settingsState = useAtomValue(settingsAtom);
    const isLocalLogin = useAtomValue(isLocalLoginAtom);

    if (isAuthLoading || !isAuthenticated) {
        return (
            <main className={settingsPageStyles.page}>
                로그인 상태를 확인하는 중...
            </main>
        );
    }

    if (settingsState.status === "LOADING") {
        return (
            <main className={settingsPageStyles.page}>
                설정 정보를 불러오는 중...
            </main>
        );
    }

    if (settingsState.status === "ERROR") {
        return (
            <main className={settingsPageStyles.page}>
                {settingsState.message}
            </main>
        );
    }

    const profile = settingsState.data;

    return (
        <main className={settingsPageStyles.page}>
            <h1 className={settingsPageStyles.title}>설정</h1>
            <p className={settingsPageStyles.description}>
                프로필 정보 및 계정 보안 설정을 관리하세요.
            </p>

            <ProfileManagementSection nickname={profile.nickname} />

            <AccountManagementSection
                userId={profile.id}
                email={profile.email}
                showPasswordFields={isLocalLogin}
            />
        </main>
    );
}