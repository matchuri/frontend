export const guestRecommendationResultSkeletonStyles = {
    page: "min-h-full bg-white",

    header:
        "sticky top-0 z-30 relative flex h-[64px] items-center justify-between border-b border-gray-100 bg-white px-5",
    backButton: "h-10 w-10 rounded-full bg-gray-200",
    headerTitle: "absolute left-1/2 h-6 w-28 -translate-x-1/2 rounded bg-gray-200",
    headerSpacer: "h-10 w-10",

    content: "flex flex-col gap-7 px-5 pb-10 pt-6",

    intro:
        "flex items-start gap-3.5 rounded-[20px] border border-gray-100 bg-gray-50 px-5 py-4.5",
    introIcon: "h-10 w-10 shrink-0 rounded-xl bg-gray-200",
    introContent: "flex-1",
    introTitle: "h-5 w-36 rounded bg-gray-200",
    introDescriptionFirst: "mt-2 h-3 w-full rounded bg-gray-200",
    introDescriptionSecond: "mt-1.5 h-3 w-4/5 rounded bg-gray-200",

    resultSection: "flex flex-col gap-4",
    resultHeader: "px-1",
    resultEyebrow: "h-3 w-16 rounded bg-gray-200",
    resultTitle: "mt-2 h-7 w-36 rounded bg-gray-200",

    cardList: "flex flex-col gap-4",
    card:
        "overflow-hidden rounded-[22px] border border-gray-100 bg-white shadow-[0_3px_12px_rgba(0,0,0,0.045)]",
    image: "h-[210px] w-full bg-gray-200",
    cardContent: "p-5",
    menuName: "h-7 w-28 rounded bg-gray-200",
    restaurantButton: "mt-5 h-12 w-full rounded-xl bg-gray-200",
} as const;