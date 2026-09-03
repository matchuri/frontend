export const groupInviteNotificationStyles = {
    button:
        "fixed right-5 top-6 z-[70] flex h-10 w-10 cursor-pointer " +
        "items-center justify-center rounded-full border border-gray-100 " +
        "bg-white text-gray-700 shadow-sm transition-all duration-200 " +
        "hover:shadow-md min-[480px]:right-[calc((100vw-480px)/2+20px)]",
    notificationDot:
        "absolute right-[9px] top-[8px] h-2 w-2 rounded-full " +
        "bg-[#FB6F00] ring-2 ring-white",
    overlay: "fixed inset-0 z-[60] cursor-default bg-black/20 backdrop-blur-[1px]",
    panel:
        "fixed right-5 top-[76px] z-[70] w-[360px] overflow-hidden " +
        "rounded-2xl border border-gray-200 bg-white " +
        "shadow-[0_12px_32px_rgba(0,0,0,0.14)] " +
        "max-[400px]:left-5 max-[400px]:right-5 max-[400px]:w-auto " +
        "min-[480px]:right-[calc((100vw-480px)/2+20px)]",
    header: "flex items-center justify-between border-b border-gray-100 px-4 py-3",
    title: "text-[15px] font-semibold text-gray-900",
    count: "mt-0.5 block text-[11px] text-gray-400",
    closeButton:
        "flex h-8 w-8 cursor-pointer items-center justify-center " +
        "rounded-full text-gray-400 transition-colors " +
        "hover:bg-gray-100 hover:text-gray-700",
    list:
        "max-h-[396px] overflow-y-auto " +
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    item: "h-[132px] border-b border-gray-100 px-4 py-4 last:border-b-0",
    info: "flex items-start gap-3",
    avatar:
        "flex h-10 w-10 shrink-0 items-center justify-center " +
        "rounded-full bg-orange-50 text-[#FB6F00]",
    text: "min-w-0 flex-1",
    message: "text-[13px] text-gray-700",
    groupName: "mt-1 block truncate text-[12px] text-gray-400",
    actions: "mt-3 flex justify-end gap-2",
    declineButton:
        "cursor-pointer rounded-lg border border-gray-200 bg-white " +
        "px-3 py-1.5 text-[12px] font-medium text-gray-500 " +
        "transition-colors hover:bg-gray-50",
    acceptButton:
        "cursor-pointer rounded-lg bg-[#FB6F00] px-3 py-1.5 " +
        "text-[12px] font-medium text-white transition-colors " +
        "hover:bg-[#E96500]",
    empty:
        "flex min-h-[150px] flex-col items-center justify-center " +
        "gap-2 text-[12px] text-gray-400",
} as const;