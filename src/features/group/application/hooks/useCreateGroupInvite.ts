"use client";

import { useState } from "react";

import { createGroupInviteByNickname } from "@/features/group/application/usecase/createGroupInviteByNickname";

interface UseCreateGroupInviteParams {
    readonly onSuccess?: () => void;
}

type GroupInviteErrorCode =
    | "GROUP_INVITE_TARGET_NOT_FOUND"
    | "GROUP_INVITE_SELF_NOT_ALLOWED"
    | "GROUP_INVITE_TARGET_ALREADY_MEMBER"
    | "GROUP_INVITE_ALREADY_PENDING";

const groupInviteErrorMessages: Record<GroupInviteErrorCode, string> = {
    GROUP_INVITE_TARGET_NOT_FOUND:
        "초대 대상 회원을 찾을 수 없습니다.",
    GROUP_INVITE_SELF_NOT_ALLOWED:
        "자기 자신은 그룹에 초대할 수 없습니다.",
    GROUP_INVITE_TARGET_ALREADY_MEMBER:
        "이미 그룹에 속한 대상입니다.",
    GROUP_INVITE_ALREADY_PENDING:
        "이미 대기 중인 그룹 초대가 있습니다.",
};

function isGroupInviteErrorCode(
    code: string | undefined,
): code is GroupInviteErrorCode {
    return Boolean(code && code in groupInviteErrorMessages);
}

function getGroupInviteErrorMessage(error: unknown) {
    if (error instanceof Error) {
        const httpError = error as Error & {
            body?: {
                error?: {
                    code?: string;
                    message?: string;
                } | null;
            };
        };

        const code = httpError.body?.error?.code;

        if (isGroupInviteErrorCode(code)) {
            return groupInviteErrorMessages[code];
        }

        return httpError.body?.error?.message ?? error.message;
    }

    return "친구 초대에 실패했습니다.";
}

export function useCreateGroupInvite({
    onSuccess,
}: UseCreateGroupInviteParams = {}) {
    const [isInviting, setIsInviting] = useState(false);
    const [inviteMessage, setInviteMessage] = useState<string | null>(null);

    const invite = async (
        groupId: number,
        nickname: string,
    ) => {
        try {
            setIsInviting(true);
            setInviteMessage(null);

            await createGroupInviteByNickname(
                groupId,
                nickname,
            );

            setInviteMessage("초대 요청을 보냈습니다.");
            onSuccess?.();
        } catch (error) {
            console.log("친구 초대 에러", error);
            setInviteMessage(getGroupInviteErrorMessage(error));
        } finally {
            setIsInviting(false);
        }
    };

    const clearInviteMessage = () => {
        setInviteMessage(null);
    };

    return {
        isInviting,
        inviteMessage,
        invite,
        clearInviteMessage,
    };
}