export const guestRecommendationRestaurantPageStyles = {
    page: "relative h-full overflow-hidden bg-[#F8F8F8]",

    // Header
    header:
        "sticky top-0 z-40 relative flex h-[64px] items-center justify-between " +
        "border-b border-gray-100 bg-white px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-700 transition-all duration-200 " +
        "hover:bg-[#FFF1E6] hover:text-[#FB6F00] active:scale-95",
    headerTitle: "absolute left-1/2 -translate-x-1/2 text-[18px] font-bold text-gray-900",
    headerSpacer: "h-10 w-10",

    // Map
    mapArea: "relative h-[calc(100dvh-64px)] w-full overflow-hidden bg-gray-100",
    map: "h-full w-full",
    recenterButton:
        "absolute bottom-[44dvh] right-4 z-20 flex h-11 w-11 cursor-pointer " +
        "items-center justify-center rounded-full border border-gray-200 " +
        "bg-white text-gray-700 shadow-[0_3px_12px_rgba(0,0,0,0.14)] " +
        "transition-all hover:bg-[#FFF8F2] hover:text-[#FB6F00] active:scale-95",

    // Content
    content:
        "absolute inset-x-0 bottom-0 z-30 flex " +
        "flex-col gap-4 overflow-hidden rounded-t-[28px] bg-white px-5 pb-5 pt-4 " +
        "shadow-[0_-8px_30px_rgba(0,0,0,0.10)]",

    sheetHandleButton:
        "mx-auto flex h-6 w-16 shrink-0 touch-none select-none cursor-grab items-center " +
        "justify-center rounded-full transition-colors hover:bg-gray-50 active:cursor-grabbing",
    sheetHandle: "h-1 w-10 rounded-full bg-gray-200",
    searchSummary: "flex shrink-0 items-start justify-between gap-4",
    eyebrow: "text-[11px] font-bold tracking-[0.06em] text-[#FB6F00]",
    title: "mt-1 text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    address: "mt-1.5 line-clamp-1 text-[12px] text-gray-400",
    radiusBadge:
        "shrink-0 rounded-full bg-[#FFF1E6] px-3 py-1.5 " +
        "text-[11px] font-semibold text-[#FB6F00]",
    expandedText:
        "shrink-0 rounded-xl bg-[#FFF8F2] px-4 py-3 text-[12px] leading-5 text-gray-500",

    // State
    stateBox:
        "flex min-h-[120px] items-center justify-center rounded-[18px] " +
        "bg-gray-50 px-5 text-center text-[13px] text-gray-500",
    errorBox:
        "flex min-h-[120px] items-center justify-center rounded-[18px] " +
        "bg-red-50 px-5 text-center text-[13px] text-red-500",

    // Restaurant list
    restaurantList:
        "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain pb-3 " +
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",

    restaurantCard:
        "cursor-pointer rounded-[18px] border border-gray-100 bg-white p-4 " +
        "shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 " +
        "hover:border-orange-200 hover:shadow-[0_3px_10px_rgba(251,111,0,0.08)]",

    selectedRestaurantCard:
        "cursor-pointer rounded-[18px] border border-[#FB6F00] bg-[#FFFCF9] p-4 " +
        "shadow-[0_3px_12px_rgba(251,111,0,0.10)]",

    restaurantTop: "flex items-start justify-between gap-3",
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
} as const;