"use client";

import { useState } from "react";

import type { GroupInviteResponseType } from "@/features/group/domain/model/GroupInviteResponseType";

import { respondGroupInvite } from "@/features/group/application/usecase/respondGroupInvite";

interface UseRespondGroupInviteParams {
    readonly onSuccess?: () => void;
}

export function useRespondGroupInvite({
    onSuccess,
}: UseRespondGroupInviteParams = {}) {
    const [processingInviteId, setProcessingInviteId] =
        useState<number | null>(null);

    const respond = async (
        inviteId: number,
        responseType: GroupInviteResponseType,
    ) => {
        try {
            setProcessingInviteId(inviteId);

            await respondGroupInvite(
                inviteId,
                responseType,
            );

            onSuccess?.();
        } finally {
            setProcessingInviteId(null);
        }
    };

    return {
        processingInviteId,
        respond,
    };
}