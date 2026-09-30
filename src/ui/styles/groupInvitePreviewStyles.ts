export const groupInvitePreviewStyles = {
    page: "flex min-h-full items-center justify-center bg-white px-10",

    content:
        "flex w-full flex-col items-center bg-white",

    inviteIcon:
        "flex h-[76px] w-[76px] items-center justify-center rounded-full " +
        "bg-orange-50 text-[#FB6F00]",

    groupInfo: "mt-6 flex w-full flex-col items-center text-center",
    groupName: "text-[23px] font-bold tracking-[-0.03em] text-gray-900",
    ownerInfo: "mt-3 text-[13px] text-gray-500",
    memberInfo: "mt-2 text-[13px] font-medium text-gray-600",

    divider: "my-7 h-px w-full bg-gray-100",

    actionSection: "flex w-full flex-col items-center",
    actionTextArea: "text-center",
    actionTitle: "text-[17px] font-bold tracking-[-0.02em] text-gray-900",
    actionDescription: "mt-2 text-[13px] leading-5 text-gray-500",

    buttonGroup: "mt-6 grid w-full grid-cols-2 gap-2.5",
    secondaryButton:
        "flex h-[50px] cursor-pointer items-center justify-center rounded-[14px] " +
        "border border-gray-200 bg-white text-[14px] font-semibold text-gray-600 " +
        "transition-colors hover:bg-gray-50 active:bg-gray-100",
    primaryButton:
        "flex h-[50px] cursor-pointer items-center justify-center rounded-[14px] " +
        "bg-[#FB6F00] text-[14px] font-semibold text-white transition-all " +
        "hover:bg-[#E96500] active:scale-[0.99]",

    statePage: "flex min-h-full items-center justify-center bg-white px-5",
    stateContent: "flex w-full max-w-[360px] flex-col items-center text-center",
    stateIcon: "flex h-[72px] w-[72px] items-center justify-center rounded-full bg-orange-50 text-[#FB6F00]",
    errorIcon: "flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gray-100 text-gray-500",
    stateTitle: "mt-6 text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    stateDescription: "mt-3 text-[13px] leading-6 text-gray-500",
    retryButton:
        "mt-7 flex h-[48px] w-full items-center justify-center rounded-[14px] " +
        "bg-[#FB6F00] text-[14px] font-semibold text-white transition-colors hover:bg-[#E96500]",
    exitButton:
        "mt-3 flex h-[48px] w-full items-center justify-center rounded-[14px] " +
        "border border-gray-200 bg-white text-[14px] font-semibold text-gray-600 " +
        "transition-colors hover:bg-gray-50",

    skeletonIcon: "h-[76px] w-[76px] animate-pulse rounded-full bg-gray-100",
    skeletonTitle: "mt-6 h-7 w-44 animate-pulse rounded-lg bg-gray-100",
    skeletonText: "mt-3 h-4 w-32 animate-pulse rounded bg-gray-100",
    skeletonDivider: "my-7 h-px w-full bg-gray-100",
    skeletonAction: "h-6 w-52 animate-pulse rounded bg-gray-100",
    skeletonDescription: "mt-3 h-4 w-44 animate-pulse rounded bg-gray-100",
    skeletonButtons: "mt-6 grid w-full grid-cols-2 gap-2.5",
    skeletonButton: "h-[50px] animate-pulse rounded-[14px] bg-gray-100",
} as const;