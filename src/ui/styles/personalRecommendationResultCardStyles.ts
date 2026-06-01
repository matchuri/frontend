export const personalRecommendationResultCardStyles = {
    card:
        "overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg",
    selectedCard:
        "overflow-hidden rounded-3xl bg-white shadow-md ring-4 ring-blue-400 transition hover:-translate-y-1 hover:shadow-lg",
    imagePlaceholder:
        "relative flex h-[260px] items-center justify-center bg-zinc-200",
    matchBadge:
        "absolute left-5 top-5 rounded-full bg-orange-700 px-5 py-2 text-sm font-semibold text-white",
    selectedBadge:
        "absolute right-5 top-5 rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white",
    content:
        "flex flex-col gap-5 px-7 py-7",
    menuName:
        "text-lg font-semibold text-zinc-900",
    restaurantButton:
        "h-14 rounded-full bg-green-200 text-base font-semibold text-zinc-900 transition hover:bg-green-300",
} as const;