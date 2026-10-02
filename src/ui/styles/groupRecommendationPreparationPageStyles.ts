export const groupRecommendationPreparationPageStyles = {
    container: "flex min-h-full flex-col bg-white",

    // Header
    header:
        "sticky top-0 z-30 grid h-[64px] shrink-0 grid-cols-[40px_1fr_40px] items-center " +
        "border-b border-gray-100 bg-white px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 " +
        "transition-colors hover:bg-gray-50 active:bg-gray-100",
    title: "text-center text-[16px] font-bold text-gray-900",
    headerSpacer: "h-10 w-10",

    // Content
    content:
        "flex flex-1 flex-col gap-7 px-5 pt-6 " +
        "pb-[calc(130px+env(safe-area-inset-bottom))]",
    stateContainer: "flex min-h-full items-center justify-center px-5",
    stateText: "text-center text-[13px] text-gray-500",
    errorText: "text-center text-[13px] text-red-500",

    // Group information
    infoCard: "flex flex-col gap-3 rounded-[20px] border border-gray-100 bg-white px-5 py-5",
    infoLabel: "text-[12px] font-semibold text-[#FB6F00]",
    infoTitle: "break-words text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    infoLocation: "flex min-w-0 items-start gap-1.5 text-gray-500",
    infoAddress: "min-w-0 flex-1 break-words text-[12px] leading-5",
    infoRadius: "shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-[#FB6F00]",

    // Readiness progress
    preferenceStatusCard:
        "rounded-[20px] border border-gray-100 bg-white px-5 py-5 " +
        "shadow-[0_2px_10px_rgba(0,0,0,0.035)]",
    preferenceStatusHeader: "flex items-center justify-between gap-3",
    preferenceStatusTitle: "text-[15px] font-bold text-gray-900",
    preferenceStatusCount: "shrink-0 text-[15px] font-bold text-[#FB6F00]",
    progressTrack: "mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100",
    progressFill: "h-full rounded-full bg-[#FB6F00] transition-[width] duration-300 ease-out",
    preferenceStatusDescription: "mt-3 text-[12px] leading-5 text-gray-500",

    // Members
    memberSection: "flex flex-col gap-3",
    memberSectionHeader: "flex items-center justify-between",
    memberSectionTitle: "text-[16px] font-bold text-gray-900",
    memberSectionCount: "text-[12px] font-medium text-gray-400",
    memberList: "flex flex-col gap-3",
    memberCard:
        "flex min-w-0 items-center justify-between gap-3 rounded-[18px] " +
        "border border-gray-100 bg-white p-3.5",
    memberInfo: "flex min-w-0 flex-1 items-center gap-3",
    memberAvatar:
        "relative flex h-12 w-12 shrink-0 items-center justify-center " +
        "overflow-hidden rounded-full bg-gray-100 text-gray-400",
    memberAvatarImage: "rounded-full object-cover",
    memberNameRow: "flex min-w-0 flex-1 items-center gap-2",
    memberName: "min-w-0 flex-1 truncate text-[13px] font-semibold text-gray-900",
    myLabel:
        "inline-flex shrink-0 items-center justify-center rounded-md bg-orange-50 " +
        "px-1.5 py-0.5 text-[10px] font-semibold text-[#FB6F00]",
    readyBadge:
        "flex shrink-0 items-center gap-1 rounded-full bg-orange-50 " +
        "px-2.5 py-1.5 text-[11px] font-semibold text-[#FB6F00]",
    waitingBadge:
        "flex shrink-0 items-center gap-1 rounded-full bg-gray-100 " +
        "px-2.5 py-1.5 text-[11px] font-medium text-gray-500",

    // Member list toggle
    memberToggleButton:
        "flex h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[14px] " +
        "border border-gray-200 bg-white text-[12px] font-semibold text-gray-600 " +
        "transition-colors hover:bg-gray-50 active:bg-gray-100",
    memberToggleIcon: "text-[#FB6F00]",

    // Bottom actions
    bottomActions:
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-[480px] gap-3 px-5 pt-2 " +
        "pb-[calc(20px+env(safe-area-inset-bottom))] " +
        "before:pointer-events-none before:absolute before:inset-x-0 before:-top-10 before:bottom-0 " +
        "before:z-0 before:bg-white/35 before:backdrop-blur-[10px] " +
        "before:[mask-image:linear-gradient(to_bottom,transparent_0%,black_75%)] " +
        "before:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_75%)] " +
        "before:content-['']",
    preferenceEditButton:
        "relative z-10 flex h-[52px] min-w-0 flex-1 cursor-pointer items-center justify-center rounded-[16px] " +
        "border border-gray-200 bg-white px-3 text-[13px] font-semibold text-gray-700 shadow-sm " +
        "transition-colors hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400",
    readyButton:
        "relative z-10 flex h-[52px] min-w-0 flex-1 cursor-pointer items-center justify-center rounded-[16px] " +
        "bg-[#FB6F00] px-3 text-[13px] font-semibold text-white shadow-[0_6px_16px_rgba(251,111,0,0.18)] " +
        "transition-colors hover:bg-[#E96500] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-orange-200 disabled:shadow-none",
} as const;