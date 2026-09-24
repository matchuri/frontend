import { Clock3, MapPinned } from "lucide-react";

import type { GroupRecommendationHistory as GroupRecommendationHistoryItem } from "@/features/groupRecommendation/domain/model/GroupRecommendationHistory";

import { groupRecommendationHistoryStyles } from "@/ui/styles/groupRecommendationHistoryStyles";

interface GroupRecommendationHistoryProps {
    readonly histories: readonly GroupRecommendationHistoryItem[];
    readonly isLoading: boolean;
    readonly errorMessage: string | null;
    readonly maxItems?: number;
    readonly showHeader?: boolean;
    readonly onClickHistory: (history: GroupRecommendationHistoryItem) => void;
    readonly onClickViewAll?: () => void;
}

function formatEndedAt(endedAt: string) {
    const hasTimezone =
        /(?:Z|[+-]\d{2}:\d{2})$/.test(
            endedAt,
        );

    const date = new Date(
        hasTimezone
            ? endedAt
            : `${endedAt}Z`,
    );

    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Seoul",
    }).format(date);
}

export default function GroupRecommendationHistory({
    histories,
    isLoading,
    errorMessage,
    maxItems,
    showHeader = true,
    onClickHistory,
    onClickViewAll,
}: GroupRecommendationHistoryProps) {
    const visibleHistories =
        maxItems === undefined
            ? histories
            : histories.slice(0, maxItems);

    return (
        <section className={groupRecommendationHistoryStyles.section}>
            {showHeader && (
                <div className={groupRecommendationHistoryStyles.header}>
                    <h3 className={groupRecommendationHistoryStyles.title}>
                        그룹 추천 결과 기록
                    </h3>

                    <button
                        type="button"
                        onClick={onClickViewAll}
                        className={groupRecommendationHistoryStyles.viewAllButton}
                    >
                        모두 보기
                    </button>
                </div>
            )}

            {isLoading ? (
                <div className={groupRecommendationHistoryStyles.stateBox}>
                    추천 결과 기록을 불러오는 중...
                </div>
            ) : errorMessage ? (
                <div className={groupRecommendationHistoryStyles.errorBox}>
                    {errorMessage}
                </div>
            ) : histories.length === 0 ? (
                <div className={groupRecommendationHistoryStyles.emptyBox}>
                    아직 완료된 메뉴 추천 기록이 없어요.
                </div>
            ) : (
                <div className={groupRecommendationHistoryStyles.list}>
                    {visibleHistories.map((history) => (
                        <button
                            key={history.sessionId}
                            type="button"
                            onClick={() => onClickHistory(history)}
                            className={groupRecommendationHistoryStyles.item}
                        >
                            <div className={groupRecommendationHistoryStyles.info}>
                                <span className={groupRecommendationHistoryStyles.menuName}>
                                    {history.menuName}
                                </span>

                                <span className={groupRecommendationHistoryStyles.endedAt}>
                                    <Clock3
                                        size={13}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                    {formatEndedAt(history.endedAt)}
                                </span>
                            </div>

                            <span className={groupRecommendationHistoryStyles.mapButton}>
                                <MapPinned
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                                맛집 보기
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}