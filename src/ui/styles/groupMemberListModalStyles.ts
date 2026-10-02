export const groupMemberListModalStyles = {
    overlay:
        "absolute inset-0 z-[80] flex items-center justify-center bg-black/35 px-5 backdrop-blur-[1px]",
    modal:
        "flex max-h-[70vh] w-full flex-col overflow-hidden rounded-[22px] bg-white " +
        "shadow-[0_16px_40px_rgba(0,0,0,0.18)]",

    // Header
    header:
        "flex shrink-0 items-start justify-between border-b border-gray-100 px-5 py-5",
    title: "text-[18px] font-bold tracking-[-0.03em] text-gray-900",
    memberCount: "mt-1 text-[12px] text-gray-400",
    closeButton:
        "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-400 " +
        "transition-colors hover:bg-gray-50 hover:text-gray-700",

    // Members
    memberList: "overflow-y-auto px-5 py-2",
    memberItem: "flex min-h-[68px] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",
    memberAvatar:
        "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full " +
        "bg-orange-100 text-gray-400",
    memberImage: "object-cover",
    memberInfo: "min-w-0 flex-1",
    memberNicknameRow: "flex min-w-0 items-center gap-1.5",
    memberNickname: "min-w-0 truncate text-[14px] font-semibold text-gray-900",
    meBadge: "rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-500",
    ownerBadge:
        "flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 " +
        "text-[10px] font-semibold text-[#FB6F00]",
} as const;