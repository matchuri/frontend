import { User } from "lucide-react";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";

import GroupInviteAcceptButton from "@/features/group/ui/components/GroupInviteAcceptButton";
import GroupInviteDeclineButton from "@/features/group/ui/components/GroupInviteDeclineButton";

import { groupInviteCardStyles } from "@/ui/styles/groupInviteCardStyles";

interface GroupInviteCardProps {
    readonly invite: GroupInvite;
    readonly isProcessing: boolean;
    readonly onAccept: () => void;
    readonly onDecline: () => void;
}

export default function GroupInviteCard({
    invite,
    isProcessing,
    onAccept,
    onDecline,
}: GroupInviteCardProps) {
    return (
        <article className={groupInviteCardStyles.card}>
            <div className={groupInviteCardStyles.info}>
                <div className={groupInviteCardStyles.avatar}>
                    <User size={34} />
                </div>

                <div>
                    <h3 className={groupInviteCardStyles.title}>
                        {invite.requestMemberNickname}님의 초대
                    </h3>

                    <p className={groupInviteCardStyles.groupName}>
                        {invite.groupName}
                    </p>
                </div>
            </div>

            <div className={groupInviteCardStyles.actions}>
                <GroupInviteAcceptButton
                    disabled={isProcessing}
                    onClick={onAccept}
                />

                <GroupInviteDeclineButton
                    disabled={isProcessing}
                    onClick={onDecline}
                />
            </div>
        </article>
    );
}