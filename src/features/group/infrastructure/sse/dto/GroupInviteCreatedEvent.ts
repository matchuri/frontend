export interface GroupInviteCreatedEvent {
    readonly eventId: string;
    readonly eventType: "GROUP_INVITE_CREATED";
    readonly occurredAt: string;
    readonly groupId: number;
    readonly sessionId: null;
    readonly actorMemberId: number;
    readonly payload: {
        readonly inviteId: number;
        readonly groupId: number;
        readonly groupName: string;
        readonly requestMemberId: number;
        readonly requestMemberNickname: string;
        readonly expiresAt: string;
    };
}