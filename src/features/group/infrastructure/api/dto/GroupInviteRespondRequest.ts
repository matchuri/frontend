import type { GroupInviteResponseType } from "@/features/group/domain/model/GroupInviteResponseType";

export interface GroupInviteRespondRequest {
    readonly responseType: GroupInviteResponseType;
}