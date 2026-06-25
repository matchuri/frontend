"use client";

import { useState } from "react";

import { updateGroupLocation } from "@/features/group/application/usecase/updateGroupLocation";

interface UseUpdateGroupLocationParams {
    readonly onSuccess?: () => void;
}

export function useUpdateGroupLocation({
    onSuccess,
}: UseUpdateGroupLocationParams = {}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const update = async (
        groupId: number,
        latitude: number,
        longitude: number,
        address: string,
    ) => {
        try {
            setIsUpdating(true);
            setMessage(null);

            await updateGroupLocation(
                groupId,
                latitude,
                longitude,
                address,
            );

            setMessage("그룹 위치가 수정되었습니다.");
            onSuccess?.();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "그룹 위치 수정에 실패했습니다.",
            );
        } finally {
            setIsUpdating(false);
        }
    };

    const clearMessage = () => {
        setMessage(null);
    };

    return {
        isUpdating,
        message,
        update,
        clearMessage,
    };
}