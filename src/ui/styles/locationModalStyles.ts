export const locationModalStyles = {
    overlay: "absolute inset-0 z-[100] flex items-end bg-black/20 backdrop-blur-[2px]",
    modal:
        "flex h-[85dvh] max-h-[760px] w-full flex-col overflow-hidden rounded-t-[28px] bg-white " +
        "shadow-[0_-8px_30px_rgba(0,0,0,0.12)]",
    header: "flex shrink-0 items-start justify-between border-b border-gray-100 bg-white px-6 pb-5 pt-6",
    title: "text-[20px] font-bold text-gray-900",
    description: "mt-1.5 max-w-[320px] text-[13px] leading-5 text-gray-500",
    closeButton:
        "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
    content: "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain px-5 py-5",

    // Group
    groupNameSection: "rounded-[20px] border border-gray-100 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.035)]",
    groupNameInput:
        "h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 " +
        "text-[14px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 " +
        "focus:border-[#FB6F00] focus:bg-white disabled:cursor-not-allowed disabled:opacity-50",

    // Location
    locationSection: "rounded-[20px] border border-gray-100 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.035)]",
    sectionHeader: "mb-4",
    sectionTitle: "text-[16px] font-bold text-gray-900",
    sectionDescription: "mt-1 text-[12px] leading-5 text-gray-400",

    searchBar:
        "flex h-12 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 transition-colors focus-within:border-[#FB6F00] focus-within:bg-white",
    searchIcon: "shrink-0 text-gray-400",
    searchInput: "min-w-0 flex-1 bg-transparent text-[14px] text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed",
    searchButton:
        "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-orange-50 text-[#FB6F00] transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50",
    searchErrorMessage: "mt-2 text-[12px] leading-5 text-red-500",

    mapContainer: "relative mt-4 h-[280px] overflow-hidden rounded-2xl border border-gray-100 bg-gray-100",

    centerPin: "pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[#FB6F00]",

    locationInfo: "mt-4 flex items-center gap-3 rounded-xl bg-stone-50 px-4 py-3.5",
    locationInfoIcon: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#FB6F00]",
    locationInfoText: "flex min-w-0 flex-1 flex-col gap-0.5",
    locationLabel: "text-[11px] font-medium text-gray-400",

    selectedAddress: "truncate text-[13px] font-semibold text-gray-800",

    radiusSection: "rounded-[20px] border border-gray-100 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.035)]",
    radiusHeader: "flex items-start justify-between gap-3",
    radiusValue: "shrink-0 rounded-full bg-orange-50 px-3 py-1 text-[12px] font-semibold text-[#FB6F00]",
    radiusOptions: "mt-5 grid grid-cols-3 gap-2",
    radiusButton:
        "h-11 cursor-pointer rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-600 transition-all hover:border-orange-200 hover:bg-orange-50 hover:text-[#FB6F00] disabled:cursor-not-allowed disabled:opacity-50",
    selectedRadiusButton:
        "h-11 cursor-pointer rounded-xl border border-[#FB6F00] bg-orange-50 text-[13px] font-semibold text-[#FB6F00] transition-all disabled:cursor-not-allowed disabled:opacity-50",
    radiusErrorMessage: "mt-2 text-[12px] leading-5 text-red-500",

    guideBox: "flex items-start gap-2.5 rounded-2xl bg-stone-100 px-4 py-3.5 text-[12px] leading-5 text-gray-600",
    guideIcon: "mt-0.5 shrink-0 text-[#FB6F00]",

    footer: "shrink-0 border-t border-gray-100 bg-white px-5 pb-6 pt-4",

    saveButton:
        "flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#FB6F00] text-[16px] font-semibold text-white shadow-[0_6px_16px_rgba(251,111,0,0.18)] transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:opacity-100",
} as const;