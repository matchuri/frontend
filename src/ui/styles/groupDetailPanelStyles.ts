export const groupDetailPanelStyles = {
    panel: "h-full w-[540px] shrink-0 overflow-y-auto border-l border-zinc-200 bg-white",
    content: "flex min-h-full flex-col px-12 py-10",

    header: "flex items-center justify-between",
    backButton: "flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-700",
    moreButton: "flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-500",

    groupTitle: "mt-8 text-4xl font-bold text-zinc-900",
    address: "mt-4 flex items-center gap-2 text-base text-slate-600",

    recommendationButton: "mt-10 h-16 rounded-full bg-zinc-950 text-lg font-bold text-white",

    memberSection: "mt-8 rounded-[28px] border border-zinc-200 p-8",
    memberSectionHeader: "flex items-start justify-between",
    memberSectionTitle: "text-xl font-bold text-zinc-900",
    memberCountText: "mt-1 text-sm text-slate-500",
    memberInviteButton: "rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600",
    memberList: "mt-8 flex items-start gap-6",
    memberCard: "flex flex-col items-center gap-2",
    memberAvatar: "flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-500",
    memberNickname: "text-sm font-semibold text-zinc-900",

    ownerRoleBadge: "rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900",
    memberRoleBadge: "rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700",

    memberMoreButton:
        "flex h-16 w-16 flex-col items-center justify-center rounded-full border border-dashed border-zinc-300 text-xs text-slate-500",

    inviteCodeSection: "mt-8 flex items-center justify-between rounded-[28px] bg-blue-600 px-8 py-8 text-white",
    inviteCodeLabel: "text-sm text-blue-100",
    inviteCodeValue: "mt-2 block text-3xl font-bold",
    copyInviteCodeButton: "flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-600",

    activitySection: "mt-8 flex-1",
    emptyActivityBox:
        "flex h-full min-h-[180px] items-center justify-center rounded-[28px] border border-zinc-200 text-slate-400",
} as const;