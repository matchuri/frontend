export const settingsPageStyles = {
    page: "min-h-full bg-white",
    header: "flex h-[64px] items-center justify-center border-b border-gray-100 px-5",
    title: "text-[18px] font-bold text-gray-900",

    profileSection: "flex flex-col items-center px-5 pb-14 pt-16",
    profileImageContainer: "relative",
    profileImageWrapper: "flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-orange-100",
    profileImage: "h-full w-full object-cover",
    profileFallbackIcon: "text-[#FB6F00]",
    profileImageEditButton:
        "absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#FB6F00] text-white shadow-sm transition-opacity hover:opacity-80",

    nicknameRow: "mt-5 flex w-full min-w-0 items-center justify-center gap-1.5 px-5",
    nickname: "min-w-0 truncate text-[18px] font-semibold text-gray-900",
    nicknameEditButton:
        "flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600",
    nicknameEditWrapper: "mt-5 flex flex-col items-center gap-1.5",
    nicknameEditRow: "flex items-center gap-1.5",
    nicknameInput:
        "h-9 w-[160px] rounded-lg border border-gray-300 px-3 text-[16px] font-medium text-gray-900 outline-none transition-colors focus:border-[#FB6F00] disabled:bg-gray-100",
    nicknameSaveButton:
        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#FB6F00] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:opacity-100",
    nicknameCancelButton:
        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
    nicknameSuccessMessage: "text-[12px] text-green-600",
    nicknameErrorMessage: "text-[12px] text-red-500",
    email: "mt-1 text-[14px] text-gray-400",

    menuSection: "px-7",
    menuItem:
        "flex h-16 w-full cursor-pointer items-center justify-between border-b border-gray-100 px-2 text-left text-[16px] font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    menuChevron: "shrink-0 text-gray-400",

    stateContainer: "flex min-h-[420px] items-center justify-center px-5",
    errorText: "text-center text-sm text-red-500",

    profileImageModalOverlay: "absolute inset-0 z-[60] flex items-end bg-black/20 backdrop-blur-[2px]",
    profileImageModal:
        "flex h-[68%] min-h-[520px] w-full flex-col rounded-t-[24px] bg-white px-7 pb-7 pt-6 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]",
    profileImageModalHeader: "flex items-center justify-between",
    profileImageModalTitle: "text-[20px] font-bold text-gray-900",
    profileImageModalCloseButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",

    profileImageModalContent: "flex min-h-0 flex-1 flex-col items-center overflow-y-auto pb-6 pt-8",

    selectedPresetPreview: "relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full bg-gray-200",
    presetImageGrid: "mt-8 grid w-full grid-cols-3 justify-items-center gap-x-5 gap-y-8",
    presetImageButton:
        "relative h-[92px] w-[92px] cursor-pointer overflow-hidden rounded-full bg-gray-200 transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100",
    presetImage: "object-cover",
    selectedPresetOverlay: "absolute inset-0 flex items-center justify-center rounded-full bg-black/45 text-white",

    presetImageLoading: "flex w-full flex-col items-center",
    largePresetImageSkeleton: "h-[120px] w-[120px] animate-pulse rounded-full bg-gray-200",
    presetImageSkeletonGrid: "mt-8 grid w-full grid-cols-3 justify-items-center gap-x-5 gap-y-8",
    presetImageSkeleton: "h-[92px] w-[92px] animate-pulse rounded-full bg-gray-200",

    presetImageError: "flex flex-1 flex-col items-center justify-center gap-4 text-center text-sm text-red-500",
    presetImageRetryButton: "cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700",

    profileImageSaveButton:
        "h-14 w-full shrink-0 cursor-pointer rounded-xl bg-[#FB6F00] text-[16px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:opacity-100",

    modalOverlay: "absolute inset-0 z-[70] flex items-center justify-center bg-black/20 px-5 backdrop-blur-[2px]",
    modalBox: "w-full max-w-[360px] rounded-[24px] bg-white p-6 shadow-[0_12px_36px_rgba(0,0,0,0.14)]",
    modalTitleWrapper: "flex items-center gap-3",
    modalWarningIcon: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500",
    modalTitle: "text-[18px] font-bold text-gray-900",
    modalDescription: "mt-5 text-[14px] leading-6 text-gray-500",
    modalButtonWrapper: "mt-7 flex gap-3",
    modalCancelButton:
        "h-11 flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white text-[14px] font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
    modalDangerButton:
        "h-11 flex-1 cursor-pointer rounded-xl bg-red-500 text-[14px] font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300",
} as const;