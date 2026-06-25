import { Calendar, ChevronRight, Users } from "lucide-react";
import type { Group } from "@/features/group/domain/model/Group";
import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

interface GroupCardProps {
    readonly group: Group;
    readonly isSelected?: boolean;
    readonly onClick?: () => void;
}

function getStatusLabel(status: Group["recommendationStatus"]) {
    if (status === "OPEN") return "투표 진행 중";
    if (status === "CLOSED") return "투표 종료";
    if (status === "PREPARING") return "메뉴 추천 준비중";
    return null;
}

function getStatusClassName(status: Group["recommendationStatus"]) {
    if (status === "OPEN") {
        return `${groupManagementPageStyles.statusBadge} ${groupManagementPageStyles.openBadge}`;
    }

    if (status === "CLOSED") {
        return `${groupManagementPageStyles.statusBadge} ${groupManagementPageStyles.closedBadge}`;
    }

    if (status === "PREPARING") {
        return `${groupManagementPageStyles.statusBadge} ${groupManagementPageStyles.preparingBadge}`;
    }

    return groupManagementPageStyles.statusBadge;
}

export default function GroupCard({
    group,
    isSelected = false,
    onClick,
}: GroupCardProps) {
    const statusLabel = getStatusLabel(group.recommendationStatus);

    return (
        <article
            onClick={onClick}
            className={
                isSelected
                    ? groupManagementPageStyles.selectedGroupCard
                    : groupManagementPageStyles.groupCard
            }
        >
            <div className={groupManagementPageStyles.groupInfo}>
                <div className={groupManagementPageStyles.groupTop}>
                    <h3 className={groupManagementPageStyles.groupName}>
                        {group.name}
                    </h3>

                    {group.isOwner && (
                        <span className={groupManagementPageStyles.ownerBadge}>
                            방장
                        </span>
                    )}

                    {statusLabel && (
                        <span className={getStatusClassName(group.recommendationStatus)}>
                            {statusLabel}
                        </span>
                    )}
                </div>

                <div className={groupManagementPageStyles.groupMeta}>
                    <span className="flex items-center gap-2">
                        <Users size={20} />
                        {group.memberCount}명
                    </span>

                    <span className="flex items-center gap-2">
                        <Calendar size={20} />
                        {group.createdAt}
                    </span>
                </div>
            </div>

            <button type="button" className={groupManagementPageStyles.arrowButton}>
                <ChevronRight size={28} />
            </button>
        </article>
    );
}