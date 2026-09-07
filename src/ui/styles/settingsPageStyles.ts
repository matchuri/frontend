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
        "absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#FB6F00] text-white shadow-sm",

    nicknameRow: "mt-5 flex items-center gap-1.5",
    nickname: "text-[18px] font-semibold text-gray-900",
    nicknameEditButton: "flex h-6 w-6 items-center justify-center text-gray-400",
    email: "mt-1 text-[14px] text-gray-400",

    menuSection: "px-7",
    menuItem:
        "flex h-16 w-full items-center justify-between border-b border-gray-100 px-2 text-left text-[16px] font-medium text-gray-900 disabled:cursor-default disabled:opacity-100",
    menuChevron: "shrink-0 text-gray-400",

    stateContainer: "flex min-h-[420px] items-center justify-center px-5",
    errorText: "text-center text-sm text-red-500",

    skeletonProfileImage: "h-24 w-24 animate-pulse rounded-full bg-gray-200",
    skeletonNickname: "mt-5 h-5 w-24 animate-pulse rounded bg-gray-200",
    skeletonEmail: "mt-2 h-4 w-40 animate-pulse rounded bg-gray-100",
} as const;