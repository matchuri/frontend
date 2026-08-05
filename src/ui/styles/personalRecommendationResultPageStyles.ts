export const personalRecommendationResultPageStyles = {
    container:
        "min-h-screen bg-[#fbf9f9] px-12 py-10",
    backButton:
        "flex h-10 w-10 items-center cursor-pointer justify-center rounded-full text-zinc-800 transition hover:bg-zinc-100",
    title:
        "mt-8 text-4xl font-semibold text-zinc-950",
    closedMessage:
        "mt-4 text-base font-semibold text-blue-600",
    summaryCard:
        "mt-16 rounded-[32px] bg-white px-10 py-8 shadow-sm",
    summaryTitle:
        "text-xl font-bold text-zinc-950",
    keywordGroup:
        "mt-7 flex flex-wrap gap-5",
    keywordChip:
        "rounded-full border border-blue-400 bg-blue-100 px-8 py-3 text-base font-semibold text-zinc-800",
    emptyText:
        "text-sm font-medium text-zinc-500",
    cardGrid:
        "mt-16 grid grid-cols-3 gap-8",
    selectedMenuSection:
        "mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5",
    selectedMenuLabel:
        "text-sm font-medium text-emerald-700",
    selectedMenuName:
        "mt-1 text-3xl font-bold text-gray-900",
    restaurantSection:
        "mt-6 rounded-2xl border border-gray-200 bg-white p-6",
    restaurantHeader:
        "flex items-start justify-between gap-4",
    restaurantTitle:
        "text-xl font-bold text-gray-900",
    restaurantDescription:
        "mt-1 text-sm text-gray-500",
    restaurantRadius:
        "shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
    restaurantLayout:
        "mt-5 grid min-h-[520px] grid-cols-[360px_minmax(0,1fr)] overflow-hidden rounded-2xl border border-gray-200",
    restaurantList:
        "max-h-[520px] overflow-y-auto border-r border-gray-200 bg-white p-4",
    restaurantMapArea:
        "min-h-[520px] bg-gray-100",
    restaurantMap:
        "h-full min-h-[520px] w-full",
    messageBox:
        "mt-5 rounded-xl bg-gray-50 px-5 py-4 text-sm text-gray-600",
    errorBox:
        "mt-5 rounded-xl bg-red-50 px-5 py-4 text-sm text-red-600",
} as const;