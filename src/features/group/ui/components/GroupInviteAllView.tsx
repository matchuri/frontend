import { ArrowLeft } from "lucide-react";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";
import GroupInviteCard from "@/features/group/ui/components/GroupInviteCard";
import { groupInviteAllViewStyles } from "@/ui/styles/groupInviteAllViewStyles";

interface GroupInviteAllViewProps {
    readonly invites: readonly GroupInvite[];
    readonly onBack: () => void;
}

export default function GroupInviteAllView({
    invites,
    onBack,
}: GroupInviteAllViewProps) {
    return (
        <main className={groupInviteAllViewStyles.container}>
            <div className={groupInviteAllViewStyles.content}>
                <header className={groupInviteAllViewStyles.header}>
                    <button
                        type="button"
                        onClick={onBack}
                        className={groupInviteAllViewStyles.backButton}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <h1 className={groupInviteAllViewStyles.title}>
                        모든 초대{" "}
                        <span className={groupInviteAllViewStyles.count}>
                            ({invites.length})
                        </span>
                    </h1>
                </header>

                <div className={groupInviteAllViewStyles.inviteGrid}>
                    {invites.map((invite) => (
                        <GroupInviteCard
                            key={invite.inviteId}
                            invite={invite}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}