export const recommendationRestaurantPageStyles = {
    container: "flex h-screen overflow-hidden bg-white",

    listSection: "flex w-[520px] shrink-0 flex-col overflow-y-auto bg-[#FAF9F9] px-14 py-10",

    backButton:
        "mb-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-zinc-100 active:bg-zinc-200",

    titleSection: "mb-12",
    title: "text-4xl font-bold text-zinc-900",

    selectedMenuText: "mt-3 text-lg font-semibold text-orange-500",

    restaurantList: "flex flex-col gap-5 pb-10",
    restaurantCard: "flex items-center gap-5 rounded-[28px] bg-white px-6 py-5 shadow-sm",
    restaurantThumbnail: "h-14 w-14 shrink-0 rounded-xl bg-zinc-200",
    restaurantInfo: "min-w-0 flex-1",
    restaurantName: "truncate text-base font-bold text-zinc-900",
    restaurantDistance: "mt-1 text-sm font-medium text-zinc-500",

    ratingBadge:
        "flex shrink-0 items-center gap-1 rounded-full bg-amber-200 px-3 py-1 text-sm font-bold text-zinc-900",

    mapArea: "relative min-w-0 flex-1 overflow-hidden bg-[#E9E7E2]",
    mapInfoBox:
        "absolute left-8 top-8 z-10 flex flex-col gap-1 rounded-2xl bg-white/90 px-5 py-4 text-sm font-semibold text-zinc-700 shadow-md",
    mockMarker: "absolute z-10 -translate-x-1/2 -translate-y-1/2 text-red-500",
} as const;