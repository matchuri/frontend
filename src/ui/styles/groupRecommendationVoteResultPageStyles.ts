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
    restaurantSection: "flex flex-col gap-4",
    restaurantHeader: "flex flex-col gap-2",
    restaurantTitle: "text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    restaurantLocationRow: "flex items-center justify-between gap-3",
    restaurantDescription: "flex min-w-0 flex-1 items-center gap-1 text-[12px] leading-5 text-gray-500",
    restaurantRadius:
        "shrink-0 rounded-full bg-orange-50 px-2.5 py-1.5 text-[11px] font-semibold text-[#FB6F00]",
    restaurantLayout: "flex flex-col gap-4",
    restaurantMapPlaceholder:
        "flex h-[300px] flex-col items-center justify-center rounded-[20px] border border-dashed " +
        "border-gray-200 bg-gray-50 px-5 text-center",
    placeholderIcon:
        "mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#FB6F00] shadow-sm",
    placeholderTitle: "text-[14px] font-semibold text-gray-700",
    placeholderDescription: "mt-2 text-[12px] leading-5 text-gray-400",
    restaurantList: "flex flex-col gap-3",
    restaurantEmpty:
        "flex min-h-[140px] flex-col items-center justify-center rounded-[18px] border border-gray-100 " +
        "bg-white px-5 py-6 text-center text-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
} as const;