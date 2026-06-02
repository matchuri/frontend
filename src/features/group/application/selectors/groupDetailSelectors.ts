import { atom } from "jotai";

import { memberAtom } from "@/features/auth/application/selectors/authSelectors";
import { groupDetailAtom } from "@/features/group/application/atoms/groupDetailAtom";

export const groupDetailAtomValue = atom((get) => {
    const state = get(groupDetailAtom);
    return state.status === "SUCCESS" ? state.data : null;
});

export const isGroupDetailLoadingAtom = atom(
    (get) => get(groupDetailAtom).status === "LOADING",
);

export const groupDetailErrorMessageAtom = atom((get) => {
    const state = get(groupDetailAtom);
    return state.status === "ERROR" ? state.message : null;
});

// TODO: 서버에서 isMe 정보를 보내주면 주석 처리한 걸로 수정 필요
export const myGroupMemberAtom = atom((get) => {
    const groupDetail = get(groupDetailAtomValue);
    const member = get(memberAtom);

    if (!groupDetail || !member) {
        return null;
    }

    return (
        groupDetail.members.find(
            (groupMember) =>
                groupMember.memberId === member.id,
        ) ?? null
    );
});

// export const myGroupMemberAtom = atom((get) => {
//     const groupDetail = get(groupDetailAtomValue);
//
//     if (!groupDetail) {
//         return null;
//     }
//
//     return (
//         groupDetail.members.find((groupMember) => groupMember.isMe) ?? null
//     );
// });

export const myGroupRoleAtom = atom((get) => {
    return get(myGroupMemberAtom)?.role ?? null;
});

export const isGroupOwnerAtom = atom(
    (get) => get(myGroupRoleAtom) === "OWNER",
);

export const isGroupMemberAtom = atom(
    (get) => get(myGroupRoleAtom) === "MEMBER",
);