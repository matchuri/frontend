"use client";

import { User, Camera, Check } from "lucide-react";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

interface ProfileManagementSectionProps {
    nickname: string;
}

export default function ProfileManagementSection({
    nickname,
}: ProfileManagementSectionProps) {
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
                    defaultValue={nickname}
                    className={settingsPageStyles.input}
                />
            </div>

            <div className={settingsPageStyles.saveButtonWrapper}>
                <button type="button" className={settingsPageStyles.saveButton}>
                    저장
                    <Check size={18} />
                </button>
            </div>
        </section>
    );
}