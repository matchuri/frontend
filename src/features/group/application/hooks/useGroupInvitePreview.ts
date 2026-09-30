"use client";

import { useCallback, useEffect, useState } from "react";
import { HttpError } from "@/infrastructure/http/httpClient";
import type { GroupInvitePreview } from "@/features/group/domain/model/GroupInvitePreview";
import { fetchGroupInvitePreview } from "@/features/group/application/usecase/fetchGroupInvitePreview";

type GroupInvitePreviewErrorCode =
    | "COMMON_INVALID_BODY_FIELD"
    | "GROUP_INVITE_LINK_NOT_FOUND"
    | "GROUP_INVITE_LINK_EXPIRED";

const groupInvitePreviewErrorMessages: Record<GroupInvitePreviewErrorCode, string> = {
    COMMON_INVALID_BODY_FIELD:
        "올바르지 않은 초대 링크입니다.",
    GROUP_INVITE_LINK_NOT_FOUND:
        "유효한 그룹 초대 링크를 찾을 수 없습니다.",
    GROUP_INVITE_LINK_EXPIRED:
        "초대 링크가 만료되었습니다.",
};

function isGroupInvitePreviewErrorCode(
    code: string | undefined,
): code is GroupInvitePreviewErrorCode {
    return Boolean(
        code &&
        code in groupInvitePreviewErrorMessages,
    );
}

function getGroupInvitePreviewErrorMessage(
    error: unknown,
) {
    if (error instanceof HttpError) {
        const code = error.body?.error?.code;

        if (isGroupInvitePreviewErrorCode(code)) {
            return groupInvitePreviewErrorMessages[code];
        }

        return (
            error.body?.error?.message ??
            "그룹 초대 정보를 불러오지 못했습니다."
        );
    }

    return error instanceof Error
        ? error.message
        : "그룹 초대 정보를 불러오지 못했습니다.";
}

export function useGroupInvitePreview(
    token: string | null,
) {
    const [preview, setPreview] = useState<GroupInvitePreview | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const loadPreview = useCallback(async () => {
        if (!token) {
            setPreview(null);
            setErrorMessage("올바르지 않은 초대 링크입니다.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage(null);

            const nextPreview =
                await fetchGroupInvitePreview(token);

            setPreview(nextPreview);
        } catch (error) {
            setPreview(null);
            setErrorMessage(
                getGroupInvitePreviewErrorMessage(error),
            );
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        void loadPreview();
    }, [loadPreview]);

    return {
        preview,
        isLoading,
        errorMessage,
        refetchPreview: loadPreview,
    };
}