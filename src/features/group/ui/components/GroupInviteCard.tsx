import { User } from "lucide-react";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";

import { groupInviteCardStyles } from "@/ui/styles/groupInviteCardStyles";

interface GroupInviteCardProps {
    readonly invite: GroupInvite;
}

export default function GroupInviteCard({ invite }: GroupInviteCardProps) {
    return (
        <article className={groupInviteCardStyles.card}>
            <div className={groupInviteCardStyles.info}>
                <div className={groupInviteCardStyles.avatar}>
                    <User size={34} />
                </div>

                <div>
                    <h3 className={groupInviteCardStyles.title}>
                        {invite.inviterNickname}님의 초대
                    </h3>

                    <p className={groupInviteCardStyles.groupName}>
                        {invite.groupName}
                    </p>
                </div>
            </div>

            <div className={groupInviteCardStyles.actions}>
                <button
                    type="button"
                    className={groupInviteCardStyles.acceptButton}
                >
                    수락
                </button>

                <button
                    type="button"
                    className={groupInviteCardStyles.declineButton}
                >
                    거절
                </button>
            </div>
        </article>
    );
}