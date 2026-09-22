export const preferenceModalStyles = {
    overlay: "absolute inset-0 z-[80] flex items-end bg-black/20 backdrop-blur-[2px]",
    modal:
        "flex h-[85dvh] max-h-[760px] w-full flex-col overflow-hidden rounded-t-[28px] bg-white " +
        "shadow-[0_-8px_30px_rgba(0,0,0,0.12)]",
    header: "flex shrink-0 items-start justify-between border-b border-gray-100 bg-white px-6 pb-5 pt-6",
    title: "text-[20px] font-bold text-gray-900",
    headerDescription: "mt-1.5 max-w-[320px] text-[13px] leading-5 text-gray-500",
    closeButton:
        "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
    content: "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain px-5 py-5",
    preferenceCard: "rounded-[20px] border border-gray-100 bg-white px-5 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.035)]",
    sectionHeader: "mb-6 flex items-start justify-between gap-3",
    sectionTitle: "text-[16px] font-bold text-gray-900",
    sectionDescription: "mt-1 text-[12px] leading-5 text-gray-400",
    requiredBadge: "shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-[#FB6F00]",
    optionalBadge: "shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500",
    sectionGroup: "flex flex-col gap-7",
    footer: "shrink-0 border-t border-gray-100 bg-white px-5 pb-6 pt-4",
    saveButton:
        "h-14 w-full cursor-pointer rounded-2xl bg-[#FB6F00] text-[16px] font-semibold text-white shadow-[0_6px_16px_rgba(251,111,0,0.18)] transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:opacity-100",
    stateContainer: "flex min-h-[320px] flex-1 flex-col items-center justify-center gap-3 px-5 text-center",
    stateText: "text-[14px] text-gray-500",
    errorText: "text-[14px] leading-6 text-red-500",
    loadingSpinner: "h-7 w-7 animate-spin rounded-full border-[3px] border-orange-100 border-t-[#FB6F00]",
} as const;