export const groupRecommendationHistoryStyles = {
    section: "flex flex-col",
    header: "mb-4 flex items-center justify-between",
    title: "text-[16px] font-bold tracking-[-0.02em] text-gray-900",
    viewAllButton:
        "cursor-pointer text-[12px] font-medium text-gray-400 transition-colors hover:text-[#FB6F00]",

    list: "flex flex-col gap-3",
    item:
        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[18px] " +
        "border border-gray-100 bg-white px-4 py-4 text-left transition-colors " +
        "hover:border-orange-200 hover:bg-orange-50/30 active:bg-orange-50",
    info: "min-w-0 flex-1",
    menuName:
        "block overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold text-gray-900",
    endedAt: "mt-1.5 flex items-center gap-1 text-[11px] text-gray-400",
    mapButton: "flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-[#FB6F00]",

    stateBox:
        "flex min-h-[88px] items-center justify-center rounded-[18px] bg-gray-50 " +
        "px-4 text-center text-[12px] text-gray-400",
    errorBox:
        "flex min-h-[88px] items-center justify-center rounded-[18px] bg-red-50 " +
        "px-4 text-center text-[12px] text-red-500",
    emptyBox:
        "flex min-h-[88px] items-center justify-center rounded-[18px] bg-gray-50 " +
        "px-4 text-center text-[12px] text-gray-400",
} as const;