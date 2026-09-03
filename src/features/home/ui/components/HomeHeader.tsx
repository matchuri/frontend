import {
    Bell,
    ChevronDown,
    MapPin,
    UserRound,
} from "lucide-react";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

interface HomeHeaderProps {
    readonly nickname: string;
    readonly address: string;
    readonly onClickLocation: () => void;
}

export default function HomeHeader({
    nickname,
    address,
    onClickLocation,
}: HomeHeaderProps) {
    return (
        <header className={homeMemberPageStyles.header}>
            <div className={homeMemberPageStyles.userSection}>
                <div className={homeMemberPageStyles.profileIcon}>
                    <UserRound
                        size={24}
                        strokeWidth={2}
                    />
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

            <button
                type="button"
                aria-label="알림 확인"
                className={homeMemberPageStyles.notificationButton}
            >
                <Bell
                    size={22}
                    aria-hidden="true"
                />

                <span
                    className={homeMemberPageStyles.notificationDot}
                />
            </button>
        </header>
    );
}