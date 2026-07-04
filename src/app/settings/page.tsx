"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";

import { useAuthGuard } from "@/features/routeGuard/application/hooks/useAuthGuard";
import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";
import { isLocalLoginAtom } from "@/features/settings/application/selectors/settingsSelectors";
import { useSettingsProfile } from "@/features/settings/application/hooks/useSettingsProfile";
import { useDeleteMember } from "@/features/settings/application/hooks/useDeleteMember";
import ProfileManagementSection from "@/features/settings/ui/components/ProfileManagementSection";
import AccountManagementSection from "@/features/settings/ui/components/AccountManagementSection";
import DeleteMemberConfirmModal from "@/features/settings/ui/components/DeleteMemberConfirmModal";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

export default function SettingsPage() {
    const { isAuthLoading, canAccess } = useAuthGuard();

    useSettingsProfile(canAccess);

    const settingsState = useAtomValue(settingsAtom);
    const isLocalLogin = useAtomValue(isLocalLoginAtom);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { isDeleting, deleteAccount } = useDeleteMember();

    const profile = "data" in settingsState ? settingsState.data : null;
    const isLoading = isAuthLoading || !canAccess || settingsState.status === "LOADING" || !profile;
    const isError = settingsState.status === "ERROR" && !profile;

    const handleConfirmDeleteMember = async () => {
        await deleteAccount();
    };

    return (
        <main className={settingsPageStyles.page}>
            <h1 className={settingsPageStyles.title}>설정</h1>
            <p className={settingsPageStyles.description}>
                프로필 정보 및 계정 보안 설정을 관리하세요.
            </p>

            {isError ? (
                <section className={settingsPageStyles.section}>
                    <p className="text-sm text-red-500">{settingsState.message}</p>
                </section>
            ) : (
                <>
                    <ProfileManagementSection
                        key={profile?.id ?? "profile-loading"}
                        nickname={profile?.nickname ?? ""}
                        isLoading={isLoading}
                    />

                    <AccountManagementSection
                        userId={profile?.id}
                        email={profile?.email}
                        showPasswordFields={profile ? isLocalLogin : false}
                        isLoading={isLoading}
                        onClickDeleteMember={() => setIsDeleteModalOpen(true)}
                    />
                </>
            )}

            <DeleteMemberConfirmModal
                isOpen={isDeleteModalOpen}
                isDeleting={isDeleting}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDeleteMember}
            />
        </main>
    );
}