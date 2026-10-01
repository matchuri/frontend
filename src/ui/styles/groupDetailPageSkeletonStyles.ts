export const groupDetailPageSkeletonStyles = {
    // Content
    content: "flex flex-col gap-8 px-5 pb-10 pt-7",

    // Group
    groupSection: "flex flex-col",
    groupNameRow: "flex items-center gap-2",
    groupName: "h-7 w-40 rounded bg-gray-200",
    groupNameEditButton: "h-8 w-8 shrink-0 rounded-full bg-gray-100",

    // Location
    locationInfo: "mt-3 flex items-center gap-1.5",
    locationIcon: "h-[15px] w-[15px] shrink-0 rounded bg-gray-200",
    locationAddress: "h-4 w-44 rounded bg-gray-100",
    locationRadius: "h-4 w-10 shrink-0 rounded bg-gray-100",

    // Recommendation
    recommendationSection: "flex flex-col",
    recommendationButton: "h-[50px] w-full rounded-[16px] bg-gray-200",

    // Members
    memberSection: "flex flex-col",
    memberSectionHeader: "mb-4 flex items-center justify-between",
    memberTitleRow: "flex items-center gap-2",
    sectionTitle: "h-5 w-20 rounded bg-gray-200",
    memberCount: "h-5 w-8 rounded-full bg-gray-100",
    viewAllButton: "h-4 w-12 rounded bg-gray-100",
    memberList: "flex items-start gap-7 overflow-hidden",
    memberItem: "flex w-[64px] shrink-0 flex-col items-center",
    memberAvatar: "h-[56px] w-[56px] rounded-full bg-gray-200",
    memberNickname: "mt-2 h-3 w-12 rounded bg-gray-100",

    // History
    historySection: "flex flex-col",
    historyHeader: "mb-4 flex items-center justify-between",
    historyTitle: "h-5 w-36 rounded bg-gray-200",
    historyList: "flex flex-col gap-3",
    historyItem:
        "flex min-h-[76px] w-full items-center justify-between gap-3 rounded-[18px] " +
        "border border-gray-100 bg-white px-4 py-3",
    historyInfo: "min-w-0 flex-1",
    historyMenuName: "h-4 w-24 rounded bg-gray-200",
    historyDate: "mt-2 h-3 w-32 rounded bg-gray-100",
    historyButton: "h-7 w-24 shrink-0 rounded-lg bg-gray-100",
} as const;