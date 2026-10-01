export const groupManagementPageSkeletonStyles = {
    page: "min-h-full bg-white",

    // Header
    header:
        "sticky top-0 z-50 flex h-[64px] items-center justify-center border-b border-gray-100 bg-white px-5",
    title: "h-6 w-10 rounded bg-gray-200",
    notificationButton: "absolute right-5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-gray-200",

    // Content
    content: "flex flex-col px-5 pb-8 pt-7",

    // Group section
    groupSection: "flex flex-col",
    sectionHeader: "mb-4 flex items-center justify-between",
    sectionTitle: "h-5 w-14 rounded bg-gray-200",
    createButton: "h-7 w-[78px] rounded-full bg-gray-200",
    groupList: "flex flex-col gap-3",

    // Group card
    groupCard:
        "flex w-full items-center gap-3 rounded-[20px] border border-gray-200 bg-white px-4 py-4",
    groupInfo: "min-w-0 flex-1",
    groupName: "h-5 w-28 rounded bg-gray-200",
    groupMeta: "mt-2 h-4 w-16 rounded bg-gray-100",
    statusBadge: "h-6 w-[68px] shrink-0 rounded-full bg-gray-200",
    chevron: "h-5 w-5 shrink-0 rounded bg-gray-100",
} as const;