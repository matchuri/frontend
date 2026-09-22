export const groupDetailPanelStyles = {
    // Page
    container: "min-h-full bg-white",
    detailMessageBox:
        "flex min-h-dvh items-center justify-center px-5 text-[13px] font-medium text-gray-500",
    detailErrorBox:
        "flex min-h-dvh items-center justify-center px-5 text-center text-[13px] font-medium text-red-500",

    // Panel
    panel: "min-h-full bg-white",

    // Header
    header:
        "sticky top-0 z-40 grid h-[64px] grid-cols-[40px_1fr_40px] items-center " +
        "border-b border-gray-100 bg-white px-5",
    headerButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 " +
        "transition-colors hover:bg-gray-50 active:bg-gray-100",
    headerTitle: "text-center text-[16px] font-bold text-gray-900",

    // Content
    content: "flex flex-col gap-8 px-5 pb-10 pt-7",

    // Group
    groupSection: "flex flex-col",
    groupNameRow: "flex items-center gap-2",
    groupTitle:
        "min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[22px] font-bold " +
        "tracking-[-0.03em] text-gray-900",
    groupNameEditButton:
        "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-400 transition-colors hover:bg-gray-50 hover:text-[#FB6F00]",
    groupNameEditWrapper: "flex flex-col",
    groupNameEditRow: "flex items-center gap-2",
    groupNameInput:
        "h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 " +
        "text-[15px] font-semibold text-gray-900 outline-none transition-colors " +
        "focus:border-[#FB6F00] focus:bg-white focus:ring-2 focus:ring-orange-100 " +
        "disabled:bg-gray-100 disabled:text-gray-400",
    groupNameSaveButton:
        "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full " +
        "bg-[#FB6F00] text-white transition-colors hover:bg-[#E96500] " +
        "disabled:cursor-not-allowed disabled:bg-orange-200",
    groupNameCancelButton:
        "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full " +
        "bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200",
    groupNameErrorMessage: "mt-2 text-[12px] text-red-500",

    // Location
    locationInfo: "mt-3 flex min-w-0 items-center gap-1.5 text-gray-400",
    address:
        "min-w-0 max-w-[calc(100%-72px)] overflow-hidden text-ellipsis whitespace-nowrap " +
        "text-[12px] font-medium text-gray-500",
    locationDivider: "shrink-0 text-[12px] text-gray-300",
    locationRadius: "shrink-0 text-[12px] text-gray-400",

    // Recommendation
    recommendationSection: "flex flex-col",
    recommendationGuideText:
        "rounded-[18px] bg-gray-50 px-4 py-4 text-center text-[12px] leading-5 text-gray-500",
    recommendationButton:
        "flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[16px] " +
        "bg-[#FB6F00] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#E96500]",
    preparingRecommendationButton:
        "flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[16px] " +
        "bg-blue-500 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-blue-600",
    openRecommendationButton:
        "flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[16px] " +
        "bg-emerald-500 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-emerald-600",

    // Members
    memberSection: "flex flex-col",
    memberSectionHeader: "mb-4 flex items-center justify-between",
    memberTitleRow: "flex items-center gap-2",
    sectionTitle: "text-[16px] font-bold tracking-[-0.02em] text-gray-900",
    memberCount:
        "flex min-w-6 items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 " +
        "text-[10px] font-semibold text-gray-500",
    memberViewAllButton:
        "cursor-pointer text-[12px] font-medium text-gray-400 transition-colors hover:text-[#FB6F00]",
    memberPreviewList: "flex items-start gap-7 overflow-hidden",
    memberPreviewItem: "flex w-[64px] shrink-0 flex-col items-center",
    memberPreviewAvatar:
        "relative flex h-[56px] w-[56px] items-center justify-center overflow-visible " +
        "rounded-full bg-gray-100 text-gray-400",
    memberPreviewNickname:
        "mt-2 block w-full overflow-hidden text-ellipsis whitespace-nowrap text-left " +
        "text-[11px] font-medium text-gray-500",
    memberOwnerIndicator:
        "absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full " +
        "border-2 border-white bg-[#FB6F00] text-white",
    memberInviteItem:
        "flex w-[56px] shrink-0 cursor-pointer flex-col items-center",
    memberInviteCircle:
        "flex h-[56px] w-[56px] items-center justify-center rounded-full " +
        "border border-[#FB6F00] bg-white text-[#FB6F00] transition-colors " +
        "hover:bg-orange-50",
    memberInviteLabel:
        "mt-2 text-center text-[11px] font-medium text-gray-400",

    // Shared member button
    memberInviteButton:
        "flex cursor-pointer items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1.5 " +
        "text-[11px] font-semibold text-[#FB6F00] transition-colors hover:bg-orange-100",
} as const;