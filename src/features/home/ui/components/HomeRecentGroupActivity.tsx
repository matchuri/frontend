import {
    PartyPopper,
    Utensils,
    Vote,
} from "lucide-react";

import type { HomeGroupActivityType } from "@/features/home/domain/model/HomeGroupActivityType";
import type { HomeRecentGroupActivity as HomeRecentGroupActivityItem } from "@/features/home/domain/model/Home";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

interface HomeRecentGroupActivityProps {
    readonly items: readonly HomeRecentGroupActivityItem[];
    readonly onClickGroup: (groupId: number) => void;
    readonly onClickViewAll?: () => void;
    readonly displayMode?: "SUMMARY" | "ALL";
    readonly showTitle?: boolean;
}

const MAX_VISIBLE_ACTIVITY_COUNT = 3;

function getActivityMessage(item: HomeRecentGroupActivityItem) {
    if (item.type === "PREPARING") {
        return "메뉴 추천이 시작되었습니다.";
    }

    if (item.type === "OPEN") {
        return "메뉴 투표가 진행 중입니다.";
    }

    if (item.details.selectedMenuName) {
        return `메뉴(${item.details.selectedMenuName})가 결정되었습니다.`;
    }

    return "메뉴 투표가 종료되었습니다.";
}

function getActivityDate(item: HomeRecentGroupActivityItem) {
    if (item.type === "PREPARING") {
        return item.details.createdAt;
    }

    if (item.type === "OPEN") {
        return item.details.startedAt;
    }

    return item.details.endedAt;
}

function formatRelativeTime(dateString: string | null) {
    if (!dateString) {
        return "";
    }

    const now = new Date();
    const targetDate = new Date(dateString);

    const diffMilliseconds = Math.max(
        now.getTime() - targetDate.getTime(),
        0,
    );

    const diffMinutes = Math.floor(
        diffMilliseconds / (1000 * 60),
    );

    if (diffMinutes === 0) {
        return "방금 전";
    }

    if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
        return `${diffHours}시간 전`;
    }

    if (diffHours < 48) {
        return "어제";
    }

    const diffDays = Math.floor(diffHours / 24);

    return `${diffDays}일 전`;
}

function GroupActivityIcon({
    type,
}: {
    readonly type: HomeGroupActivityType;
}) {
    if (type === "PREPARING") {
        return (
            <div className={homeMemberPageStyles.preparingActivityIcon}>
                <Utensils
                    size={20}
                    aria-hidden="true"
                />
            </div>
        );
    }

    if (type === "OPEN") {
        return (
            <div className={homeMemberPageStyles.openActivityIcon}>
                <Vote
                    size={20}
                    aria-hidden="true"
                />
            </div>
        );
    }

    return (
        <div className={homeMemberPageStyles.finalizedActivityIcon}>
            <PartyPopper
                size={20}
                aria-hidden="true"
            />
        </div>
    );
}

export default function HomeRecentGroupActivity({
    items,
    onClickGroup,
    onClickViewAll,
    displayMode = "SUMMARY",
    showTitle = true,
}: HomeRecentGroupActivityProps) {
    const sortedItems = [...items].sort(
        (a, b) => {
            const aDate = getActivityDate(a);
            const bDate = getActivityDate(b);

            return (
                new Date(bDate ?? 0).getTime() -
                new Date(aDate ?? 0).getTime()
            );
        },
    );

    const visibleItems =
        displayMode === "SUMMARY"
            ? sortedItems.slice(0, MAX_VISIBLE_ACTIVITY_COUNT)
            : sortedItems;

    return (
        <section className={homeMemberPageStyles.section}>
            {showTitle && (
                <div className={homeMemberPageStyles.activityHeader}>
                    <h2 className={homeMemberPageStyles.sectionTitle}>
                        최근 그룹 활동
                    </h2>

                    {displayMode === "SUMMARY" && onClickViewAll && (
                        <button
                            type="button"
                            onClick={onClickViewAll}
                            className={homeMemberPageStyles.activityViewAllButton}
                        >
                            전체 보기
                        </button>
                    )}
                </div>
            )}

            {visibleItems.length > 0 ? (
                <div className={homeMemberPageStyles.activityList}>
                    {visibleItems.map((item) => {
                        const activityDate = getActivityDate(item);

                        return (
                            <button
                                key={`${item.groupId}-${item.details.recommendationId}`}
                                type="button"
                                onClick={() => onClickGroup(item.groupId)}
                                className={homeMemberPageStyles.activityCard}
                            >
                                <GroupActivityIcon
                                    type={item.type}
                                />

                                <div className={homeMemberPageStyles.activityContent}>
                                    <div className={homeMemberPageStyles.activityTop}>
                                        <strong className={homeMemberPageStyles.activityGroupName}>
                                            {item.groupName}
                                        </strong>

                                        <span className={homeMemberPageStyles.activityTime}>
                                            {formatRelativeTime(
                                                activityDate,
                                            )}
                                        </span>
                                    </div>

                                    <p className={homeMemberPageStyles.activityMessage}>
                                        {getActivityMessage(item)}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className={homeMemberPageStyles.activityEmpty}>
                    최근 그룹 활동이 없습니다.
                </div>
            )}
        </section>
    );
}