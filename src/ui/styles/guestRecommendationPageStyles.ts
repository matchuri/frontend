export const guestRecommendationPageStyles = {
    page: "min-h-full bg-white",

    // Header
    header:
        "sticky top-0 z-30 relative flex h-[64px] items-center justify-between " +
        "border-b border-gray-100 bg-white px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-700 transition-colors hover:bg-gray-100",
    headerTitle: "absolute left-1/2 -translate-x-1/2 text-[18px] font-bold text-gray-900",
    headerSpacer: "h-10 w-10",

    // Content
    content: "flex flex-col gap-7 px-5 pb-8 pt-6",

    // Intro
    intro: "rounded-[20px] border border-[#FFE7D3] bg-[#FFF8F2] px-5 py-5",
    introTitle: "text-[18px] font-bold tracking-[-0.02em] text-gray-900",
    introDescription: "mt-1.5 text-[12px] leading-5 text-gray-500",

    // Setting Section
    settingSection: "flex flex-col gap-4",
    settingSectionHeader: "flex items-center gap-3 px-1",
    settingSectionIcon:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " +
        "bg-[#FFF1E6] text-[#FB6F00]",
    settingSectionTitle: "text-[16px] font-bold text-gray-900",
    settingSectionDescription: "mt-0.5 text-[12px] leading-5 text-gray-400",

    // State
    stateCard:
        "flex min-h-[150px] flex-col items-center justify-center gap-3 " +
        "rounded-[20px] border border-gray-100 bg-white p-5",
    loadingSpinner:
        "h-7 w-7 animate-spin rounded-full border-[3px] " +
        "border-[#FFE7D3] border-t-[#FB6F00]",
    stateText: "text-[13px] text-gray-500",
    errorText: "text-center text-[13px] leading-5 text-red-500",

    // Location
    locationCard:
        "rounded-[20px] border border-gray-100 bg-white p-5 " +
        "shadow-[0_2px_8px_rgba(0,0,0,0.035)]",

    searchBar:
        "flex h-12 items-center gap-2 rounded-xl border border-gray-200 " +
        "bg-gray-50 px-3 transition-colors " +
        "focus-within:border-[#FB6F00] focus-within:bg-white",
    searchIcon: "shrink-0 text-gray-400",
    searchInput:
        "min-w-0 flex-1 bg-transparent text-[14px] text-gray-900 outline-none " +
        "placeholder:text-gray-400",
    searchButton:
        "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center " +
        "rounded-lg bg-[#FFF1E6] text-[#FB6F00] transition-colors " +
        "hover:bg-[#FFE7D3]",
    searchError: "mt-2 text-[12px] leading-5 text-red-500",

    mapContainer:
        "relative mt-4 h-[260px] overflow-hidden rounded-2xl " +
        "border border-gray-100 bg-gray-100",
    centerPin:
        "pointer-events-none absolute left-1/2 top-1/2 z-10 " +
        "-translate-x-1/2 -translate-y-1/2 text-[#FB6F00]",

    selectedLocation: "mt-4 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5",
    selectedLocationIcon:
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full " +
        "bg-[#FFF1E6] text-[#FB6F00]",
    selectedLocationText: "flex min-w-0 flex-1 flex-col gap-0.5",
    selectedLocationLabel: "text-[11px] font-medium text-gray-400",
    selectedAddress: "truncate text-[13px] font-semibold text-gray-800",

    // Radius
    radiusArea: "mt-6 border-t border-gray-100 pt-5",
    radiusHeader: "flex items-start justify-between gap-3",
    radiusTitle: "text-[16px] font-bold text-gray-900",
    radiusDescription: "mt-1 text-[12px] leading-5 text-gray-400",
    radiusValue:
        "shrink-0 rounded-full bg-[#FFF1E6] px-3 py-1 " +
        "text-[12px] font-semibold text-[#FB6F00]",
    radiusOptions: "mt-4 grid grid-cols-3 gap-2",
    radiusButton:
        "h-11 cursor-pointer rounded-xl border border-gray-200 bg-white " +
        "text-[13px] font-medium text-gray-600 transition-all " +
        "hover:border-[#FFD6B5] hover:bg-[#FFF8F2] hover:text-[#FB6F00]",
    selectedRadiusButton:
        "h-11 cursor-pointer rounded-xl border border-[#FB6F00] bg-[#FFF1E6] " +
        "text-[12px] font-semibold text-[#FB6F00]",

    // Guide
    locationGuide:
        "mt-5 flex items-start gap-2.5 rounded-xl bg-gray-50 px-4 py-3 " +
        "text-[12px] leading-5 text-gray-500",
    guideIcon: "mt-0.5 shrink-0 text-[#FB6F00]",

    // Footer
    footer: "sticky bottom-0 z-20 flex justify-center px-5 pb-6 pt-4",
    startButton:
        "flex h-14 w-[88%] cursor-pointer items-center justify-center gap-2 " +
        "rounded-2xl bg-[#FB6F00] text-[16px] font-semibold text-white " +
        "shadow-[0_8px_20px_rgba(251,111,0,0.22)] transition-opacity duration-200 " +
        "animate-[guestCtaFloat_2.2s_ease-in-out_infinite] hover:opacity-90",
} as const;