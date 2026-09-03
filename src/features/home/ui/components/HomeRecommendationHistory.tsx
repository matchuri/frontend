import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

interface RecommendationHistoryItem {
    readonly id: number;
    readonly menuName: string;
    readonly recommendedDate: string;
    readonly categories: readonly string[];
}

interface HomeRecommendationHistoryProps {
    readonly items: readonly RecommendationHistoryItem[];
    readonly onClickDetail: (requestId: number) => void;
}

const MAX_HISTORY_COUNT = 3;

export default function HomeRecommendationHistory({
    items,
    onClickDetail,
}: HomeRecommendationHistoryProps) {
    const sortedItems = [...items].sort(
        (a, b) =>
            new Date(b.recommendedDate).getTime() -
            new Date(a.recommendedDate).getTime(),
    );

    const visibleItems = sortedItems.slice(0, MAX_HISTORY_COUNT);
    const hasMoreItems = sortedItems.length > MAX_HISTORY_COUNT;

    return (
        <section className={homeMemberPageStyles.section}>
            <div className={homeMemberPageStyles.historyHeader}>
                <h2 className={homeMemberPageStyles.sectionTitle}>
                    지난 메뉴 추천 기록
                </h2>

                {hasMoreItems && (
                    <button
                        type="button"
                        className={homeMemberPageStyles.historyViewAllButton}
                    >
                        전체 보기
                    </button>
                )}
            </div>

            {visibleItems.length > 0 ? (
                <div className={homeMemberPageStyles.historyScrollArea}>
                    {visibleItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onClickDetail(item.id)}
                            className={homeMemberPageStyles.historyCard}
                        >
                            <span className={homeMemberPageStyles.historyDate}>
                                {item.recommendedDate}
                            </span>

                            <div className={homeMemberPageStyles.historyBottom}>
                                <strong className={homeMemberPageStyles.historyMenuName}>
                                    {item.menuName}
                                </strong>

                                <div className={homeMemberPageStyles.historyChipGroup}>
                                    {item.categories.map((category) => (
                                        <span
                                            key={category}
                                            className={homeMemberPageStyles.historyChip}
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className={homeMemberPageStyles.historyEmpty}>
                    메뉴 추천 기록이 없습니다.
                </div>
            )}
        </section>
    );
}