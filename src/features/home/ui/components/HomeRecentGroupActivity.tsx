import {
    PartyPopper,
    Utensils,
    Vote,
} from "lucide-react";

import type { HomeGroupActivityType } from "@/features/home/domain/model/HomeGroupActivityType";
import type { HomeRecentGroupActivity as HomeRecentGroupActivityItem } from "@/features/home/domain/model/Home";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";


interface HomeRecentGroupActivityProps {
    readonly items:
        readonly HomeRecentGroupActivityItem[];
}

const MAX_VISIBLE_ACTIVITY_COUNT = 5;

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
}: HomeRecentGroupActivityProps) {
    const isScrollable =
        items.length > MAX_VISIBLE_ACTIVITY_COUNT;

    return (
        <section className={homeMemberPageStyles.section}>
            <div className={homeMemberPageStyles.sectionHeader}>
                <div>
                    <h2 className={homeMemberPageStyles.sectionTitle}>
                        최근 그룹 활동
                    </h2>
                </div>
            </div>

            {items.length > 0 ? (
                <div
                    className={
                        isScrollable
                            ? homeMemberPageStyles.scrollableActivityList
                            : homeMemberPageStyles.activityList
                    }
                >
                    {items.map((item) => {
                        const activityDate = getActivityDate(item);

                        return (
                            <button
                                key={`${item.groupId}-${item.details.recommendationId}`}
                                type="button"
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