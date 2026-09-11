import Skeleton from "@/ui/components/Skeleton";

import { guestRecommendationRestaurantSkeletonStyles } from "@/ui/styles/guestRecommendationRestaurantSkeletonStyles";

export default function GuestRecommendationRestaurantSkeleton() {
    return (
        <main
            className={guestRecommendationRestaurantSkeletonStyles.page}
            aria-busy="true"
            aria-label="주변 맛집을 불러오는 중"
        >
            <header className={guestRecommendationRestaurantSkeletonStyles.header}>
                <Skeleton className={guestRecommendationRestaurantSkeletonStyles.backButton} />
                <Skeleton className={guestRecommendationRestaurantSkeletonStyles.headerTitle}/>

                <div className={guestRecommendationRestaurantSkeletonStyles.headerSpacer}/>
            </header>

            <Skeleton className={guestRecommendationRestaurantSkeletonStyles.map}/>

            <section className={guestRecommendationRestaurantSkeletonStyles.content}>
                <Skeleton className={guestRecommendationRestaurantSkeletonStyles.sheetHandle}/>

                <div className={guestRecommendationRestaurantSkeletonStyles.summary}>
                    <div className={guestRecommendationRestaurantSkeletonStyles.summaryContent}>
                        <Skeleton className={guestRecommendationRestaurantSkeletonStyles.eyebrow}/>
                        <Skeleton className={guestRecommendationRestaurantSkeletonStyles.title}/>
                        <Skeleton className={guestRecommendationRestaurantSkeletonStyles.address} />
                    </div>

                    <Skeleton className={guestRecommendationRestaurantSkeletonStyles.radiusBadge}/>
                </div>

                <div className={guestRecommendationRestaurantSkeletonStyles.restaurantList}>
                    {Array.from({ length: 2 }).map(
                        (_, index) => (
                            <Skeleton
                                key={index}
                                className={guestRecommendationRestaurantSkeletonStyles.restaurantCard}
                            />
                        ),
                    )}
                </div>
            </section>
        </main>
    );
}