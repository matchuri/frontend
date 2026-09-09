import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { GuestRecommendedMenu } from "@/features/guestRecommendation/domain/model/GuestRecommendation";

import { guestRecommendationResultPageStyles } from "@/ui/styles/guestRecommendationResultPageStyles";

interface GuestRecommendationResultCardProps {
    readonly candidate: GuestRecommendedMenu;
}

export default function GuestRecommendationResultCard({
    candidate,
}: GuestRecommendationResultCardProps) {
    const isFirstRank = candidate.rankNo === 1;

    return (
        <article className={guestRecommendationResultPageStyles.card}>
            <div className={guestRecommendationResultPageStyles.imageWrapper}>
                {candidate.thumbnailUrl ? (
                    <Image
                        src={candidate.thumbnailUrl}
                        alt={`${candidate.menuName} 이미지`}
                        fill
                        sizes="(max-width: 480px) 100vw, 480px"
                        className={guestRecommendationResultPageStyles.menuImage}
                    />
                ) : (
                    <div className={guestRecommendationResultPageStyles.imageFallback}>
                        이미지 준비중입니다
                    </div>
                )}

                <div className={guestRecommendationResultPageStyles.cardBadges}>
                    <span
                        className={
                            isFirstRank
                                ? guestRecommendationResultPageStyles.firstRankBadge
                                : guestRecommendationResultPageStyles.rankBadge
                        }
                    >
                        {candidate.rankNo}위
                    </span>

                    <span className={guestRecommendationResultPageStyles.matchBadge}>
                        {Math.round(candidate.score)}% 매치
                    </span>
                </div>
            </div>

            <div className={guestRecommendationResultPageStyles.cardContent}>
                <h2 className={guestRecommendationResultPageStyles.menuName}>
                    {candidate.menuName}
                </h2>

                <button
                    type="button"
                    className={guestRecommendationResultPageStyles.restaurantButton}
                    aria-label={`${candidate.menuName} 맛집 보기`}
                >
                    맛집 보기
                    <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </button>
            </div>
        </article>
    );
}