"use client";

import { useState } from "react";

import { leaveGroup } from "@/features/group/application/usecase/leaveGroup";

interface UseLeaveGroupParams {
    readonly onSuccess?: () => void;
}

export function useLeaveGroup({
    onSuccess,
}: UseLeaveGroupParams = {}) {
    const [isLeaving, setIsLeaving] = useState(false);

    const leave = async (groupId: number) => {
        try {
            setIsLeaving(true);

            await leaveGroup(groupId);

            onSuccess?.();
        } finally {
            setIsLeaving(false);
        }
    };

    return {
        isLeaving,
        leave,
    };
}