export const groupManagementPageStyles = {
    container: "h-screen overflow-hidden bg-white",
    layout: "flex h-full",
    mainContent: "min-w-0 flex-1 overflow-hidden",
    content: "flex h-full flex-col px-14 py-20",
    header: "shrink-0 flex items-start justify-between",
    title: "text-4xl font-bold text-zinc-900",
    description: "mt-3 text-lg text-slate-700",
    createButton:
        "flex cursor-pointer items-center gap-2 rounded-full bg-blue-300 px-8 py-3 text-lg font-bold text-zinc-900 transition-colors hover:bg-blue-400 active:bg-blue-500",

    section: "mt-10 shrink-0",
    sectionHeader: "mb-6 flex items-center justify-between",
    sectionTitleWrapper: "flex items-center gap-3",
    sectionTitle: "text-2xl font-bold text-zinc-900",

    inviteCount:
        "flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-800 px-2 text-sm font-bold text-white",

    viewAllButton:
        "cursor-pointer text-base font-semibold text-slate-700 transition-colors hover:text-slate-900 active:text-slate-950",

    inviteList: "grid grid-cols-2 gap-10",

    emptyInviteBox:
        "flex h-36 items-center justify-center rounded-[24px] border border-zinc-300 bg-white text-lg text-zinc-500",

    groupSection: "mt-10 flex min-h-0 flex-1 flex-col",

    groupList:
        "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pr-2",

    groupCard:
        "flex cursor-pointer items-center justify-between rounded-[32px] bg-[#F4F2F2] px-12 py-7 transition-colors hover:bg-zinc-200 active:bg-zinc-300",

    selectedGroupCard:
        "flex cursor-pointer items-center justify-between rounded-[32px] border-2 border-blue-400 bg-white px-12 py-7 shadow-md transition-colors hover:bg-blue-50 active:bg-blue-100",

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
        "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-300 text-2xl font-bold text-zinc-900 transition-colors hover:bg-zinc-400 active:bg-zinc-500",

    emptyGroupBox:
        "flex min-h-0 flex-1 items-center justify-center rounded-[24px] border border-zinc-300 bg-white px-4 text-center text-lg leading-8 text-zinc-500",

    detailLoadingPanel: "h-full w-[540px] shrink-0 overflow-y-auto border-l border-zinc-200 bg-white",
    detailMessageBox: "p-10 text-sm font-medium text-slate-500",
    detailErrorBox: "p-10 text-sm font-medium text-red-500",
    realtimeNotice: "mb-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700",
} as const;