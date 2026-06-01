"use client";

import { mockGroups } from "@/features/group/ui/mock/mockGroups";
import { mockInvites } from "@/features/group/ui/mock/mockInvites";

import GroupCard from "@/features/group/ui/components/GroupCard";
import GroupInviteCard from "@/features/group/ui/components/GroupInviteCard";
import GroupInviteEmpty from "@/features/group/ui/components/GroupInviteEmpty";
import GroupListEmpty from "@/features/group/ui/components/GroupListEmpty";
import GroupManagementHeader from "@/features/group/ui/components/GroupManagementHeader";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupPage() {
    const hasInvites = mockInvites.length > 0;
    const hasGroups = mockGroups.length > 0;
    const showViewAllButton = mockInvites.length >= 3;

    return (
        <main className={groupManagementPageStyles.container}>
            <div className={groupManagementPageStyles.content}>
                <GroupManagementHeader />

                <section className={groupManagementPageStyles.section}>
                    <div className={groupManagementPageStyles.sectionHeader}>
                        <div className={groupManagementPageStyles.sectionTitleWrapper}>
                            <h2 className={groupManagementPageStyles.sectionTitle}>
                                받은 초대
                            </h2>

                            {hasInvites && (
                                <span className={groupManagementPageStyles.inviteCount}>
                                    {mockInvites.length}
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
                            {mockInvites.slice(0, 2).map((invite) => (
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

                <section className={groupManagementPageStyles.section}>
                    <div className={groupManagementPageStyles.sectionHeader}>
                        <h2 className={groupManagementPageStyles.sectionTitle}>
                            그룹 목록
                        </h2>
                    </div>

                    {hasGroups ? (
                        <div className={groupManagementPageStyles.groupList}>
                            {mockGroups.map((group) => (
                                <GroupCard key={group.id} group={group} />
                            ))}
                        </div>
                    ) : (
                        <GroupListEmpty />
                    )}
                </section>
            </div>
        </main>
    );
}