"use client";

import { useState } from "react";
import { User, Camera, Check } from "lucide-react";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";
import { useNicknameValidation } from "@/features/nickname/application/hooks/useNicknameValidation";
import { updateNickname } from "@/features/settings/infrastructure/api/settingsApi";

interface ProfileManagementSectionProps {
    nickname: string;
    isLoading?: boolean;
}

export default function ProfileManagementSection({
    nickname: initialNickname,
    isLoading = false,
}: ProfileManagementSectionProps) {
    const {
        nickname,
        status,
        message,
        canSaveNickname,
        handleNicknameChange,
        validateNickname,
    } = useNicknameValidation({
        initialNickname,
    });

    const [currentNickname, setCurrentNickname] = useState(initialNickname);
    const [isSaving, setIsSaving] = useState(false);

    const handleNicknameSave = async () => {
        const trimmedNickname = nickname.trim();

        if (isLoading) return;
        if (trimmedNickname === currentNickname) return;
        if (!canSaveNickname) return;

        setIsSaving(true);

        try {
            await updateNickname(trimmedNickname);

            setCurrentNickname(trimmedNickname);
            alert("닉네임이 변경되었습니다.");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "닉네임 변경에 실패했습니다.",
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className={settingsPageStyles.section}>
            <h2 className={settingsPageStyles.sectionTitle}>
                <User size={20} />
                프로필 관리
            </h2>

            <div className={settingsPageStyles.profileImageWrapper}>
                {isLoading ? (
                    <div className={settingsPageStyles.skeletonProfileIcon} />
                ) : (
                    <>
                        <User size={64} className={settingsPageStyles.profileIcon} />

                        <button type="button" className={settingsPageStyles.editButton}>
                            <Camera size={16} />
                        </button>
                    </>
                )}
            </div>

            <div className={settingsPageStyles.formGroup}>
                <label className={settingsPageStyles.label}>닉네임</label>

                {isLoading ? (
                    <div className={settingsPageStyles.skeletonInput} />
                ) : (
                    <input
                        type="text"
                        value={nickname}
                        className={settingsPageStyles.input}
                        onChange={(event) =>
                            handleNicknameChange(event.target.value)
                        }
                        onBlur={() => validateNickname(nickname)}
                        maxLength={100}
                    />
                )}

                {!isLoading && message && (
                    <p
                        className={
                            status === "AVAILABLE"
                                ? "text-sm text-green-600"
                                : "text-sm text-red-500"
                        }
                    >
                        {message}
                    </p>
                )}
            </div>

            <div className={settingsPageStyles.saveButtonWrapper}>
                {isLoading ? (
                    <div className={settingsPageStyles.skeletonSaveButton} />
                ) : (
                    <button
                        type="button"
                        onClick={handleNicknameSave}
                        disabled={
                            isSaving ||
                            nickname.trim() === currentNickname ||
                            !canSaveNickname
                        }
                        className={`${settingsPageStyles.saveButton} disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                        {isSaving ? "저장 중..." : "저장"}
                        <Check size={18} />
                    </button>
                )}
            </div>
        </section>
    );
}