import Skeleton from "@/ui/components/Skeleton";

import { homePageSkeletonStyles } from "@/ui/styles/homePageSkeletonStyles";

export default function HomePageSkeleton() {
    return (
        <main
            className={homePageSkeletonStyles.page}
            aria-busy="true"
            aria-label="홈 정보를 불러오는 중"
        >
            <header className={homePageSkeletonStyles.header}>
                <div className={homePageSkeletonStyles.userSection}>
                    <Skeleton className={homePageSkeletonStyles.profileImage}/>

                    <div className={homePageSkeletonStyles.userText}>
                        <Skeleton className={homePageSkeletonStyles.nickname}/>
                        <Skeleton className={homePageSkeletonStyles.address}/>
                    </div>
                </div>

                <Skeleton className={homePageSkeletonStyles.notificationButton}/>
            </header>

            <div className={homePageSkeletonStyles.content}>
                <Skeleton className={homePageSkeletonStyles.hero}/>
                <section className={homePageSkeletonStyles.section}>
                    <div className={homePageSkeletonStyles.sectionHeader}>
                        <Skeleton className={homePageSkeletonStyles.tasteTitle}/>
                        <Skeleton className={homePageSkeletonStyles.moreButton}/>
                    </div>

                    <Skeleton className={homePageSkeletonStyles.tasteCard}/>
                </section>

                <section className={homePageSkeletonStyles.section}>
                    <div className={homePageSkeletonStyles.sectionHeader}>
                        <Skeleton className={homePageSkeletonStyles.historyTitle}/>
                        <Skeleton className={homePageSkeletonStyles.moreButton}/>
                    </div>

                    <div className={homePageSkeletonStyles.historyList}>
                        {Array.from({ length: 2 }).map(
                            (_, index) => (
                                <Skeleton
                                    key={index}
                                    className={homePageSkeletonStyles.historyCard}
                                />
                            ),
                        )}
                    </div>
                </section>

                <section className={homePageSkeletonStyles.section}>
                    <div className={homePageSkeletonStyles.sectionHeader}>
                        <Skeleton className={homePageSkeletonStyles.groupTitle}/>
                        <Skeleton className={homePageSkeletonStyles.moreButton}/>
                    </div>

                    {Array.from({ length: 2 }).map(
                        (_, index) => (
                            <Skeleton
                                key={index}
                                className={homePageSkeletonStyles.groupCard}
                            />
                        ),
                    )}
                </section>
            </div>
        </main>
    );
}