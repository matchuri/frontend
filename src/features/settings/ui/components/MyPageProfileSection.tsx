import Image from "next/image";
import {
    Camera,
    Pencil,
    UserRound,
} from "lucide-react";

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
    nickname,
    email,
    isLoading,
    onClickProfileImageEdit,
}: MyPageProfileSectionProps) {
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

            <div className={settingsPageStyles.nicknameRow}>
                <strong className={settingsPageStyles.nickname}>
                    {nickname}
                </strong>

                <button
                    type="button"
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

            <p className={settingsPageStyles.email}>
                {displayEmail}
            </p>
        </section>
    );
}