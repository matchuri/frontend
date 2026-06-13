import { groupApi } from "@/features/group/infrastructure/api/groupApi";

export async function leaveGroup(groupId: number) {
    return groupApi.leaveGroup(groupId);
}