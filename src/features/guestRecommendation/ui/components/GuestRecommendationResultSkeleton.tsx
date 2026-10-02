import Skeleton from "@/ui/components/Skeleton";

import { guestRecommendationResultSkeletonStyles } from "@/ui/styles/guestRecommendationResultSkeletonStyles";

export default function GuestRecommendationResultSkeleton() {
    return (
        <main
            className={guestRecommendationResultSkeletonStyles.page}
            aria-busy="true"
            aria-label="추천 결과를 불러오는 중"
        >
            <header className={guestRecommendationResultSkeletonStyles.header}>
                <Skeleton className={guestRecommendationResultSkeletonStyles.backButton}/>
                <Skeleton className={guestRecommendationResultSkeletonStyles.headerTitle}/>

                <div className={guestRecommendationResultSkeletonStyles.headerSpacer}/>
            </header>

            <div className={guestRecommendationResultSkeletonStyles.content}>
                <section className={guestRecommendationResultSkeletonStyles.intro}>
                    <Skeleton className={guestRecommendationResultSkeletonStyles.introIcon}/>

                    <div className={ guestRecommendationResultSkeletonStyles.introContent}>
                        <Skeleton className={guestRecommendationResultSkeletonStyles.introTitle}/>
                        <Skeleton className={guestRecommendationResultSkeletonStyles.introDescriptionFirst}/>
                        <Skeleton className={guestRecommendationResultSkeletonStyles.introDescriptionSecond}/>
                    </div>
                </section>

                <section className={guestRecommendationResultSkeletonStyles.resultSection}>
                    <div className={guestRecommendationResultSkeletonStyles.resultHeader}>
                        <Skeleton className={guestRecommendationResultSkeletonStyles.resultEyebrow}/>
                        <Skeleton className={guestRecommendationResultSkeletonStyles.resultTitle}/>
                    </div>

                    <div className={guestRecommendationResultSkeletonStyles.cardList}>
                        {Array.from({ length: 3 }).map(
                            (_, index) => (
                                <article
                                    key={index}
                                    className={guestRecommendationResultSkeletonStyles.card}
                                >
                                    <Skeleton className={guestRecommendationResultSkeletonStyles.image}/>

                                    <div className={guestRecommendationResultSkeletonStyles.cardContent}>
                                        <Skeleton className={guestRecommendationResultSkeletonStyles.menuName}/>
                                        <Skeleton className={guestRecommendationResultSkeletonStyles.restaurantButton}/>
                                    </div>
                                </article>
                            ),
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}