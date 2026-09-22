import { ChevronRight, Users } from "lucide-react";

import type { Group } from "@/features/group/domain/model/Group";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

interface GroupCardProps {
    readonly group: Group;
    readonly onClick: () => void;
}

function getStatusLabel(status: Group["recommendationStatus"]) {
    if (status === "PREPARING") return "메뉴 추천 준비중";
    if (status === "OPEN") return "투표 진행중";
    if (status === "FINALIZED") return "투표 종료";

    return null;
}

function getStatusClassName(status: Group["recommendationStatus"]) {
    if (status === "PREPARING") {
        return `${groupManagementPageStyles.statusBadge} ${groupManagementPageStyles.preparingBadge}`;
    }

    if (status === "OPEN") {
        return `${groupManagementPageStyles.statusBadge} ${groupManagementPageStyles.openBadge}`;
    }

    if (status === "FINALIZED") {
        return `${groupManagementPageStyles.statusBadge} ${groupManagementPageStyles.finalizedBadge}`;
    }

    return groupManagementPageStyles.statusBadge;
}

export default function GroupCard({
    group,
    onClick,
}: GroupCardProps) {
    const statusLabel = getStatusLabel(group.recommendationStatus);

    return (
        <button
            type="button"
            onClick={onClick}
            className={groupManagementPageStyles.groupCard}
        >
            <div className={groupManagementPageStyles.groupInfo}>
                <h3 className={groupManagementPageStyles.groupName}>
                    {group.name}
                </h3>

                <div className={groupManagementPageStyles.groupMeta}>
                    <Users size={15} strokeWidth={2} aria-hidden="true" />
                    <span>
                        {group.memberCount}명 참여
                    </span>
                </div>
            </div>

            {statusLabel && (
                <span className={getStatusClassName(group.recommendationStatus)}>
                    {statusLabel}
                </span>
            )}

            <ChevronRight
                size={20}
                className={groupManagementPageStyles.groupChevron}
                aria-hidden="true"
            />
        </button>
    );
}