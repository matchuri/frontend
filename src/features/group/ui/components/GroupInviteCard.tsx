import { User } from "lucide-react";
import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

interface GroupInviteCardProps {
    readonly invite: GroupInvite;
}

export default function GroupInviteCard({ invite }: GroupInviteCardProps) {
    return (
        <article className={groupManagementPageStyles.inviteCard}>
            <div className={groupManagementPageStyles.inviteInfo}>
                <div className={groupManagementPageStyles.avatar}>
                    <User size={34} />
                </div>

                <div>
                    <p className={groupManagementPageStyles.inviteTitle}>
                        {invite.inviterNickname}님의 초대
                    </p>
                    <p className={groupManagementPageStyles.inviteGroupName}>
                        {invite.groupName}
                    </p>
                </div>
            </div>

            <div className={groupManagementPageStyles.inviteActions}>
                <button
                    type="button"
                    className={groupManagementPageStyles.acceptButton}
                >
                    수락
                </button>
                <button
                    type="button"
                    className={groupManagementPageStyles.declineButton}
                >
                    거절
                </button>
            </div>
        </article>
    );
}