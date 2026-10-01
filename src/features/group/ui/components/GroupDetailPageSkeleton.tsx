import Skeleton from "@/ui/components/Skeleton";

import { groupDetailPageSkeletonStyles } from "@/ui/styles/groupDetailPageSkeletonStyles";

export default function GroupDetailPageSkeleton() {
    return (
        <div
            className={groupDetailPageSkeletonStyles.content}
            aria-busy="true"
            aria-label="그룹 상세 정보를 불러오는 중"
        >
            <section className={groupDetailPageSkeletonStyles.groupSection}>
                <div className={groupDetailPageSkeletonStyles.groupNameRow}>
                    <Skeleton className={groupDetailPageSkeletonStyles.groupName} />
                    <Skeleton className={groupDetailPageSkeletonStyles.groupNameEditButton} />
                </div>

                <div className={groupDetailPageSkeletonStyles.locationInfo}>
                    <Skeleton className={groupDetailPageSkeletonStyles.locationIcon} />
                    <Skeleton className={groupDetailPageSkeletonStyles.locationAddress} />
                    <Skeleton className={groupDetailPageSkeletonStyles.locationRadius} />
                </div>
            </section>

            <section className={groupDetailPageSkeletonStyles.recommendationSection}>
                <Skeleton className={groupDetailPageSkeletonStyles.recommendationButton} />
            </section>

            <section className={groupDetailPageSkeletonStyles.memberSection}>
                <div className={groupDetailPageSkeletonStyles.memberSectionHeader}>
                    <div className={groupDetailPageSkeletonStyles.memberTitleRow}>
                        <Skeleton className={groupDetailPageSkeletonStyles.sectionTitle} />
                        <Skeleton className={groupDetailPageSkeletonStyles.memberCount} />
                    </div>

                    <Skeleton className={groupDetailPageSkeletonStyles.viewAllButton} />
                </div>

                <div className={groupDetailPageSkeletonStyles.memberList}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className={groupDetailPageSkeletonStyles.memberItem}
                        >
                            <Skeleton className={groupDetailPageSkeletonStyles.memberAvatar} />
                            <Skeleton className={groupDetailPageSkeletonStyles.memberNickname} />
                        </div>
                    ))}
                </div>
            </section>

            <section className={groupDetailPageSkeletonStyles.historySection}>
                <div className={groupDetailPageSkeletonStyles.historyHeader}>
                    <Skeleton className={groupDetailPageSkeletonStyles.historyTitle} />
                    <Skeleton className={groupDetailPageSkeletonStyles.viewAllButton} />
                </div>

                <div className={groupDetailPageSkeletonStyles.historyList}>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div
                            key={index}
                            className={groupDetailPageSkeletonStyles.historyItem}
                        >
                            <div className={groupDetailPageSkeletonStyles.historyInfo}>
                                <Skeleton className={groupDetailPageSkeletonStyles.historyMenuName} />
                                <Skeleton className={groupDetailPageSkeletonStyles.historyDate} />
                            </div>

                            <Skeleton className={groupDetailPageSkeletonStyles.historyButton} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}