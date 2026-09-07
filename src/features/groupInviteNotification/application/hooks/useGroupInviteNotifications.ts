"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import type { GroupInviteNotificationItem } from "@/features/groupInviteNotification/domain/model/GroupInviteNotificationItem";

import { groupInviteNotificationApi } from "@/features/groupInviteNotification/infrastructure/api/groupInviteNotificationApi";

export function useGroupInviteNotifications() {
    const [invites, setInvites] =
        useState<
            readonly GroupInviteNotificationItem[]
        >([]);

    const refetchInvites =
        useCallback(async () => {
            try {
                const data = await groupInviteNotificationApi.fetchInvites();

                setInvites(data);
            } catch {
                setInvites([]);
            }
        }, []);

    useEffect(() => {
        let cancelled = false;

        groupInviteNotificationApi
            .fetchInvites()
            .then((data) => {
                if (!cancelled) {
                    setInvites(data);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setInvites([]);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        invites,
        refetchInvites,
    };
}