export const personalRecommendationResultActionButtonsStyles = {
    container: "mt-14 flex justify-end gap-4",
    retryRecommendationButton:
        "h-16 w-[150px] rounded-full bg-orange-200 text-base font-semibold text-orange-600 shadow-sm transition cursor-pointer hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-60",
    completeSelectionButton:
        "h-16 w-[150px] rounded-full text-base font-semibold shadow-sm transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
    completeSelectionButtonDisabled:
        "bg-zinc-300 text-zinc-800 hover:bg-zinc-400",
    completeSelectionButtonEnabled:
        "bg-green-500 text-white hover:bg-green-600",
} as const;