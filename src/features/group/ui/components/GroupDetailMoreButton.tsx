import { MoreHorizontal } from "lucide-react";
import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupDetailMoreButtonProps {
    readonly onClick?: () => void;
}

export default function GroupDetailMoreButton({
    onClick,
}: GroupDetailMoreButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={groupDetailPanelStyles.moreButton}
        >
            <MoreHorizontal size={22} />
        </button>
    );
}