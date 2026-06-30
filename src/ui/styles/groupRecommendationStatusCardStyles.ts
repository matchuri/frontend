export const groupRecommendationStatusCardStyles = {
    openCard: "mt-6 rounded-[28px] border border-green-300 bg-green-100 px-8 py-7",
    finalizedCard: "mt-6 rounded-[28px] border border-sky-300 bg-sky-100 px-8 py-7",

    cardHeader: "flex items-start justify-between gap-6",
    cardTitle: "text-base font-bold text-zinc-900",
    cardDescription: "mt-2 text-sm font-medium leading-6 text-slate-700",
    percentText: "shrink-0 text-sm font-bold text-zinc-900",

    progressTrack: "mt-6 h-4 rounded-full bg-white",
    openProgressFill: "h-full rounded-full bg-emerald-700",

    mapButton:
        "mt-6 h-12 w-full cursor-pointer rounded-full bg-sky-500 text-base font-bold text-white transition-colors hover:bg-sky-600 active:bg-sky-700",
} as const;