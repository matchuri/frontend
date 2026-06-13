"use client";

import { useState } from "react";

import { deleteGroup } from "@/features/group/application/usecase/deleteGroup";

interface UseDeleteGroupParams {
    readonly onSuccess?: () => void;
}

export function useDeleteGroup({
    onSuccess,
}: UseDeleteGroupParams = {}) {
    const [isDeleting, setIsDeleting] =
        useState(false);

    const [deleteErrorMessage, setDeleteErrorMessage] =
        useState<string | null>(null);

    const removeGroup = async (
        groupId: number,
    ) => {
        try {
            setIsDeleting(true);
            setDeleteErrorMessage(null);

            await deleteGroup(groupId);

            onSuccess?.();
        } catch (error) {
            setDeleteErrorMessage(
                error instanceof Error
                    ? error.message
                    : "그룹 삭제에 실패했습니다.",
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isDeleting,
        deleteErrorMessage,
        removeGroup,
    };
}