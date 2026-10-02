export const personalRecommendationStartAlertModalStyles = {
    overlay:
        "absolute inset-0 z-[80] flex items-center justify-center bg-black/35 px-5 backdrop-blur-[1px]",
    modal:
        "w-full rounded-[24px] bg-white px-5 pb-5 pt-8 text-center " +
        "shadow-[0_16px_40px_rgba(0,0,0,0.18)]",
    icon:
        "mx-auto flex h-16 w-16 items-center justify-center rounded-full " +
        "bg-orange-50 text-[#FB6F00]",
    title:
        "mx-auto mt-6 max-w-[280px] text-[19px] font-bold leading-7 " +
        "tracking-[-0.03em] text-gray-900",
    description:
        "mx-auto mt-3 max-w-[280px] text-[13px] leading-6 text-gray-500",
    confirmButton:
        "mt-7 flex h-[52px] w-full cursor-pointer items-center justify-center " +
        "rounded-[14px] bg-[#FB6F00] text-[14px] font-semibold text-white " +
        "transition-all hover:bg-[#E96500] active:scale-[0.99]",
} as const;