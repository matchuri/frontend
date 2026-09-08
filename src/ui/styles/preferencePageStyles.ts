export const preferencePageStyles = {
    page: "min-h-full bg-[#FAFAFA]",
    header: "relative flex h-[64px] items-center justify-between border-b border-gray-100 bg-white px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100",
    title: "absolute left-1/2 -translate-x-1/2 text-[18px] font-bold text-gray-900",
    headerSpacer: "h-10 w-10",

    content: "flex flex-col gap-5 px-5 pb-10 pt-6",

    introSection: "flex items-center gap-4 rounded-[20px] bg-orange-100 px-5 py-5",
    introIcon: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#FB6F00] shadow-sm",
    introTitle: "text-[17px] font-bold text-gray-900",
    introDescription: "mt-1 text-[13px] leading-5 text-gray-500",

    preferenceCard: "rounded-[20px] border border-gray-100 bg-white px-5 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.035)]",

    sectionHeader: "mb-6 flex items-start justify-between gap-3",
    sectionTitle: "text-[17px] font-bold text-gray-900",
    sectionDescription: "mt-1 text-[12px] leading-5 text-gray-400",

    requiredBadge: "shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-[#FB6F00]",
    optionalBadge: "shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500",

    sectionGroup: "flex flex-col gap-7",

    saveButton:
        "mt-1 h-14 w-full cursor-pointer rounded-2xl bg-[#FB6F00] text-[16px] font-semibold text-white shadow-[0_6px_16px_rgba(251,111,0,0.18)] transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:opacity-100",

    stateContainer: "flex min-h-full items-center justify-center bg-white px-5",
    stateText: "text-[14px] text-gray-500",
    errorText: "text-center text-[14px] text-red-500",
} as const;