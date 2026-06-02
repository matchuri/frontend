"use client";

import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";

import { inviteAtom } from "@/features/group/application/atoms/inviteAtom";
import { fetchMyGroupInvites } from "@/features/group/application/usecase/fetchMyGroupInvites";

export function useGroupInvites() {
    const setInviteState = useSetAtom(inviteAtom);

    const fetchInvites = useCallback(async () => {
        setInviteState({ status: "LOADING" });

        try {
            const invites = await fetchMyGroupInvites();

            setInviteState({
                status: "SUCCESS",
                data: invites,
            });
        } catch (error) {
            setInviteState({
                status: "ERROR",
                message:
                    error instanceof Error
                        ? error.message
                        : "받은 초대 목록을 불러오는데 실패했습니다.",
            });
        }
    }, [setInviteState]);

    useEffect(() => {
        fetchInvites();
    }, [fetchInvites]);

    return {
        refetchInvites: fetchInvites,
    };
}