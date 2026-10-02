import GroupInviteNotificationButton from "@/features/groupInviteNotification/ui/components/GroupInviteNotificationButton";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

interface GroupManagementHeaderProps {
    readonly hasInvites: boolean;
    readonly isNotificationOpen: boolean;
    readonly onClickNotification: () => void;
}

export default function GroupManagementHeader({
    hasInvites,
    isNotificationOpen,
    onClickNotification,
}: GroupManagementHeaderProps) {
    return (
        <header className={groupManagementPageStyles.header}>
            <h1 className={groupManagementPageStyles.title}>
                그룹
            </h1>

            <div className={groupManagementPageStyles.notificationButtonWrapper}>
                <GroupInviteNotificationButton
                    hasInvites={hasInvites}
                    isOpen={isNotificationOpen}
                    onClick={onClickNotification}
                    placement="inline"
                />
            </div>
        </header>
    );
}