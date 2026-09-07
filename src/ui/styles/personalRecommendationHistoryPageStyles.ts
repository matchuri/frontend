export const personalRecommendationHistoryPageStyles = {
    page: "min-h-full bg-white",

    header: "relative flex h-16 items-center border-b border-gray-100 px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 " +
        "transition-colors duration-200 hover:bg-gray-50",
    title: "absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-gray-900",

    content: "px-5 py-6",
    list: "flex flex-col gap-3",

    card:
        "flex min-h-[132px] w-full cursor-pointer items-center gap-4 " +
        "rounded-[20px] border border-gray-200 bg-white p-3 text-left " +
        "shadow-[0_2px_6px_rgba(0,0,0,0.035)] " +
        "transition-all duration-200 " +
        "hover:border-orange-200 " +
        "hover:shadow-[0_3px_7px_rgba(251,142,0,0.20)] " +
        "active:scale-[0.995]",

    thumbnailWrapper: "relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-[16px] bg-gray-50",
    thumbnail: "object-cover",
    thumbnailFallback: "flex h-full w-full items-center justify-center text-center text-xs leading-5 text-gray-400",

    cardContent: "flex min-w-0 flex-1 flex-col gap-2",
    cardTop: "flex w-full items-center justify-between gap-2",

    matchBadge:
        "shrink-0 rounded-full bg-orange-50 px-2.5 py-1 " +
        "text-[11px] font-semibold text-[#FB6F00]",

    date: "shrink-0 text-[11px] font-medium text-gray-400",

    menuName: "max-w-full truncate text-[16px] font-semibold tracking-[-0.02em] text-gray-900",

    tagList: "flex max-w-full flex-wrap gap-1.5",
    tag:
        "max-w-[84px] truncate rounded-full bg-[#FDDF82] " +
        "px-2.5 py-1 text-[11px] font-medium text-gray-700",
    moreTag:
        "shrink-0 rounded-full bg-[#FEECB3] px-2.5 py-1 " +
        "text-[11px] font-semibold text-[#FB6F00]",

    failedText: "text-sm font-medium text-gray-500",

    empty:
        "flex min-h-[180px] items-center justify-center rounded-[20px] " +
        "border border-gray-200 bg-white text-sm text-gray-400",

    stateContainer: "flex min-h-full flex-col items-center justify-center gap-4 px-5",
    stateText: "text-sm text-gray-500",
    errorText: "text-center text-sm text-red-500",
    retryButton:
        "cursor-pointer rounded-xl bg-[#FB6F00] px-4 py-2.5 " +
        "text-sm font-semibold text-white",
} as const;