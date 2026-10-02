"use client";

import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { groupInviteExistsAtom } from "@/features/groupInviteNotification/application/atoms/groupInviteNotificationAtom";

import { groupInviteNotificationApi } from "@/features/groupInviteNotification/infrastructure/api/groupInviteNotificationApi";

export function useGroupInviteExists() {
    const hasInvite = useAtomValue(groupInviteExistsAtom);
    const setHasInvite = useSetAtom(groupInviteExistsAtom);

    const refetchInviteExists =
        useCallback(async () => {
            try {
                const exists = await groupInviteNotificationApi.fetchInviteExists();

                setHasInvite(exists);
            } catch {
                setHasInvite(false);
            }
        }, [setHasInvite]);

    return {
        hasInvite,
        refetchInviteExists,
    };
}