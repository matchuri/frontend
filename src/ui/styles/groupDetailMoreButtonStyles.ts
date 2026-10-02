export const groupDetailMoreButtonStyles = {
    wrapper: "relative",
    button:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-500 " +
        "transition-colors hover:bg-gray-50 hover:text-gray-800 active:bg-gray-100",

    menu:
        "absolute right-0 top-[46px] z-50 w-[190px] overflow-hidden rounded-[18px] border " +
        "border-gray-100 bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
    menuItem:
        "flex h-12 w-full cursor-pointer items-center gap-3 rounded-[13px] px-3 text-left " +
        "text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-50",
    menuIcon:
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gray-50 text-gray-500",

    divider: "mx-3 h-px bg-gray-100",

    deleteMenuItem:
        "flex h-12 w-full cursor-pointer items-center gap-3 rounded-[13px] px-3 text-left " +
        "text-[13px] font-medium text-red-500 transition-colors hover:bg-red-50",
    leaveMenuItem:
        "flex h-12 w-full cursor-pointer items-center gap-3 rounded-[13px] px-3 text-left " +
        "text-[13px] font-medium text-red-500 transition-colors hover:bg-red-50",
    deleteMenuIcon:
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-red-50 text-red-500",
} as const;