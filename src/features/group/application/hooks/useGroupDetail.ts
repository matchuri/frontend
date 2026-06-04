"use client";

import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";

import { groupDetailAtom } from "@/features/group/application/atoms/groupDetailAtom";
import { fetchGroupDetail } from "@/features/group/application/usecase/fetchGroupDetail";

export function useGroupDetail(groupId: number | null) {
    const setGroupDetailState = useSetAtom(groupDetailAtom);

    const refetchGroupDetail = useCallback(async () => {
        if (groupId === null) {
            return;
        }

        try {
            setGroupDetailState({ status: "LOADING" });

            const groupDetail = await fetchGroupDetail(groupId);

            setGroupDetailState({
                status: "SUCCESS",
                data: groupDetail,
            });
        } catch (error) {
            setGroupDetailState({
                status: "ERROR",
                message:
                    error instanceof Error
                        ? error.message
                        : "그룹 상세 정보를 불러오는데 실패했습니다.",
            });
        }
    }, [groupId, setGroupDetailState]);

    useEffect(() => {
        refetchGroupDetail();
    }, [refetchGroupDetail]);

    return {
        refetchGroupDetail,
    };
}