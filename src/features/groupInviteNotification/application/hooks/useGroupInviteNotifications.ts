"use client";

import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { groupInviteNotificationListAtom } from "@/features/groupInviteNotification/application/atoms/groupInviteNotificationAtom";
import { groupInviteNotificationApi } from "@/features/groupInviteNotification/infrastructure/api/groupInviteNotificationApi";

export function useGroupInviteNotifications() {
    const invites = useAtomValue(groupInviteNotificationListAtom);
    const setInvites = useSetAtom(groupInviteNotificationListAtom);

    const refetchInvites =
        useCallback(async () => {
            try {
                const data = await groupInviteNotificationApi.fetchInvites();

                setInvites(data);
            } catch {
                setInvites([]);
            }
        }, [setInvites]);

    return {
        invites,
        refetchInvites,
    };
}