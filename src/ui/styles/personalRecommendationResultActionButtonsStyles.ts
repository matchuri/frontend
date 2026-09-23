export const personalRecommendationResultActionButtonsStyles = {
    container:
        "absolute bottom-0 left-0 right-0 z-40 flex items-center gap-3 " +
        "bg-white/80 px-5 pb-6 pt-4 backdrop-blur-md",
    retryRecommendationButton:
        "flex h-[52px] w-[116px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[16px] bg-white " +
        "text-[14px] font-semibold text-gray-600 " +
        "shadow-[0_4px_16px_rgba(15,23,42,0.10)] ring-1 ring-black/[0.05] " +
        "transition-all duration-200 hover:bg-gray-50 active:scale-[0.98] " +
        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none",
    completeSelectionButton:
        "h-[52px] min-w-0 flex-1 rounded-[16px] text-[14px] font-semibold transition-all duration-200",
    completeSelectionButtonEnabled:
        "cursor-pointer bg-[#FB6F00] text-white " +
        "shadow-[0_6px_18px_rgba(251,111,0,0.22)] hover:bg-[#E96500] active:scale-[0.98]",
    completeSelectionButtonDisabled:
        "cursor-not-allowed bg-gray-200 text-gray-400 shadow-[0_4px_14px_rgba(15,23,42,0.06)]",
} as const;