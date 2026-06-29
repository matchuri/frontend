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
} as const;