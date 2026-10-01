import { ArrowLeft } from "lucide-react";

import GroupDetailMoreButton from "@/features/group/ui/components/GroupDetailMoreButton";

import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupDetailHeaderProps {
    readonly showMoreButton?: boolean;
    readonly onClose: () => void;
    readonly onClickEditLocation?: () => void;
    readonly onClickDeleteGroup?: () => void;
    readonly onClickLeaveGroup?: () => void;
}

export default function GroupDetailHeader({
    showMoreButton = true,
    onClose,
    onClickEditLocation,
    onClickDeleteGroup,
    onClickLeaveGroup,
}: GroupDetailHeaderProps) {
    return (
        <header className={groupDetailPanelStyles.header}>
            <button
                type="button"
                onClick={onClose}
                className={groupDetailPanelStyles.headerButton}
                aria-label="그룹 목록으로 돌아가기"
            >
                <ArrowLeft
                    size={22}
                    aria-hidden="true"
                />
            </button>

            <h1 className={groupDetailPanelStyles.headerTitle}>
                그룹 상세
            </h1>

            {showMoreButton &&
            onClickEditLocation &&
            onClickDeleteGroup &&
            onClickLeaveGroup ? (
                <GroupDetailMoreButton
                    onClickEditLocation={onClickEditLocation}
                    onClickDeleteGroup={onClickDeleteGroup}
                    onClickLeaveGroup={onClickLeaveGroup}
                />
            ) : (
                <div
                    className={groupDetailPanelStyles.headerButton}
                    aria-hidden="true"
                />
            )}
        </header>
    );
}