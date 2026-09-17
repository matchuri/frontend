export const personalRecommendationResultPageStyles = {
    page: "min-h-full bg-white",
    container: "min-h-full bg-white",

    // Header
    header:
        "sticky top-0 z-30 relative flex h-[64px] items-center justify-between " +
        "border-b border-gray-100 bg-white px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-700 transition-all duration-200 " +
        "hover:bg-[#FFF1E6] hover:text-[#FB6F00] active:scale-95",
    headerTitle: "absolute left-1/2 -translate-x-1/2 text-[18px] font-bold text-gray-900",
    headerSpacer: "h-10 w-10",

    // Content
    content: "flex flex-col gap-7 px-5 pb-28 pt-6",
    selectedContent: "flex flex-col gap-7 px-5 pb-10 pt-6",

    // Intro
    intro:
        "flex items-start gap-3.5 rounded-[20px] border border-[#FFE7D3] " +
        "bg-[#FFF8F2] px-5 py-4.5",
    introIcon:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " +
        "bg-white text-[#FB6F00] shadow-[0_3px_10px_rgba(251,111,0,0.08)]",
    introTitle: "text-[17px] font-bold tracking-[-0.02em] text-gray-900",
    introDescription: "mt-1 text-[12px] leading-5 text-gray-500",

    // Taste profile
    summaryCard:
        "rounded-[20px] border border-gray-100 bg-white px-5 py-5 " +
        "shadow-[0_2px_10px_rgba(0,0,0,0.035)]",
    summaryHeader: "mb-4",
    summaryEyebrow: "text-[10px] font-bold tracking-[0.14em] text-[#FB6F00]",
    summaryTitle: "mt-1 text-[17px] font-bold tracking-[-0.02em] text-gray-900",
    keywordGroup: "flex flex-wrap gap-2",
    keywordChip:
        "rounded-full bg-orange-50 px-3 py-1.5 text-[12px] font-semibold text-[#FB6F00]",
    emptyText: "text-[12px] text-gray-400",

    // Result
    resultSection: "flex flex-col gap-4",
    resultHeader: "flex items-end justify-between px-1",
    resultEyebrow: "text-[10px] font-bold tracking-[0.14em] text-[#FB6F00]",
    resultTitle: "mt-1 text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    selectionGuide: "pb-0.5 text-[11px] font-medium text-gray-400",
    cardList: "flex flex-col gap-4",
    guideText: "px-2 text-center text-[11px] leading-5 text-gray-400",

    // Completion
    completionIntro:
        "flex items-center gap-3.5 rounded-[20px] bg-orange-50 px-5 py-5",
    completionIcon:
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FB6F00] text-white",
    completionTitle: "text-[17px] font-bold tracking-[-0.02em] text-gray-900",
    completionDescription: "mt-1 text-[12px] leading-5 text-gray-500",

    // Selected menu
    selectedMenuSection: "flex flex-col",
    sectionEyebrow: "text-[10px] font-bold tracking-[0.14em] text-[#FB6F00]",
    sectionTitle: "mt-1 text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    selectedMenuCard:
        "mt-4 overflow-hidden rounded-[22px] border border-gray-100 bg-white " +
        "shadow-[0_3px_12px_rgba(0,0,0,0.045)]",
    selectedMenuImageWrapper: "relative h-[210px] w-full overflow-hidden bg-gray-100",
    selectedMenuImage: "object-cover",
    selectedMenuImageFallback:
        "flex h-full w-full items-center justify-center text-[12px] font-medium text-gray-400",
    selectedMenuInfo: "p-5",
    selectedMenuBadge:
        "inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-[#FB6F00]",
    selectedMenuName: "mt-3 text-[22px] font-bold tracking-[-0.03em] text-gray-900",
    selectedMenuMatch: "mt-1.5 block text-[12px] font-medium text-gray-500",

    // Location
    locationSection:
        "flex items-start gap-3.5 rounded-[20px] border border-gray-100 bg-gray-50 px-5 py-4.5",
    locationIcon:
        "mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#FB6F00] shadow-sm",
    locationContent: "min-w-0 flex flex-1 flex-col",
    locationLabel: "text-[11px] font-medium text-gray-400",
    locationAddress: "mt-1 truncate text-[14px] font-semibold text-gray-800",
    locationRadius: "mt-1 text-[12px] text-gray-500",

    // Restaurant
    restaurantSection: "flex flex-col gap-4",
    restaurantHeader: "flex flex-col gap-2",
    restaurantTitle: "text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    restaurantLocationRow: "flex items-center justify-between gap-3",
    restaurantDescription: "min-w-0 flex-1 truncate text-[12px] leading-5 text-gray-500",
    expandedSearchText:
        "mt-2 rounded-[14px] bg-[#FFF8F2] px-4 py-3 " +
        "text-[12px] leading-5 text-gray-500",
    restaurantRadius:
        "shrink-0 rounded-full bg-orange-50 px-2.5 py-1.5 text-[11px] font-semibold text-[#FB6F00]",
    restaurantLayout: "flex flex-col gap-4",
    restaurantList:
       "flex max-h-[360px] flex-col gap-3 overflow-y-auto overscroll-contain pb-1 pr-1 " +
       "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    restaurantCard:
        "shrink-0 cursor-pointer rounded-[18px] border border-gray-100 bg-white p-4 " +
        "shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 " +
        "hover:border-orange-200 hover:shadow-[0_3px_10px_rgba(251,111,0,0.08)]",
    selectedRestaurantCard:
        "shrink-0 cursor-pointer rounded-[18px] border border-[#FB6F00] bg-[#FFFCF9] p-4 " +
        "shadow-[0_3px_12px_rgba(251,111,0,0.10)]",
    restaurantCardTop: "flex items-start justify-between gap-3",
    restaurantInfo: "flex min-w-0 flex-1 items-center gap-2",
    restaurantName: "truncate text-[16px] font-bold tracking-[-0.02em] text-gray-900",
    restaurantDistance:
        "shrink-0 rounded-full bg-[#FFF1E6] px-2.5 py-1 " +
        "text-[11px] font-semibold text-[#FB6F00]",
    restaurantAddress:
        "mt-3 flex items-center gap-1.5 text-[12px] leading-5 text-gray-400",
    placeLink:
        "inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#FB6F00] " +
        "px-3 py-2 text-[11px] font-semibold text-white " +
        "transition-opacity hover:opacity-90 active:scale-[0.98]",

    restaurantMapArea:
        "h-[300px] overflow-hidden rounded-[20px] border border-gray-100",
    restaurantMap: "h-full w-full",

    messageBox:
        "rounded-[18px] bg-gray-50 px-5 py-5 text-center text-[13px] leading-6 text-gray-500",
    errorBox:
        "rounded-[18px] bg-red-50 px-5 py-5 text-center text-[13px] leading-6 text-red-500",
    emptyRestaurantBox:
        "flex flex-col items-center gap-4 rounded-[18px] bg-gray-50 px-5 py-6 text-center " +
        "text-[13px] leading-6 text-gray-500",
    changeLocationButton:
        "cursor-pointer rounded-xl bg-[#FB6F00] px-4 py-2.5 text-[13px] font-semibold text-white " +
        "transition-all hover:bg-[#E96500] active:scale-[0.99]",

    closedMessage: "px-5 py-4 text-center text-[13px] text-gray-500",
} as const;