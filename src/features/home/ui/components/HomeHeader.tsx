import Image from "next/image";
import {
    ChevronDown,
    MapPin,
    UserRound,
} from "lucide-react";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

interface HomeHeaderProps {
    readonly nickname: string;
    readonly profileImageUrl: string | null;
    readonly address: string;
    readonly onClickLocation: () => void;
}

export default function HomeHeader({
    nickname,
    profileImageUrl,
    address,
    onClickLocation,
}: HomeHeaderProps) {
    return (
        <header className={homeMemberPageStyles.header}>
            <div className={homeMemberPageStyles.userSection}>
                <div className={homeMemberPageStyles.profileIcon}>
                    {profileImageUrl ? (
                        <Image
                            src={profileImageUrl}
                            alt={`${nickname}님의 프로필 이미지`}
                            width={44}
                            height={44}
                            className={homeMemberPageStyles.profileImage}
                        />
                    ) : (
                        <UserRound
                            size={24}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    )}
                </div>

                <div className={homeMemberPageStyles.userTextBox}>
                    <p className={homeMemberPageStyles.welcomeText}>
                        환영합니다,{" "}
                        <strong>{nickname}님</strong>
                    </p>

                    <button
                        type="button"
                        onClick={onClickLocation}
                        className={homeMemberPageStyles.locationButton}
                    >
                        <MapPin
                            size={14}
                            aria-hidden="true"
                        />

                        <span>{address}</span>

                        <ChevronDown
                            size={14}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}