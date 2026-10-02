export const recommendationLoadingStyles = {
    container: "flex min-h-full items-center justify-center px-6",
    content: "flex w-full max-w-[360px] -translate-y-8 flex-col items-center text-center",

    // Visual
    visual: "relative flex h-[150px] w-[150px] items-center justify-center",
    mainIcon:
        "relative z-10 text-[#FB6F00] " +
        "animate-[recommendationLoadingBounce_1.6s_ease-in-out_infinite]",
    sparkleTop:
        "absolute right-[24px] top-[24px] h-2 w-2 rotate-45 bg-[#FB6F00] " +
        "animate-[recommendationLoadingSparkle_1.8s_ease-in-out_infinite]",
    sparkleRight:
        "absolute right-[10px] top-[70px] h-1.5 w-1.5 rotate-45 bg-[#FF9A47] " +
        "animate-[recommendationLoadingSparkle_1.8s_ease-in-out_0.45s_infinite]",
    sparkleBottom:
        "absolute bottom-[23px] left-[32px] h-2 w-2 rotate-45 bg-[#FFB373] " +
        "animate-[recommendationLoadingSparkle_1.8s_ease-in-out_0.9s_infinite]",
    sparkleLeft:
        "absolute left-[14px] top-[49px] h-1.5 w-1.5 rotate-45 bg-[#FB6F00] " +
        "animate-[recommendationLoadingSparkle_1.8s_ease-in-out_1.35s_infinite]",

    // Text
    textArea: "mt-6 flex flex-col items-center",
    title: "text-[21px] font-bold tracking-[-0.03em] text-gray-900",
    description: "mt-3 text-[13px] leading-6 text-gray-500",

    // Status
    status:
        "mt-6 inline-flex items-center gap-2 rounded-full " +
        "bg-[#FFF8F2] px-3.5 py-2 text-[11px] font-medium text-gray-500",
    statusDot: "h-1.5 w-1.5 animate-pulse rounded-full bg-[#FB6F00]",
} as const;