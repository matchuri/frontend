import { groupInviteCardStyles } from "@/ui/styles/groupInviteCardStyles";

interface GroupInviteDeclineButtonProps {
    readonly disabled: boolean;
    readonly onClick: () => void;
}

export default function GroupInviteDeclineButton({
    disabled,
    onClick,
}: GroupInviteDeclineButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={groupInviteCardStyles.declineButton}
        >
            거절
        </button>
    );
}