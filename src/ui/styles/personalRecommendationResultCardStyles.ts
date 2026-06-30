export const personalRecommendationResultCardStyles = {
    card: "overflow-hidden rounded-3xl cursor-pointer bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg",
    selectedCard:
        "overflow-hidden rounded-3xl bg-white shadow-md ring-4 ring-blue-400 transition hover:-translate-y-1 hover:shadow-lg",
    imagePlaceholder:
        "relative flex h-56 items-center justify-center overflow-hidden bg-zinc-100",

    matchBadge:
        "absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-blue-600",
    selectedBadge:
        "absolute right-4 top-4 rounded-full bg-blue-500 px-4 py-2 text-sm font-bold text-white",

    menuImage: "object-cover",
    imageFallbackText: "text-sm font-semibold text-zinc-400",

    content: "px-7 py-6",
    menuName: "text-2xl font-bold text-zinc-950",
    restaurantButton:
        "mt-6 h-14 rounded-full cursor-pointer bg-zinc-950 px-8 text-base font-bold text-white transition hover:bg-zinc-800",
} as const;