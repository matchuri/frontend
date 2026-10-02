export const guestRecommendationRestaurantSkeletonStyles = {
    page: "relative h-full overflow-hidden bg-[#F8F8F8]",

    header: "sticky top-0 z-40 relative flex h-[64px] items-center justify-between border-b border-gray-100 bg-white px-5",
    backButton: "h-10 w-10 rounded-full bg-gray-200",
    headerTitle: "absolute left-1/2 h-6 w-20 -translate-x-1/2 rounded bg-gray-200",
    headerSpacer: "h-10 w-10",

    map: "h-[calc(100dvh-64px)] w-full bg-gray-200",

    content:
        "absolute inset-x-0 bottom-0 z-30 flex h-[42dvh] flex-col gap-4 overflow-hidden rounded-t-[28px] bg-white px-5 pb-5 pt-4 shadow-[0_-8px_30px_rgba(0,0,0,0.10)]",

    sheetHandle: "mx-auto h-1 w-10 rounded-full bg-gray-200",

    summary: "flex items-start justify-between gap-4",
    summaryContent: "flex-1",
    eyebrow: "h-3 w-16 rounded bg-gray-200",
    title: "mt-2 h-6 w-36 rounded bg-gray-200",
    address: "mt-2 h-3 w-44 rounded bg-gray-100",
    radiusBadge: "h-7 w-14 shrink-0 rounded-full bg-gray-200",

    restaurantList: "flex min-h-0 flex-1 flex-col gap-3",
    restaurantCard: "h-[96px] w-full rounded-[18px] bg-gray-200",
} as const;