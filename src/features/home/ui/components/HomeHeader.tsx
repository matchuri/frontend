import Image from "next/image";
import {
    ChevronDown,
    MapPin,
    UserRound,
} from "lucide-react";

import GroupInviteNotificationButton from "@/features/groupInviteNotification/ui/components/GroupInviteNotificationButton";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

interface HomeHeaderProps {
    readonly nickname: string;
    readonly profileImageUrl: string | null;
    readonly address: string;
    readonly hasInvites: boolean;
    readonly isInviteNotificationOpen: boolean;
    readonly onClickLocation: () => void;
    readonly onClickNotification: () => void;
}

export default function HomeHeader({
    nickname,
    profileImageUrl,
    address,
    hasInvites,
    isInviteNotificationOpen,
    onClickLocation,
    onClickNotification,
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
                    <p className={homeMemberPageStyles.nickname}>
                        {nickname}
                    </p>

                    <button
                        type="button"
                        onClick={onClickLocation}
                        className={homeMemberPageStyles.locationButton}
                    >
                        <MapPin
                            size={14}
                            className={homeMemberPageStyles.locationIcon}
                            aria-hidden="true"
                        />

                        <span className={homeMemberPageStyles.address}>
                            {address}
                        </span>

                        <ChevronDown
                            size={14}
                            className={homeMemberPageStyles.locationIcon}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>

            <GroupInviteNotificationButton
                hasInvites={hasInvites}
                isOpen={isInviteNotificationOpen}
                onClick={onClickNotification}
                placement="inline"
            />
        </header>
    );
}