import GroupInviteCard from "@/features/group/ui/components/GroupInviteCard";
import GroupInviteEmpty from "@/features/group/ui/components/GroupInviteEmpty";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

interface GroupInviteSectionProps {
    readonly invites: readonly GroupInvite[];
    readonly hasInvites: boolean;
    readonly showViewAllButton: boolean;
}

export default function GroupInviteSection({
    invites,
    hasInvites,
    showViewAllButton,
}: GroupInviteSectionProps) {
    return (
        <section className={groupManagementPageStyles.section}>
            <div className={groupManagementPageStyles.sectionHeader}>
                <div className={groupManagementPageStyles.sectionTitleWrapper}>
                    <h2 className={groupManagementPageStyles.sectionTitle}>
                        받은 초대
                    </h2>

                    {hasInvites && (
                        <span className={groupManagementPageStyles.inviteCount}>
                            {invites.length}
                        </span>
                    )}
                </div>

                {showViewAllButton && (
                    <button
                        type="button"
                        className={groupManagementPageStyles.viewAllButton}
                    >
                        모두 보기
                    </button>
                )}
            </div>

            {hasInvites ? (
                <div className={groupManagementPageStyles.inviteList}>
                    {invites.slice(0, 2).map((invite) => (
                        <GroupInviteCard
                            key={invite.inviteId}
                            invite={invite}
                        />
                    ))}
                </div>
            ) : (
                <GroupInviteEmpty />
            )}
        </section>
    );
}