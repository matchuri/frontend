"use client";

import { useState } from "react";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { createGroup } from "@/features/group/application/usecase/createGroup";

interface UseCreateGroupParams {
    readonly onSuccess?: () => void;
}

export function useCreateGroup({
    onSuccess,
}: UseCreateGroupParams = {}) {
    const [isCreating, setIsCreating] = useState(false);

    const create = async (
        groupName: string,
        location: LocationSetting,
    ) => {
        try {
            setIsCreating(true);

            await createGroup(
                groupName,
                location,
            );

            onSuccess?.();
        } finally {
            setIsCreating(false);
        }
    };

    return {
        isCreating,
        create,
    };
}