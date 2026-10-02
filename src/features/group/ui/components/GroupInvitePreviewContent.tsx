"use client";

import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Link2Off } from "lucide-react";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";

import { useGroupInvitePreview } from "@/features/group/application/hooks/useGroupInvitePreview";
import { useGroupInviteJoin } from "@/features/group/application/hooks/useGroupInviteJoin";

import { groupInviteSessionStorage } from "@/features/group/infrastructure/storage/groupInviteSessionStorage";

import GroupInvitePreviewView from "@/features/group/ui/components/GroupInvitePreviewView";

import { groupInvitePreviewStyles } from "@/ui/styles/groupInvitePreviewStyles";

export default function GroupInvitePreviewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get("code");

    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const {
        preview,
        isLoading,
        errorMessage,
        refetchPreview,
    } = useGroupInvitePreview(token);

    const {
        joinResult,
        isJoining,
        errorMessage: joinErrorMessage,
        join,
    } = useGroupInviteJoin();

    const handleCancel = () => {
        groupInviteSessionStorage.clearCode();

        if (isAuthenticated) {
            router.push("/home");
            return;
        }

        router.push("/");
    };

    const handleLogin = () => {
        if (!token) {
            return;
        }

        groupInviteSessionStorage.saveCode(token);
        router.push("/login");
    };

    const handleJoin = () => {
        if (!token || !isAuthenticated) {
            return;
        }

        void join(token);
    };

    const handleMoveToGroup = () => {
        if (!joinResult) {
            return;
        }

        groupInviteSessionStorage.clearCode();
        router.push(`/group/${joinResult.groupId}`);
    };

    if (isAuthLoading || isLoading) {
        return (
            <main className={groupInvitePreviewStyles.statePage}>
                <section className={groupInvitePreviewStyles.content}>
                    <div className={groupInvitePreviewStyles.skeletonIcon} />
                    <div className={groupInvitePreviewStyles.skeletonTitle} />
                    <div className={groupInvitePreviewStyles.skeletonText} />
                    <div className={groupInvitePreviewStyles.skeletonDivider} />
                    <div className={groupInvitePreviewStyles.skeletonAction} />
                    <div className={groupInvitePreviewStyles.skeletonDescription} />

                    <div className={groupInvitePreviewStyles.skeletonButtons}>
                        <div className={groupInvitePreviewStyles.skeletonButton} />
                        <div className={groupInvitePreviewStyles.skeletonButton} />
                    </div>
                </section>
            </main>
        );
    }

    if (errorMessage || !preview) {
        return (
            <main className={groupInvitePreviewStyles.statePage}>
                <section className={groupInvitePreviewStyles.stateContent}>
                    <div className={groupInvitePreviewStyles.errorIcon}>
                        <Link2Off
                            size={30}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </div>

                    <h1 className={groupInvitePreviewStyles.stateTitle}>
                        초대 링크를 확인할 수 없어요
                    </h1>

                    <p className={groupInvitePreviewStyles.stateDescription}>
                        {errorMessage ??
                            "유효하지 않은 그룹 초대 링크입니다."}
                    </p>

                    {token && (
                        <button
                            type="button"
                            onClick={() => void refetchPreview()}
                            className={groupInvitePreviewStyles.retryButton}
                        >
                            다시 시도
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleCancel}
                        className={groupInvitePreviewStyles.exitButton}
                    >
                        나가기
                    </button>
                </section>
            </main>
        );
    }

    if (joinResult) {
        return (
            <main className={groupInvitePreviewStyles.statePage}>
                <section className={groupInvitePreviewStyles.joinCompleteContent}>
                    <div className={groupInvitePreviewStyles.joinCompleteIcon}>
                        <Check
                            size={34}
                            strokeWidth={2.2}
                            aria-hidden="true"
                        />
                    </div>

                    <h1 className={groupInvitePreviewStyles.joinCompleteTitle}>
                        그룹에 성공적으로 참여했어요!
                    </h1>

                    <p className={groupInvitePreviewStyles.joinCompleteDescription}>
                        이제 그룹원들과 함께 메뉴를 골라보세요.
                    </p>

                    <button
                        type="button"
                        onClick={handleMoveToGroup}
                        className={groupInvitePreviewStyles.joinCompleteButton}
                    >
                        그룹으로 바로가기
                    </button>
                </section>
            </main>
        );
    }

    return (
        <GroupInvitePreviewView
            preview={preview}
            isAuthenticated={isAuthenticated}
            isJoining={isJoining}
            joinErrorMessage={joinErrorMessage}
            onCancel={handleCancel}
            onLogin={handleLogin}
            onJoin={handleJoin}
        />
    );
}