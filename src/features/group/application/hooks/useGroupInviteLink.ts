"use client";

import { useState } from "react";

import { HttpError } from "@/infrastructure/http/httpClient";

import type { GroupInviteLink } from "@/features/group/domain/model/GroupInviteLink";

import { fetchGroupInviteLink } from "@/features/group/application/usecase/fetchGroupInviteLink";
import { issueGroupInviteLink } from "@/features/group/application/usecase/issueGroupInviteLink";

const GROUP_INVITE_PREVIEW_URL =
    "https://matchuri.com/groups/invite-links/preview";

function createGroupInviteShareUrl(
    token: string,
) {
    return `${GROUP_INVITE_PREVIEW_URL}?code=${encodeURIComponent(token)}`;
}

function getGroupInviteLinkErrorMessage(
    error: unknown,
    fallbackMessage: string,
) {
    if (error instanceof HttpError) {
        return error.body?.error?.message ?? fallbackMessage;
    }

    return error instanceof Error
        ? error.message
        : fallbackMessage;
}

export function useGroupInviteLink() {
    const [inviteLink, setInviteLink] = useState<GroupInviteLink | null>(null);
    const [isPreparingInviteLink, setIsPreparingInviteLink] = useState(false);
    const [inviteLinkMessage, setInviteLinkMessage] = useState<string | null>(null);

    const prepareInviteLink = async (
        groupId: number,
    ) => {
        try {
            setIsPreparingInviteLink(true);
            setInviteLinkMessage(null);

            const currentLink = await fetchGroupInviteLink(groupId);

            if (currentLink) {
                setInviteLink(currentLink);
                return true;
            }

            const newLink = await issueGroupInviteLink(groupId);

            setInviteLink(newLink);

            return true;
        } catch (error) {
            if (
                error instanceof HttpError &&
                error.body?.error?.code ===
                    "GROUP_INVITE_LINK_ALREADY_EXISTS"
            ) {
                try {
                    const currentLink =
                        await fetchGroupInviteLink(groupId);

                    if (currentLink) {
                        setInviteLink(currentLink);
                        return true;
                    }
                } catch (refetchError) {
                    setInviteLinkMessage(
                        getGroupInviteLinkErrorMessage(
                            refetchError,
                            "그룹 초대 링크를 불러오지 못했습니다.",
                        ),
                    );

                    return false;
                }
            }

            setInviteLinkMessage(
                getGroupInviteLinkErrorMessage(
                    error,
                    "그룹 초대 링크를 준비하지 못했습니다.",
                ),
            );

            return false;
        } finally {
            setIsPreparingInviteLink(false);
        }
    };

    const clearInviteLink = () => {
        setInviteLink(null);
        setInviteLinkMessage(null);
    };

    return {
        inviteLink:
            inviteLink
                ? createGroupInviteShareUrl(inviteLink.token)
                : null,
        isPreparingInviteLink,
        inviteLinkMessage,
        prepareInviteLink,
        clearInviteLink,
    };
}