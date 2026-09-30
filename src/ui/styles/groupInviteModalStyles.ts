export const groupInviteModalStyles = {
    overlay:
        "absolute inset-0 z-[100] flex items-end bg-black/20 backdrop-blur-[2px]",
    modal:
        "flex w-full flex-col overflow-hidden rounded-t-[28px] bg-white " +
        "shadow-[0_-8px_30px_rgba(0,0,0,0.12)]",

    header:
        "flex shrink-0 items-start justify-between border-b border-gray-100 bg-white px-6 pb-5 pt-6",
    title: "text-[20px] font-bold text-gray-900",
    description: "mt-1.5 text-[13px] leading-5 text-gray-500",
    closeButton:
        "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-900 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed " +
        "disabled:opacity-50 disabled:hover:bg-transparent",

    content: "flex flex-col gap-3 px-5 py-5",

    inputSection:
        "rounded-[20px] border border-gray-100 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.035)]",
    label: "text-[14px] font-semibold text-gray-700",
    nicknameInviteRow: "mt-3 flex items-center gap-2",
    inputWrapper:
        "flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3.5 " +
        "transition-colors focus-within:border-[#FB6F00] focus-within:bg-white focus-within:ring-2 " +
        "focus-within:ring-orange-100",
    inputIcon: "shrink-0 text-gray-400",
    input:
        "min-w-0 flex-1 bg-transparent text-[14px] text-gray-900 outline-none " +
        "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-400",
    inviteButton:
        "flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#FB6F00] " +
        "px-4 text-[13px] font-semibold text-white transition-all " +
        "hover:bg-[#E96500] active:scale-[0.98] " +
        "disabled:cursor-not-allowed disabled:bg-[#FFD7B5]",
    message: "mt-2 text-[12px] leading-5 text-red-500",

    linkSection:
        "rounded-[20px] border border-gray-100 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.035)]",
    linkHeader: "flex items-start gap-3",
    linkIcon:
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FB6F00]",
    linkDescription: "mt-1 text-[12px] leading-5 text-gray-500",
    linkWrapper: "mt-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2",
    linkText: "min-w-0 flex-1 truncate pl-2 text-[12px] text-gray-600",
    copyButton:
        "flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg " +
        "bg-white px-3 text-[12px] font-semibold text-[#FB6F00] shadow-sm transition-colors " +
        "hover:bg-orange-50 active:bg-orange-100",
    copySuccessMessage: "mt-2 flex items-center gap-1 text-[12px] leading-5 text-green-600",
    copyErrorMessage: "mt-2 text-[12px] leading-5 text-red-500",
} as const;