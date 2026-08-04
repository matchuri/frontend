"use client";

import { useState } from "react";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

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
        location: LocationSetting,
    ) => {
        try {
            setIsUpdating(true);
            setMessage(null);

            await updateGroupLocation(
                groupId,
                location,
            );

            setMessage("그룹 위치가 수정되었습니다.");
            onSuccess?.();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "그룹 위치 수정에 실패했습니다.",
            );

            throw error;
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