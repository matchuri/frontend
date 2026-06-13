import { Plus } from "lucide-react";

import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupMemberMoreButtonProps {
    readonly onClick: () => void;
}

export default function GroupMemberMoreButton({
    onClick,
}: GroupMemberMoreButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={groupDetailPanelStyles.memberMoreButton}
        >
            <Plus size={28} />
            <span>모두 보기</span>
        </button>
    );
}