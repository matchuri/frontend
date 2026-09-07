"use client";

import Image from "next/image";
import { useState } from "react";
import { useSetAtom } from "jotai";
import {
    Camera,
    Check,
    Pencil,
    UserRound,
    X,
} from "lucide-react";

import { useNicknameValidation } from "@/features/nickname/application/hooks/useNicknameValidation";

import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";
import { updateNickname } from "@/features/settings/infrastructure/api/settingsApi";

import { updateMemberNickname } from "@/features/auth/application/store/authStore";

import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

interface MyPageProfileSectionProps {
    readonly profileImageUrl: string | null;
    readonly nickname: string;
    readonly email: string;
    readonly isLoading: boolean;
    readonly onClickProfileImageEdit: () => void;
}

export default function MyPageProfileSection({
    profileImageUrl,
    nickname: initialNickname,
    email,
    isLoading,
    onClickProfileImageEdit,
}: MyPageProfileSectionProps) {
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

    const setSettings = useSetAtom(settingsAtom);

    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [isSavingNickname, setIsSavingNickname] = useState(false);

    if (isLoading) {
        return (
            <section className={settingsPageStyles.profileSection}>
                <div className={settingsPageStyles.skeletonProfileImage} />
                <div className={settingsPageStyles.skeletonNickname} />
                <div className={settingsPageStyles.skeletonEmail} />
            </section>
        );
    }

    const displayEmail = email.trim() || "이메일 정보 없음";

    const handleClickNicknameEdit = () => {
        handleNicknameChange(initialNickname);
        setIsEditingNickname(true);
    };

    const handleCancelNicknameEdit = () => {
        if (isSavingNickname) {
            return;
        }

        handleNicknameChange(initialNickname);
        setIsEditingNickname(false);
    };

    const handleNicknameSave = async () => {
        const trimmedNickname = nickname.trim();

        if (isSavingNickname) return;
        if (trimmedNickname === initialNickname) return;
        if (!canSaveNickname) return;

        setIsSavingNickname(true);

        try {
            await updateNickname(trimmedNickname);

            updateMemberNickname(trimmedNickname);

            setSettings((prev) => {
                if (!("data" in prev) || !prev.data) return prev;

                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        nickname: trimmedNickname,
                    },
                };
            });

            setIsEditingNickname(false);
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "닉네임 변경에 실패했습니다.",
            );
        } finally {
            setIsSavingNickname(false);
        }
    };

    return (
        <section className={settingsPageStyles.profileSection}>
            <div className={settingsPageStyles.profileImageContainer}>
                <div className={settingsPageStyles.profileImageWrapper}>
                    {profileImageUrl ? (
                        <Image
                            src={profileImageUrl}
                            alt="프로필 이미지"
                            width={96}
                            height={96}
                            priority
                            className={settingsPageStyles.profileImage}
                        />
                    ) : (
                        <UserRound
                            size={58}
                            strokeWidth={1.8}
                            aria-hidden="true"
                            className={settingsPageStyles.profileFallbackIcon}
                        />
                    )}
                </div>

                <button
                    type="button"
                    onClick={onClickProfileImageEdit}
                    className={settingsPageStyles.profileImageEditButton}
                    aria-label="프로필 이미지 수정"
                >
                    <Camera
                        size={14}
                        strokeWidth={2.5}
                        aria-hidden="true"
                    />
                </button>
            </div>

            {isEditingNickname ? (
                <div className={settingsPageStyles.nicknameEditWrapper}>
                    <div className={settingsPageStyles.nicknameEditRow}>
                        <input
                            type="text"
                            value={nickname}
                            disabled={isSavingNickname}
                            onChange={(event) => {
                                const nextNickname = event.target.value;

                                handleNicknameChange(nextNickname);
                                validateNickname(nextNickname);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    void handleNicknameSave();
                                }

                                if (event.key === "Escape") {
                                    handleCancelNicknameEdit();
                                }
                            }}
                            maxLength={100}
                            className={settingsPageStyles.nicknameInput}
                            aria-label="닉네임"
                            autoFocus
                        />

                        <button
                            type="button"
                            onClick={() => {void handleNicknameSave();}}
                            disabled={
                                isSavingNickname ||
                                nickname.trim() === initialNickname ||
                                !canSaveNickname
                            }
                            className={settingsPageStyles.nicknameSaveButton}
                            aria-label="닉네임 변경 저장"
                        >
                            <Check
                                size={16}
                                strokeWidth={2.5}
                                aria-hidden="true"
                            />
                        </button>

                        <button
                            type="button"
                            onClick={handleCancelNicknameEdit}
                            disabled={isSavingNickname}
                            className={settingsPageStyles.nicknameCancelButton}
                            aria-label="닉네임 변경 취소"
                        >
                            <X
                                size={16}
                                strokeWidth={2.5}
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    {message && (
                        <p
                            className={
                                status === "AVAILABLE"
                                    ? settingsPageStyles.nicknameSuccessMessage
                                    : settingsPageStyles.nicknameErrorMessage
                            }
                        >
                            {message}
                        </p>
                    )}
                </div>
            ) : (
                <div className={settingsPageStyles.nicknameRow}>
                    <strong className={settingsPageStyles.nickname}>
                        {initialNickname}
                    </strong>

                    <button
                        type="button"
                        onClick={handleClickNicknameEdit}
                        className={settingsPageStyles.nicknameEditButton}
                        aria-label="닉네임 수정"
                    >
                        <Pencil
                            size={14}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            )}

            <p className={settingsPageStyles.email}>
                {displayEmail}
            </p>
        </section>
    );
}