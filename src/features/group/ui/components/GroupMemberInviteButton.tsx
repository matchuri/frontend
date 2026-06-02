"use client";

import { Plus } from "lucide-react";

import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupMemberInviteButtonProps {
    readonly onClick: () => void;
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
            <Plus size={14} />
            <span>초대</span>
        </button>
    );
}