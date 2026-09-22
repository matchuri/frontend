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

    content: "px-5 py-5",
    inputSection:
        "rounded-[20px] border border-gray-100 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.035)]",
    label: "text-[14px] font-semibold text-gray-700",
    inputWrapper:
        "mt-3 flex h-12 items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3.5 " +
        "transition-colors focus-within:border-[#FB6F00] focus-within:bg-white focus-within:ring-2 " +
        "focus-within:ring-orange-100",
    inputIcon: "shrink-0 text-gray-400",
    input:
        "min-w-0 flex-1 bg-transparent text-[14px] text-gray-900 outline-none " +
        "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-400",
    message: "mt-2 text-[12px] leading-5 text-red-500",

    footer: "shrink-0 border-t border-gray-100 bg-white px-5 pb-6 pt-4",
    inviteButton:
        "flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl bg-[#FB6F00] " +
        "text-[16px] font-semibold text-white shadow-[0_6px_16px_rgba(251,111,0,0.18)] " +
        "transition-all duration-200 hover:opacity-90 active:scale-[0.99] " +
        "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:opacity-100",
} as const;