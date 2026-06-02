import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupMemberInviteButtonProps {
    readonly onClick?: () => void;
}

export default function GroupMemberInviteButton({
    onClick,
}: GroupMemberInviteButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={groupDetailPanelStyles.memberInviteButton}
        >
            + 초대
        </button>
    );
}