import Image from "next/image";

import type { PersonalRecommendationHistory } from "@/features/personalRecommendation/domain/model/PersonalRecommendationHistory";

import { personalRecommendationHistoryPageStyles } from "@/ui/styles/personalRecommendationHistoryPageStyles";

interface PersonalRecommendationHistoryCardProps {
    readonly history: PersonalRecommendationHistory;
    readonly onClick: (requestId: number) => void;
}

const MAX_VISIBLE_TAG_COUNT = 3;

function formatRecommendationDate(
    requestedAt: string,
) {
    return requestedAt
        .slice(0, 10)
        .replaceAll("-", ".");
}

export default function PersonalRecommendationHistoryCard({
    history,
    onClick,
}: PersonalRecommendationHistoryCardProps) {
    const hasRepresentativeMenu =
        history.menuName !== null &&
        history.score !== null;

    const visibleTags =
        history.tags.slice(0,MAX_VISIBLE_TAG_COUNT);

    const hiddenTagCount =
        Math.max(
            history.tags.length - MAX_VISIBLE_TAG_COUNT,
            0,
        );

    return (
        <button
            type="button"
            onClick={() => onClick(history.id)}
            className={personalRecommendationHistoryPageStyles.card}
        >
            <div className={personalRecommendationHistoryPageStyles.thumbnailWrapper}>
                {history.thumbnailUrl && history.menuName ? (
                    <Image
                        src={history.thumbnailUrl}
                        alt={`${history.menuName} 이미지`}
                        fill
                        sizes="104px"
                        className={personalRecommendationHistoryPageStyles.thumbnail}
                    />
                ) : (
                    <span className={personalRecommendationHistoryPageStyles.thumbnailFallback}>
                        이미지
                        <br />
                        준비중
                    </span>
                )}
            </div>

            <div className={personalRecommendationHistoryPageStyles.cardContent}>
                <div className={personalRecommendationHistoryPageStyles.cardTop}>
                    {hasRepresentativeMenu ? (
                        <span className={personalRecommendationHistoryPageStyles.matchBadge}>
                            {Math.round(history.score)}% 매치
                        </span>
                    ) : (
                        <span />
                    )}

                    <span className={personalRecommendationHistoryPageStyles.date}>
                        {formatRecommendationDate(history.requestedAt)}
                    </span>
                </div>

                {hasRepresentativeMenu ? (
                    <>
                        <strong className={personalRecommendationHistoryPageStyles.menuName}>
                            {history.menuName}
                        </strong>

                        <div className={personalRecommendationHistoryPageStyles.tagList}>
                            {visibleTags.map((tag) => (
                                <span
                                    key={tag}
                                    className={personalRecommendationHistoryPageStyles.tag}
                                >
                                    {tag}
                                </span>
                            ))}

                            {hiddenTagCount > 0 && (
                                <span className={personalRecommendationHistoryPageStyles.moreTag}>
                                    +{hiddenTagCount}
                                </span>
                            )}
                        </div>
                    </>
                ) : (
                    <span className={personalRecommendationHistoryPageStyles.failedText}>
                        추천 결과를 확인할 수 없습니다.
                    </span>
                )}
            </div>
        </button>
    );
}