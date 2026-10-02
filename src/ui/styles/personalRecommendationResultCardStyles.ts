export const personalRecommendationResultCardStyles = {
    card:
        "cursor-pointer overflow-hidden rounded-[22px] border-2 border-gray-100 bg-white " +
        "shadow-[0_3px_12px_rgba(0,0,0,0.045)] transition-[border-color,box-shadow] duration-200 " +
        "hover:border-orange-200",
    selectedCard:
        "cursor-pointer overflow-hidden rounded-[22px] border-2 border-[#FB6F00] bg-white " +
        "shadow-[0_5px_18px_rgba(251,111,0,0.12)] transition-[border-color,box-shadow] duration-200",

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
    selectedBadge:
        "absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full " +
        "bg-[#FB6F00] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm",

    cardContent: "p-5",
    menuName: "text-[22px] font-bold tracking-[-0.03em] text-gray-900",
    restaurantButton:
        "mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-1.5 " +
        "rounded-xl bg-[#FB6F00] text-[13px] font-semibold text-white " +
        "shadow-[0_4px_12px_rgba(251,111,0,0.16)] transition-all duration-200 " +
        "hover:bg-[#E96500] active:scale-[0.99]",
} as const;