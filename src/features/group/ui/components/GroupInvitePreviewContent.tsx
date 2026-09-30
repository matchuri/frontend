"use client";

import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { Link2Off } from "lucide-react";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";

import { useGroupInvitePreview } from "@/features/group/application/hooks/useGroupInvitePreview";

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

    const handleCancel = () => {
        if (isAuthenticated) {
            router.push("/home");
            return;
        }

        router.push("/");
    };

    const handleLogin = () => {
        router.push("/login");
    };

    const handleJoin = () => {
        alert("그룹 참여 기능은 준비 중입니다.");
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

    return (
        <GroupInvitePreviewView
            preview={preview}
            isAuthenticated={isAuthenticated}
            onCancel={handleCancel}
            onLogin={handleLogin}
            onJoin={handleJoin}
        />
    );
}