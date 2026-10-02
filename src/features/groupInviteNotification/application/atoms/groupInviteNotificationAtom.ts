import { atom } from "jotai";

import type { GroupInviteNotificationItem } from "@/features/groupInviteNotification/domain/model/GroupInviteNotificationItem";

export const groupInviteNotificationListAtom =
    atom<readonly GroupInviteNotificationItem[]>([]);

export const groupInviteExistsAtom = atom(false);