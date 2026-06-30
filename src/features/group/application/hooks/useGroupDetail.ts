"use client";

import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";

import { groupDetailAtom } from "@/features/group/application/atoms/groupDetailAtom";
import { fetchGroupDetail } from "@/features/group/application/usecase/fetchGroupDetail";

interface UseGroupDetailParams {
    readonly onGroupNotFound?: () => void;
}

function isGroupNotFoundError(error: unknown) {
    const httpError = error as {
        status?: number;
        body?: { error?: { code?: string } | null };
        errorBody?: { error?: { code?: string } | null };
        message?: string;
    };

    return (
        httpError.status === 404 ||
        httpError.body?.error?.code === "GROUP_NOT_FOUND" ||
        httpError.errorBody?.error?.code === "GROUP_NOT_FOUND" ||
        httpError.message?.includes("GROUP_NOT_FOUND")
    );
}

export function useGroupDetail(
    groupId: number | null,
    { onGroupNotFound }: UseGroupDetailParams = {},
) {
    const setGroupDetailState = useSetAtom(groupDetailAtom);

    const refetchGroupDetail = useCallback(async () => {
        if (groupId === null) return;

        try {
            setGroupDetailState({ status: "LOADING" });

            const groupDetail = await fetchGroupDetail(groupId);
            console.log("그룹 상세 패널 열림:", groupDetail);

            setGroupDetailState({
                status: "SUCCESS",
                data: groupDetail,
            });
        } catch (error) {
            if (isGroupNotFoundError(error)) {
                setGroupDetailState({ status: "LOADING" });
                onGroupNotFound?.();
                return;
            }

            setGroupDetailState({
                status: "ERROR",
                message:
                    error instanceof Error
                        ? error.message
                        : "그룹 상세 정보를 불러오는데 실패했습니다.",
            });
        }
    }, [groupId, onGroupNotFound, setGroupDetailState]);

    useEffect(() => {
        if (groupId === null) {
            setGroupDetailState({ status: "LOADING" });
            return;
        }

        refetchGroupDetail();
    }, [groupId, refetchGroupDetail, setGroupDetailState]);

    return {
        refetchGroupDetail,
    };
}