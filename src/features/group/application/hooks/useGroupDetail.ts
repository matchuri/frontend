"use client";

import { useEffect, useState } from "react";

import type { GroupDetailState } from "@/features/group/domain/state/GroupDetailState";
import { fetchGroupDetail } from "@/features/group/application/usecase/fetchGroupDetail";

export function useGroupDetail(groupId: number | null) {
    const [groupDetailState, setGroupDetailState] =
        useState<GroupDetailState>({
            status: "LOADING",
        });

    useEffect(() => {
        if (groupId === null) return;

        const selectedGroupId = groupId;

        async function loadGroupDetail() {
            try {
                setGroupDetailState({ status: "LOADING" });

                const groupDetail = await fetchGroupDetail(selectedGroupId);

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
        }

        loadGroupDetail();
    }, [groupId]);

    return {
        groupDetailState,
    };
}