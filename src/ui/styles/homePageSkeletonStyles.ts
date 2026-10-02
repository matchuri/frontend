export const homePageSkeletonStyles = {
    page: "min-h-full bg-white",

    header: "flex items-center justify-between px-5 pb-5 pt-6",
    userSection: "flex min-w-0 items-center gap-3",
    profileImage: "h-11 w-11 shrink-0 rounded-full bg-gray-200",
    userText: "min-w-0",
    nickname: "h-4 w-28 rounded bg-gray-200",
    address: "mt-2 h-3 w-40 rounded bg-gray-100",
    notificationButton: "h-9 w-9 rounded-full bg-gray-200",

    content: "flex flex-col gap-7 px-5 pb-8",

    hero: "h-[230px] w-full rounded-[28px] bg-gray-200",

    section: "flex flex-col gap-3",
    sectionHeader: "flex items-center justify-between",
    tasteTitle: "h-6 w-28 rounded bg-gray-200",
    historyTitle: "h-6 w-36 rounded bg-gray-200",
    groupTitle: "h-6 w-28 rounded bg-gray-200",
    moreButton: "h-4 w-12 rounded bg-gray-100",

    tasteCard: "h-[82px] w-full rounded-2xl bg-gray-200",

    historyList: "flex gap-3 overflow-hidden",
    historyCard: "h-[132px] w-[218px] shrink-0 rounded-[20px] bg-gray-200",

    groupCard: "h-[92px] w-full rounded-2xl bg-gray-200",
} as const;