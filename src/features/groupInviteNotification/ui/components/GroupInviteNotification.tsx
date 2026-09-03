"use client";

import {
    MailCheck,
    UserRound,
    X,
} from "lucide-react";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";

import { groupInviteNotificationStyles } from "@/ui/styles/groupInviteNotificationStyles";

interface GroupInviteNotificationProps {
    readonly invites: readonly GroupInvite[];
    readonly onAcceptInvite: (inviteId: number) => void;
    readonly onDeclineInvite: (inviteId: number) => void;
    readonly onClose: () => void;
}

export default function GroupInviteNotification({
    invites,
    onAcceptInvite,
    onDeclineInvite,
    onClose,
}: GroupInviteNotificationProps) {
    return (
        <>
            <button
                type="button"
                aria-label="그룹 초대 알림 닫기"
                onClick={onClose}
                className={groupInviteNotificationStyles.overlay}
            />

            <section className={groupInviteNotificationStyles.panel}>
                <div className={groupInviteNotificationStyles.header}>
                    <div>
                        <h2 className={groupInviteNotificationStyles.title}>
                            그룹 초대
                        </h2>

                        <span className={groupInviteNotificationStyles.count}>
                            {invites.length}개의 새로운 초대
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="그룹 초대 알림 닫기"
                        className={groupInviteNotificationStyles.closeButton}
                    >
                        <X
                            size={18}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                {invites.length > 0 ? (
                    <div className={groupInviteNotificationStyles.list}>
                        {invites.map((invite) => (
                            <article
                                key={invite.inviteId}
                                className={groupInviteNotificationStyles.item}
                            >
                                <div className={groupInviteNotificationStyles.info}>
                                    <div className={groupInviteNotificationStyles.avatar}>
                                        <UserRound
                                            size={20}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div className={groupInviteNotificationStyles.text}>
                                        <p className={groupInviteNotificationStyles.message}>
                                            <strong>
                                                {invite.requestMemberNickname}
                                            </strong>
                                            님이 그룹에 초대했습니다.
                                        </p>

                                        <span className={groupInviteNotificationStyles.groupName}>
                                            {invite.groupName}
                                        </span>
                                    </div>
                                </div>

                                <div className={groupInviteNotificationStyles.actions}>
                                    <button
                                        type="button"
                                        onClick={() => onDeclineInvite(invite.inviteId)}
                                        className={groupInviteNotificationStyles.declineButton}
                                    >
                                        거절
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onAcceptInvite(invite.inviteId)}
                                        className={groupInviteNotificationStyles.acceptButton}
                                    >
                                        수락
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className={groupInviteNotificationStyles.empty}>
                        <MailCheck
                            size={26}
                            aria-hidden="true"
                        />

                        <span>
                            받은 그룹 초대가 없습니다.
                        </span>
                    </div>
                )}
            </section>
        </>
    );
}