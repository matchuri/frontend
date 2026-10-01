"use client";

import { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import {
    accessTokenAtom,
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    isOnboardingReadyAtom,
} from "@/features/auth/application/selectors/authSelectors";

import { useMyRealtimeEvents } from "@/features/realtime/application/hooks/useMyRealtimeEvents";

import {
    groupInviteExistsAtom,
    groupInviteNotificationListAtom,
} from "@/features/groupInviteNotification/application/atoms/groupInviteNotificationAtom";
import { groupInviteNotificationApi } from "@/features/groupInviteNotification/infrastructure/api/groupInviteNotificationApi";

export default function MyRealtimeEventsInitializer() {
    const accessToken = useAtomValue(accessTokenAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isOnboardingReady = useAtomValue(isOnboardingReadyAtom);

    const setInvites = useSetAtom(groupInviteNotificationListAtom);
    const setHasInvite = useSetAtom(groupInviteExistsAtom);

    const isMemberReady =
        !isAuthLoading &&
        isAuthenticated &&
        isOnboardingReady;

    const synchronizeGroupInvites =
        useCallback(async () => {
            try {
                const invites = await groupInviteNotificationApi.fetchInvites();

                setInvites(invites);
            } catch {
                setInvites([]);
            }

            try {
                const exists = await groupInviteNotificationApi.fetchInviteExists();

                setHasInvite(exists);
            } catch {
                setHasInvite(false);
            }
        }, [
            setHasInvite,
            setInvites,
        ]);

    const handleConnected =
        useCallback(() => {
            void synchronizeGroupInvites();
        }, [synchronizeGroupInvites]);

    const handleGroupInviteCreated =
        useCallback(() => {
            void synchronizeGroupInvites();
        }, [synchronizeGroupInvites]);

    useEffect(() => {
        if (isMemberReady) {
            return;
        }

        setInvites([]);
        setHasInvite(false);
    }, [
        isMemberReady,
        setHasInvite,
        setInvites,
    ]);

    useMyRealtimeEvents({
        accessToken: isMemberReady ? accessToken : null,
        onConnected: handleConnected,
        onGroupInviteCreated: handleGroupInviteCreated,
    });

    return null;
}