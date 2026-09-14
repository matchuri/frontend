export const oauthCallbackLoadingStyles = {
    container: "flex min-h-dvh flex-col items-center justify-center bg-white px-5 text-center",
    spinner:
        "h-10 w-10 animate-spin rounded-full border-[3px] " +
        "border-orange-100 border-t-[#FB6F00]",
    title: "mt-6 text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    description: "mt-2 text-[14px] leading-6 text-gray-500",
} as const;