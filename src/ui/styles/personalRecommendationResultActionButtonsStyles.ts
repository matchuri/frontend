export const personalRecommendationResultActionButtonsStyles = {
    container: "mt-14 flex justify-end gap-4",
    retryRecommendationButton:
        "h-16 w-[150px] rounded-full bg-orange-100 text-base font-semibold text-orange-500 shadow-sm transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60",
    completeSelectionButton:
        "h-16 w-[150px] rounded-full bg-zinc-300 text-base font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-400 disabled:cursor-not-allowed disabled:opacity-60",
} as const;