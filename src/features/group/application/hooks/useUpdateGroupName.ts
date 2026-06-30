"use client";

import { useState } from "react";

import { updateGroupName } from "@/features/group/application/usecase/updateGroupName";

interface UseUpdateGroupNameParams {
    readonly onSuccess?: () => void;
}

export function useUpdateGroupName({
    onSuccess,
}: UseUpdateGroupNameParams = {}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    const update = async (
        groupId: number,
        name: string,
    ) => {
        try {
            setIsUpdating(true);
            setUpdateMessage(null);

            await updateGroupName(groupId, name);

            onSuccess?.();
        } catch (error) {
            setUpdateMessage(
                error instanceof Error
                    ? error.message
                    : "그룹명 수정에 실패했습니다.",
            );
        } finally {
            setIsUpdating(false);
        }
    };

    const clearUpdateMessage = () => {
        setUpdateMessage(null);
    };

    return {
        isUpdating,
        updateMessage,
        update,
        clearUpdateMessage,
    };
}