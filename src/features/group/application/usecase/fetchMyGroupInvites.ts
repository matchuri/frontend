import { groupInviteApi } from "@/features/group/infrastructure/api/groupInviteApi";

export async function fetchMyGroupInvites() {
    return await groupInviteApi.fetchMyInvites();
}