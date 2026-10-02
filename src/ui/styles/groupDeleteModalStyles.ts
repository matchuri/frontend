export const groupDeleteModalStyles = {
    overlay:
        "absolute inset-0 z-[110] flex items-center justify-center bg-black/30 px-5 backdrop-blur-[2px]",
    modal:
        "relative w-full rounded-[24px] bg-white px-5 pb-5 pt-8 text-center " +
        "shadow-[0_16px_40px_rgba(0,0,0,0.16)]",

    closeButton:
        "absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700 " +
        "disabled:cursor-not-allowed disabled:opacity-50",

    icon:
        "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500",
    title: "mt-5 text-[18px] font-bold tracking-[-0.03em] text-gray-900",
    description: "mt-2 text-[13px] leading-5 text-gray-500",

    actions: "mt-7 flex gap-2.5",
    cancelButton:
        "flex h-12 flex-1 cursor-pointer items-center justify-center rounded-[14px] border " +
        "border-gray-200 bg-white text-[14px] font-semibold text-gray-600 transition-colors " +
        "hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
    deleteButton:
        "flex h-12 flex-1 cursor-pointer items-center justify-center rounded-[14px] bg-red-500 " +
        "text-[14px] font-semibold text-white transition-colors hover:bg-red-600 " +
        "disabled:cursor-not-allowed disabled:bg-red-300",
} as const;