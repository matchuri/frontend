"use client";

import { Bell } from "lucide-react";

import { groupInviteNotificationStyles } from "@/ui/styles/groupInviteNotificationStyles";

interface GroupInviteNotificationButtonProps {
    readonly hasInvites: boolean;
    readonly isOpen: boolean;
    readonly onClick: () => void;
    readonly placement?: "fixed" | "inline";
}

export default function GroupInviteNotificationButton({
    hasInvites,
    isOpen,
    onClick,
    placement = "fixed",
}: GroupInviteNotificationButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="그룹 초대 알림 확인"
            aria-expanded={isOpen}
            className={
                placement === "inline"
                    ? groupInviteNotificationStyles.inlineButton
                    : groupInviteNotificationStyles.button
            }
        >
            <Bell
                size={22}
                aria-hidden="true"
            />

            {hasInvites && (
                <span
                    className={groupInviteNotificationStyles.notificationDot}
                />
            )}
        </button>
    );
}