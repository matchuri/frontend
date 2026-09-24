export const groupRecommendationHistoryPageStyles = {
    page: "min-h-full bg-white",
    header: "grid h-[64px] grid-cols-[40px_1fr_40px] items-center border-b border-gray-100 px-5",

    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100",
    title: "text-center text-[16px] font-bold tracking-[-0.02em] text-gray-900",
    headerSpacer: "h-10 w-10",
    content: "px-5 pb-10 pt-6",

    stateContainer:
        "flex min-h-full flex-col items-center justify-center px-5",
    stateText: "text-[14px] text-gray-500",
    errorText: "text-center text-[14px] leading-6 text-red-500",
} as const;