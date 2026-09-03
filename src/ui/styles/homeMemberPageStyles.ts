export const homeMemberPageStyles = {
    container: "min-h-full bg-white",
    content: "flex flex-col gap-7 px-5 pb-8",

    // Header
    header: "flex items-center justify-between px-5 pb-5 pt-6",
    userSection: "flex min-w-0 items-center gap-3",
    profileIcon:
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#FB6F00]",
    userTextBox: "min-w-0",
    welcomeText: "text-[15px] text-gray-800",
    locationButton: "mt-1 flex max-w-[230px] cursor-pointer items-center gap-1 rounded-md text-xs text-gray-500 transition-colors hover:text-[#FB6F00]",

    // Hero
    hero:
        "relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF8A1F] to-[#FB6F00] px-6 py-7 text-white shadow-[0_12px_30px_rgba(251,111,0,0.18)]",
    heroDecoration: "absolute -right-14 -top-16 h-44 w-44 rounded-full bg-white/10",
    heroContent: "relative z-10",
    heroBadge:
        "mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium",
    heroIcon: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15",
    heroTitle: "text-[26px] font-bold leading-[1.35] tracking-[-0.02em]",
    heroDescription: "mt-3 text-[13px] leading-6 text-white/85",
    heroButton:
        "mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl " +
        "bg-white px-4 py-3.5 text-sm font-semibold text-[#FB6F00] " +
        "shadow-sm transition-all duration-200 " +
        "hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.16)] " +
        "active:scale-[0.99]",

    // Section
    section: "flex flex-col gap-3",
    sectionHeader: "flex items-start justify-between gap-4",
    sectionTitle: "text-[18px] font-bold tracking-[-0.02em] text-gray-900",
    sectionDescription: "mt-1 text-xs leading-5 text-gray-400",
    sectionActionButton: "flex shrink-0 items-center gap-0.5 pt-1 text-xs font-medium text-gray-500",

    // Taste
    tasteCard:
        "flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.03)]",
    tasteIcon:
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-50 text-[#FB6F00]",
    tasteContent: "min-w-0 flex-1",
    tasteTitle: "mb-1.5 text-[14px] font-semibold text-gray-800",
    chipGroup: "flex flex-wrap gap-2",
    tasteChip: "rounded-full bg-[#FFE9A9] px-3 py-1 text-[11px] font-medium text-gray-700",
    tasteEditButton:
        "shrink-0 cursor-pointer rounded-lg px-2 py-1 text-[14px] font-medium text-[#FB6F00] " +
        "transition-colors duration-200 hover:bg-orange-50 hover:text-[#E96500]",

    // Recommendation history
    historyHeader:
        "flex items-center justify-between gap-3",
    historyViewAllButton:
        "shrink-0 text-[12px] font-medium text-gray-500",
    historyScrollArea:
        "flex gap-3 overflow-x-auto pb-1 " +
        "snap-x snap-mandatory " +
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    historyCard:
        "relative flex h-[132px] w-[218px] shrink-0 snap-start " +
        "flex-col justify-between rounded-[20px] border border-gray-200 " +
        "bg-white p-4 text-left shadow-[0_2px_6px_rgba(0,0,0,0.035)] " +
        "transition active:scale-[0.99]",
    historyDate: "self-end text-[12px] font-medium text-gray-500",
    historyBottom: "flex flex-col items-start gap-2",
    historyMenuName: "max-w-full truncate text-[16px] font-semibold text-gray-900",
    historyChipGroup: "flex flex-wrap gap-1.5",
    historyChip: "rounded-full bg-[#FFE08A] px-3 py-1 text-[11px] font-medium text-gray-700",
    historyEmpty:
        "flex h-[132px] items-center justify-center rounded-[20px] " +
        "border border-gray-200 bg-white text-sm text-gray-400",

    // Group activity
    activityList: "flex flex-col gap-2.5",
    scrollableActivityList:
        "flex max-h-[500px] flex-col gap-2.5 overflow-y-auto pr-1 " +
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    activityCard:
        "flex min-h-[92px] w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-[0_4px_18px_rgba(0,0,0,0.035)] transition active:scale-[0.995]",
    preparingActivityIcon:
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E9E1DC] text-[#262626]",
    openActivityIcon:
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFDBD0] text-[#262626]",
    finalizedActivityIcon:
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D0FFD5] text-[#262626]",
    activityContent: "min-w-0 flex-1",
    activityTop: "flex items-center justify-between gap-3",
    activityGroupName: "truncate text-sm font-semibold text-gray-900",
    activityTime: "shrink-0 text-[11px] text-gray-400",
    activityMessage: "mt-1 truncate text-xs text-gray-500",
    activityEmpty:
        "flex h-[92px] items-center justify-center rounded-2xl border border-gray-100 bg-white text-sm text-gray-400",
    cardChevron: "shrink-0 text-gray-300",

    stateContainer: "flex min-h-full flex-col items-center justify-center gap-4 px-5",
    stateText: "text-sm text-gray-500",
    errorText: "text-center text-sm text-red-500",
    retryButton: "rounded-xl bg-[#FB6F00] px-4 py-2.5 text-sm font-semibold text-white",
    tasteEmptyText: "text-xs text-gray-400",
} as const;