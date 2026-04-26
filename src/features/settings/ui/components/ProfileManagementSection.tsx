"use client";

import { User, Camera, Check } from "lucide-react";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";
import { useNicknameValidation } from "@/features/nickname/application/hooks/useNicknameValidation";

interface ProfileManagementSectionProps {
    nickname: string;
}

export default function ProfileManagementSection({
    nickname: initialNickname,
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

    return (
        <section className={settingsPageStyles.section}>
            <h2 className={settingsPageStyles.sectionTitle}>
                <User size={20} />
                프로필 관리
            </h2>

            {/* 프로필 영역 */}
            <div className={settingsPageStyles.profileImageWrapper}>
                <User size={64} className={settingsPageStyles.profileIcon} />

                <button type="button" className={settingsPageStyles.editButton}>
                    <Camera size={16} />
                </button>
            </div>

            {/* 닉네임 */}
            <div className={settingsPageStyles.formGroup}>
                <label className={settingsPageStyles.label}>닉네임</label>
                <input
                    type="text"
                    value={nickname}
                    className={settingsPageStyles.input}
                    onChange={(event) =>
                        handleNicknameChange(event.target.value)
//                         validateNickname(nextNickname);
                    }
                    onBlur={() => validateNickname(nickname)} // TODO: 나중에 onChange 안에 있는 걸로 수정 필요
                    maxLength={100}
                />

                {message && (
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
                <button
                    type="button"
                    disabled={!canSaveNickname}
                    className={`${settingsPageStyles.saveButton} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                    저장
                    <Check size={18} />
                </button>
            </div>
        </section>
    );
}