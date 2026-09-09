export const guestRecommendationResultPageStyles = {
    page: "min-h-full bg-white",

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
    content: "flex flex-col gap-7 px-5 pb-10 pt-6",

    // Intro
    intro:
        "flex items-start gap-3.5 rounded-[20px] border border-[#FFE7D3] " +
        "bg-[#FFF8F2] px-5 py-4.5",
    introIcon:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " +
        "bg-white text-[#FB6F00] shadow-[0_3px_10px_rgba(251,111,0,0.08)]",
    introTitle: "text-[17px] font-bold tracking-[-0.02em] text-gray-900",
    introDescription: "mt-1 text-[12px] leading-5 text-gray-500",

    // Result
    resultSection: "flex flex-col gap-4",
    resultHeader: "flex items-end justify-between px-1",
    resultEyebrow: "text-[10px] font-bold tracking-[0.14em] text-[#FB6F00]",
    resultTitle: "mt-1 text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    cardList: "flex flex-col gap-4",

    // Card
    card:
        "overflow-hidden rounded-[22px] border border-gray-100 bg-white " +
        "shadow-[0_3px_12px_rgba(0,0,0,0.045)]",

    imageWrapper: "relative h-[210px] w-full overflow-hidden bg-gray-100",
    menuImage: "object-cover",
    imageFallback:
        "flex h-full w-full items-center justify-center " +
        "text-[12px] font-medium text-gray-400",

    cardBadges: "absolute left-3 right-3 top-3 z-10 flex items-center justify-between",
    rankBadge:
        "inline-flex h-7 items-center rounded-full bg-white/90 px-3 " +
        "text-[11px] font-bold text-gray-600 shadow-sm backdrop-blur-sm",
    firstRankBadge:
        "inline-flex h-7 items-center rounded-full bg-[#FB6F00] px-3 " +
        "text-[11px] font-bold text-white shadow-sm",
    matchBadge:
        "rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold " +
        "text-[#FB6F00] shadow-sm backdrop-blur-sm",

    cardContent: "p-5",

    menuName: "text-[22px] font-bold tracking-[-0.03em] text-gray-900",

    restaurantButton:
        "mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-1.5 " +
        "rounded-xl bg-[#FB6F00] text-[13px] font-semibold text-white " +
        "shadow-[0_4px_12px_rgba(251,111,0,0.16)] transition-all duration-200 " +
        "hover:bg-[#E96500] active:scale-[0.99]",

    // Guide
    guideText: "px-2 text-center text-[11px] leading-5 text-gray-400",
} as const;