export const groupManagementPageStyles = {
    container: "min-h-screen bg-white",
    content: "mx-auto flex w-full max-w-[1180px] flex-col px-6 py-20",

    header: "flex items-start justify-between",
    title: "text-4xl font-bold text-zinc-900",
    description: "mt-3 text-lg text-slate-700",
    createButton:
        "flex items-center gap-2 rounded-full bg-blue-300 px-8 py-3 text-lg font-bold text-zinc-900",

    section: "mt-12",
    sectionHeader: "mb-6 flex items-center justify-between",
    sectionTitleWrapper: "flex items-center gap-3",
    sectionTitle: "text-2xl font-bold text-zinc-900",
    inviteCount:
        "flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-800 px-2 text-sm font-bold text-white",
    viewAllButton: "text-base font-semibold text-slate-700",

    inviteList: "grid grid-cols-2 gap-10",
    inviteCard:
        "flex items-center justify-between rounded-[28px] border border-slate-300 bg-slate-100 px-6 py-6",
    inviteInfo: "flex items-center gap-4",
    avatar:
        "flex h-14 w-14 items-center justify-center rounded-full bg-slate-300 text-slate-500",
    inviteTitle: "text-base font-bold text-zinc-900",
    inviteGroupName: "mt-1 text-sm text-slate-600",
    inviteActions: "flex gap-2",
    acceptButton:
        "rounded-full bg-blue-800 px-5 py-2 text-sm font-bold text-white",
    declineButton:
        "rounded-full border border-blue-800 px-5 py-2 text-sm font-bold text-blue-800",

    emptyInviteBox:
        "flex h-36 items-center justify-center rounded-[24px] border border-zinc-300 bg-white text-lg text-zinc-500",

    groupList: "flex flex-col gap-6",
    groupCard:
        "flex items-center justify-between rounded-[32px] bg-[#F4F2F2] px-12 py-7",
    groupInfo: "flex flex-col gap-4",
    groupTop: "flex items-center gap-6",
    groupName: "text-2xl font-bold text-zinc-900",
    ownerBadge:
        "rounded-full bg-yellow-300 px-7 py-2 text-sm font-semibold text-yellow-800",
    statusBadge: "rounded-full px-7 py-2 text-sm font-semibold",
    openBadge: "bg-green-500 text-green-950",
    closedBadge: "bg-zinc-300 text-zinc-500",
    preparingBadge: "bg-blue-100 text-blue-700",
    groupMeta: "flex items-center gap-8 text-lg text-zinc-700",
    arrowButton:
        "flex h-12 w-12 items-center justify-center rounded-full bg-zinc-300 text-2xl font-bold text-zinc-900",

    emptyGroupBox:
        "flex h-80 items-center justify-center rounded-[24px] border border-zinc-300 bg-white px-4 text-center text-lg leading-8 text-zinc-500",
} as const;