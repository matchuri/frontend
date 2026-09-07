"use client";

import { useAtomValue } from "jotai";

import { useAuthGuard } from "@/features/routeGuard/application/hooks/useAuthGuard";
import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";
import { isLocalLoginAtom } from "@/features/settings/application/selectors/settingsSelectors";
import { useSettingsProfile } from "@/features/settings/application/hooks/useSettingsProfile";
import MyPageProfileSection from "@/features/settings/ui/components/MyPageProfileSection";
import MyPageMenuList from "@/features/settings/ui/components/MyPageMenuList";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

export default function SettingsPage() {
    const { isAuthLoading, canAccess } = useAuthGuard();

    useSettingsProfile(canAccess);

    const settingsState = useAtomValue(settingsAtom);
    const isLocalLogin = useAtomValue(isLocalLoginAtom);

    const profile = "data" in settingsState ? settingsState.data : null;

    const isLoading =
        isAuthLoading ||
        !canAccess ||
        settingsState.status === "LOADING" ||
        !profile;

    const isError =
        settingsState.status === "ERROR" && !profile;

    return (
        <main className={settingsPageStyles.page}>
            <header className={settingsPageStyles.header}>
                <h1 className={settingsPageStyles.title}>
                    마이 페이지
                </h1>
            </header>

            {isError ? (
                <section className={settingsPageStyles.stateContainer}>
                    <p className={settingsPageStyles.errorText}>
                        {settingsState.message}
                    </p>
                </section>
            ) : (
                <>
                    <MyPageProfileSection
                        profileImageUrl={profile?.profileImageUrl ?? null}
                        nickname={profile?.nickname ?? ""}
                        email={profile?.email ?? ""}
                        isLoading={isLoading}
                    />

                    <MyPageMenuList
                        showPasswordChange={profile ? isLocalLogin : false}
                        isLoading={isLoading}
                    />
                </>
            )}
        </main>
    );
}