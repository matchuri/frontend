"use client";

import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { groupAtom } from "@/features/group/application/atoms/groupAtom";
import { groupApi } from "@/features/group/infrastructure/api/groupApi";

export function useGroupList() {
    const [groupState, setGroupState] = useAtom(groupAtom);

    const fetchGroups = useCallback(async () => {
        setGroupState({ status: "LOADING" });

        try {
            const groups = await groupApi.fetchMyGroups();

            setGroupState({
                status: "SUCCESS",
                data: groups,
            });
        } catch {
            setGroupState({
                status: "ERROR",
                message: "그룹 목록을 불러오는데 실패했습니다.",
            });
        }
    }, [setGroupState]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    return {
        groupState,
        refetchGroups: fetchGroups,
    };
}