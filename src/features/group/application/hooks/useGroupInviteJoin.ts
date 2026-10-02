"use client";

import { useState } from "react";
import { HttpError } from "@/infrastructure/http/httpClient";
import type { GroupInviteJoinResult } from "@/features/group/domain/model/GroupInviteJoinResult";
import { joinGroupByInviteLink } from "@/features/group/application/usecase/joinGroupByInviteLink";

type GroupInviteJoinErrorCode =
    | "GROUP_INVITE_LINK_NOT_FOUND"
    | "GROUP_INVITE_LINK_EXPIRED";

const groupInviteJoinErrorMessages: Record<GroupInviteJoinErrorCode, string> = {
    GROUP_INVITE_LINK_NOT_FOUND:
        "유효한 그룹 초대 링크를 찾을 수 없습니다.",
    GROUP_INVITE_LINK_EXPIRED:
        "초대 링크가 만료되었습니다.",
};

function isGroupInviteJoinErrorCode(
    code: string | undefined,
): code is GroupInviteJoinErrorCode {
    return Boolean(
        code &&
        code in groupInviteJoinErrorMessages,
    );
}

function getGroupInviteJoinErrorMessage(
    error: unknown,
) {
    if (error instanceof HttpError) {
        const code = error.body?.error?.code;

        if (isGroupInviteJoinErrorCode(code)) {
            return groupInviteJoinErrorMessages[code];
        }

        return (
            error.body?.error?.message ??
            "그룹 참여에 실패했습니다."
        );
    }

    return error instanceof Error
        ? error.message
        : "그룹 참여에 실패했습니다.";
}

export function useGroupInviteJoin() {
    const [joinResult, setJoinResult] = useState<GroupInviteJoinResult | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const join = async (
        token: string,
    ) => {
        if (isJoining) {
            return;
        }

        try {
            setIsJoining(true);
            setErrorMessage(null);

            const result =
                await joinGroupByInviteLink(token);

            setJoinResult(result);
        } catch (error) {
            setErrorMessage(
                getGroupInviteJoinErrorMessage(error),
            );
        } finally {
            setIsJoining(false);
        }
    };

    return {
        joinResult,
        isJoining,
        errorMessage,
        join,
    };
}