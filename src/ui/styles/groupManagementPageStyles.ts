export const groupManagementPageStyles = {
    container: "min-h-full bg-white",

    // Header
    header:
        "sticky top-0 z-50 flex h-[64px] items-center justify-center border-b border-gray-100 bg-white px-5",
    title: "text-[18px] font-bold text-gray-900",
    notificationButtonWrapper: "absolute right-5 top-1/2 -translate-y-1/2",

    // Content
    content: "flex flex-col px-5 pb-8 pt-7",

    // Create
    createButton:
        "flex shrink-0 cursor-pointer items-center gap-1 rounded-full " +
        "bg-[#FB6F00] px-2.5 py-1.5 text-[11px] font-semibold text-white " +
        "transition-colors duration-200 hover:bg-[#E96500]",

    // Group section
    groupSection: "flex flex-col",
    sectionHeader: "mb-4 flex items-center justify-between",
    sectionTitle: "text-[16px] font-bold tracking-[-0.02em] text-gray-900",
    groupList: "flex flex-col gap-3",

    // Group card
    groupCard:
        "flex w-full cursor-pointer items-center gap-3 rounded-[20px] border border-gray-200 " +
        "bg-white px-4 py-4 text-left shadow-[0_2px_10px_rgba(0,0,0,0.035)] " +
        "transition-all duration-200 hover:border-orange-200 hover:shadow-[0_4px_14px_rgba(0,0,0,0.055)] " +
        "active:scale-[0.99]",
    groupInfo: "min-w-0 flex-1",
    groupName: "truncate text-[14px] font-bold text-gray-900",
    groupMeta: "mt-2 flex items-center gap-1.5 text-[12px] text-gray-400",
    groupChevron: "shrink-0 text-gray-300",

    // Status
    statusBadge: "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold",
    preparingBadge: "bg-blue-50 text-blue-600",
    openBadge: "bg-orange-50 text-[#FB6F00]",
    finalizedBadge: "bg-green-50 text-green-600",

    // Empty
    emptyGroupBox:
        "flex flex-col items-center justify-center rounded-[20px] bg-gray-50 px-5 py-10 text-center",
    emptyIcon:
        "flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-300 shadow-sm",
    emptyTitle: "mt-4 text-[15px] font-semibold text-gray-700",
    emptyDescription: "mt-2 text-[12px] leading-5 text-gray-400",

    // State
    stateBox:
        "flex min-h-[140px] items-center justify-center rounded-[20px] bg-gray-50 px-5 text-[13px] text-gray-400",
    errorBox:
        "flex min-h-[140px] items-center justify-center rounded-[20px] bg-red-50 px-5 text-center text-[13px] text-red-500",
} as const;