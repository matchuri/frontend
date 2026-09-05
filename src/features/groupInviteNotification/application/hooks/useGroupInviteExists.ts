"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { groupInviteNotificationApi } from "@/features/groupInviteNotification/infrastructure/api/groupInviteNotificationApi";

export function useGroupInviteExists() {
    const [hasInvite, setHasInvite] = useState(false);

    const refetchInviteExists =
        useCallback(async () => {
            try {
                const exists = await groupInviteNotificationApi.fetchInviteExists();

                setHasInvite(exists);
            } catch {
                setHasInvite(false);
            }
        }, []);

    useEffect(() => {
        let cancelled = false;

        groupInviteNotificationApi
            .fetchInviteExists()
            .then((exists) => {
                if (!cancelled) {
                    setHasInvite(exists);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setHasInvite(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        hasInvite,
        refetchInviteExists,
    };
}