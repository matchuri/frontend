import Skeleton from "@/ui/components/Skeleton";

import { groupManagementPageSkeletonStyles } from "@/ui/styles/groupManagementPageSkeletonStyles";

export default function GroupManagementPageSkeleton() {
    return (
        <main
            className={groupManagementPageSkeletonStyles.page}
            aria-busy="true"
            aria-label="그룹 정보를 불러오는 중"
        >
            <header className={groupManagementPageSkeletonStyles.header}>
                <Skeleton className={groupManagementPageSkeletonStyles.title} />

                <Skeleton className={groupManagementPageSkeletonStyles.notificationButton} />
            </header>

            <div className={groupManagementPageSkeletonStyles.content}>
                <section className={groupManagementPageSkeletonStyles.groupSection}>
                    <div className={groupManagementPageSkeletonStyles.sectionHeader}>
                        <Skeleton className={groupManagementPageSkeletonStyles.sectionTitle} />

                        <Skeleton className={groupManagementPageSkeletonStyles.createButton} />
                    </div>

                    <div className={groupManagementPageSkeletonStyles.groupList}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className={groupManagementPageSkeletonStyles.groupCard}
                            >
                                <div className={groupManagementPageSkeletonStyles.groupInfo}>
                                    <Skeleton className={groupManagementPageSkeletonStyles.groupName} />
                                    <Skeleton className={groupManagementPageSkeletonStyles.groupMeta} />
                                </div>

                                <Skeleton className={groupManagementPageSkeletonStyles.statusBadge} />
                                <Skeleton className={groupManagementPageSkeletonStyles.chevron} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}