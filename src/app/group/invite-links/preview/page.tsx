import { Suspense } from "react";

import GroupInvitePreviewContent from "@/features/group/ui/components/GroupInvitePreviewContent";

import { groupInvitePreviewStyles } from "@/ui/styles/groupInvitePreviewStyles";

function GroupInvitePreviewFallback() {
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

export default function GroupInvitePreviewPage() {
    return (
        <Suspense fallback={<GroupInvitePreviewFallback />}>
            <GroupInvitePreviewContent />
        </Suspense>
    );
}