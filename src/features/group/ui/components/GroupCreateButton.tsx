import { Plus } from "lucide-react";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

interface GroupCreateButtonProps {
    readonly onClick: () => void;
}

export default function GroupCreateButton({
    onClick,
}: GroupCreateButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={groupManagementPageStyles.createButton}
        >
            <Plus size={16} strokeWidth={2.2} />
            그룹 생성
        </button>
    );
}