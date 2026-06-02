import GroupInviteCard from "@/features/group/ui/components/GroupInviteCard";
import GroupInviteEmpty from "@/features/group/ui/components/GroupInviteEmpty";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

interface GroupInviteSectionProps {
    readonly invites: readonly GroupInvite[];
    readonly hasInvites: boolean;
    readonly showViewAllButton: boolean;

    //받은 초대 목록 조회 상태
    readonly isLoading: boolean;
    readonly errorMessage: string | null;
}

export default function GroupInviteSection({
    invites,
    hasInvites,
    showViewAllButton,
    isLoading,
    errorMessage,
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

            {/* 로딩 상태 처리 */}
            {isLoading && (
                <div className={groupManagementPageStyles.emptyInviteBox}>
                    받은 초대 목록을 불러오는 중...
                </div>
            )}

            {/* 에러 상태 처리 */}
            {errorMessage && (
                <div className={groupManagementPageStyles.emptyInviteBox}>
                    {errorMessage}
                </div>
            )}

            {/* 로딩/에러가 아닐 때만 목록 또는 빈 상태 표시 */}
            {!isLoading &&
                !errorMessage &&
                (hasInvites ? (
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
                ))}
        </section>
    );
}