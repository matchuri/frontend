export const personalRecommendationPageStyles = {
    container: "min-h-screen bg-[#faf8f8] px-10 py-20",
    content: "mx-auto flex w-full max-w-6xl flex-col gap-10",
    header: "flex flex-col gap-2",
    title: "text-4xl font-medium text-zinc-900",
    description: "text-lg font-medium text-[#17315c]",
    layout: "grid grid-cols-[1fr_340px] gap-6",
    mainColumn: "flex flex-col gap-6",
    cardGrid: "grid grid-cols-2 gap-6",
    heroCard:
        "flex min-h-[300px] flex-col justify-between rounded-[28px] bg-[#fff0e8] px-14 py-12 shadow-md",
    heroTitle: "text-3xl font-semibold text-zinc-950",
    heroDescription: "mt-3 text-base font-medium text-zinc-900",
    primaryButton:
        "h-16 w-[300px] rounded-full bg-black text-base font-semibold text-white shadow-md transition hover:bg-zinc-800",
    locationCard:
        "flex min-h-[300px] flex-col justify-between rounded-[28px] bg-[#e9e9e9] px-10 py-9 shadow-md",
    preferenceCard:
        "flex min-h-[300px] flex-col justify-between rounded-[28px] bg-[#ffdda3] px-10 py-9 shadow-md",
    iconBox:
        "flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-500",
    preferenceIconBox:
        "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c7efc9] text-zinc-700",
    cardTextGroup: "flex flex-col gap-2",
    cardTitle: "text-base font-semibold text-zinc-950",
    cardDescription: "text-base font-medium text-zinc-600",
    smallButton:
        "h-12 w-[180px] rounded-full bg-black text-base font-semibold text-white transition hover:bg-zinc-800",
    historyPanel:
        "flex min-h-[630px] rounded-[32px] border border-zinc-200 bg-white px-8 py-10 shadow-sm",
    emptyHistory:
        "flex flex-1 flex-col items-center justify-center gap-4 text-base font-medium text-zinc-400",
    emptyIconBox:
        "flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf1fb] text-[#b5c4d7]",
    historyList: "flex w-full flex-col gap-3",
    historyItem:
        "flex items-center justify-between rounded-2xl bg-zinc-100 px-5 py-4 text-left text-zinc-500 transition hover:bg-zinc-200",
    historyDetailButton:
        "text-sm font-semibold text-orange-500",
} as const;