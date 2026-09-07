"use client";

import { useState } from "react";
import {
    useAtomValue,
    useSetAtom,
} from "jotai";

import { useAuthGuard } from "@/features/routeGuard/application/hooks/useAuthGuard";

import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";

import { isLocalLoginAtom } from "@/features/settings/application/selectors/settingsSelectors";

import { useSettingsProfile } from "@/features/settings/application/hooks/useSettingsProfile";
import { usePresetProfileImage } from "@/features/settings/application/hooks/usePresetProfileImage";
import { useDeleteMember } from "@/features/settings/application/hooks/useDeleteMember";
import { useLogout } from "@/features/auth/application/hooks/useLogout";

import MyPageProfileSection from "@/features/settings/ui/components/MyPageProfileSection";
import MyPageMenuList from "@/features/settings/ui/components/MyPageMenuList";
import ProfileImageChangeModal from "@/features/settings/ui/components/ProfileImageChangeModal";
import DeleteMemberConfirmModal from "@/features/settings/ui/components/DeleteMemberConfirmModal";
import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";

import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

export default function SettingsPage() {
    const { isAuthLoading, canAccess } = useAuthGuard();

    useSettingsProfile(canAccess);

    const settingsState = useAtomValue(settingsAtom);
    const setSettings = useSetAtom(settingsAtom);
    const isLocalLogin = useAtomValue(isLocalLoginAtom);

    const {
        isSubmitting: isLoggingOut,
        handleLogout,
    } = useLogout();

    const {
        isDeleting,
        deleteAccount,
    } = useDeleteMember();

    const [
        isProfileImageModalOpen,
        setIsProfileImageModalOpen,
    ] = useState(false);

    const [
        isPreferenceModalOpen,
        setIsPreferenceModalOpen,
    ] = useState(false);

    const [
        isDeleteMemberModalOpen,
        setIsDeleteMemberModalOpen,
    ] = useState(false);

    const profile =
        "data" in settingsState
            ? settingsState.data
            : null;

    const isLoading =
        isAuthLoading ||
        !canAccess ||
        settingsState.status === "LOADING" ||
        !profile;

    const isError =
        settingsState.status === "ERROR" &&
        profile;

    const {
        presetImages,
        selectedPresetProfileImageId,
        isLoading: isPresetImagesLoading,
        isSaving: isProfileImageSaving,
        errorMessage: presetImagesErrorMessage,
        selectPresetImage,
        savePresetImage,
        refetchPresetImages,
    } = usePresetProfileImage({
        enabled: isProfileImageModalOpen,
        currentProfileImageUrl: profile?.profileImageUrl ?? null,
    });

    const handleClickProfileImageEdit = () => {
        setIsProfileImageModalOpen(true);
    };

    const handleCloseProfileImageModal = () => {
        if (isProfileImageSaving) {
            return;
        }

        setIsProfileImageModalOpen(false);
    };

    const handleSaveProfileImage = async () => {
        const updatedProfileImage =
            await savePresetImage();

        if (!updatedProfileImage) {
            return;
        }

        setSettings((prev) => {
            if (!("data" in prev) || !prev.data) {
                return prev;
            }

            return {
                ...prev,
                data: {
                    ...prev.data,
                    profileImageUrl: updatedProfileImage.imageUrl,
                },
            };
        });

        setIsProfileImageModalOpen(false);
    };

    const handleClickPreference = () => {
        setIsPreferenceModalOpen(true);
    };

    const handlePreferenceSaved = () => {
        setIsPreferenceModalOpen(false);
    };

    const handleClickLogout = () => {
        if (isLoggingOut) {
            return;
        }

        void handleLogout();
    };

    const handleClickDeleteMember = () => {
        setIsDeleteMemberModalOpen(true);
    };

    const handleCloseDeleteMemberModal = () => {
        if (isDeleting) {
            return;
        }

        setIsDeleteMemberModalOpen(false);
    };

    const handleConfirmDeleteMember = () => {
        if (isDeleting) {
            return;
        }

        void deleteAccount();
    };

    return (
        <>
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
                            onClickProfileImageEdit={handleClickProfileImageEdit}
                        />

                        <MyPageMenuList
                            showPasswordChange={profile ? isLocalLogin : false}
                            isLoading={isLoading}
                            isLoggingOut={isLoggingOut}
                            onClickPreference={handleClickPreference}
                            onClickLogout={handleClickLogout}
                            onClickDeleteMember={handleClickDeleteMember}
                        />
                    </>
                )}
            </main>

            <ProfileImageChangeModal
                isOpen={isProfileImageModalOpen}
                presetImages={presetImages}
                selectedPresetProfileImageId={selectedPresetProfileImageId}
                isLoading={isPresetImagesLoading}
                isSaving={isProfileImageSaving}
                errorMessage={presetImagesErrorMessage}
                onClose={handleCloseProfileImageModal}
                onSelect={selectPresetImage}
                onRetry={() => {void refetchPresetImages();}}
                onSave={() => {void handleSaveProfileImage();}}
            />

            <PreferenceModal
                isOpen={isPreferenceModalOpen}
                onClose={() => setIsPreferenceModalOpen(false)}
                onSaved={handlePreferenceSaved}
            />

            <DeleteMemberConfirmModal
                isOpen={isDeleteMemberModalOpen}
                isDeleting={isDeleting}
                onClose={handleCloseDeleteMemberModal}
                onConfirm={handleConfirmDeleteMember}
            />
        </>
    );
}