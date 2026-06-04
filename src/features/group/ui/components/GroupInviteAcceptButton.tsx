import { groupInviteCardStyles } from "@/ui/styles/groupInviteCardStyles";

interface GroupInviteAcceptButtonProps {
    readonly disabled: boolean;
    readonly onClick: () => void;
}

export default function GroupInviteAcceptButton({
    disabled,
    onClick,
}: GroupInviteAcceptButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={groupInviteCardStyles.acceptButton}
        >
            수락
        </button>
    );
}