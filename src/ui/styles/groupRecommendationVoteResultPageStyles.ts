export const groupRecommendationVoteResultPageStyles = {
    container: "flex min-h-full flex-col bg-white",

    // Header
    header:
        "sticky top-0 z-30 grid h-[64px] shrink-0 grid-cols-[40px_1fr_40px] items-center " +
        "border-b border-gray-100 bg-white px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 " +
        "transition-colors hover:bg-gray-50 active:bg-gray-100",
    headerTitle: "text-center text-[16px] font-bold text-gray-900",
    headerSpacer: "h-10 w-10",

    // Content
    content: "flex flex-1 flex-col gap-7 px-5 pb-10 pt-6",
    stateContainer: "flex min-h-[50vh] flex-col items-center justify-center gap-4 px-5",
    stateText: "text-center text-[13px] leading-6 text-gray-500",
    errorText: "text-center text-[13px] leading-6 text-red-500",
    retryButton:
        "flex h-11 cursor-pointer items-center justify-center rounded-[14px] border border-gray-200 " +
        "bg-white px-5 text-[13px] font-semibold text-gray-600 hover:bg-gray-50",

    // Restaurant
    locationChangeButton:
        "inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl " +
        "bg-[#FB6F00] px-4 text-[12px] font-semibold text-white " +
        "transition-all duration-200 hover:bg-[#E96500] active:scale-[0.98]",
    messageBox: "rounded-[18px] bg-gray-50 px-5 py-5 text-center text-[13px] leading-6 text-gray-500",
    errorBox: "rounded-[18px] bg-red-50 px-5 py-5 text-center text-[13px] leading-6 text-red-500",
} as const;