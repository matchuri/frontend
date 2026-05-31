export const personalRecommendationLoadingStyles = {
    container:
        "flex min-h-screen items-center justify-center bg-[#fbf9f9] px-10",
    card:
        "flex h-[520px] w-full max-w-[1160px] flex-col items-center justify-center rounded-[32px] bg-white shadow-md",
    iconWrapper:
        "relative flex h-[180px] w-[180px] items-center justify-center",
    spinner:
        "absolute h-[150px] w-[150px] animate-spin rounded-full border-4 border-orange-100 border-t-orange-400",
    iconCircle:
        "relative flex h-[124px] w-[124px] items-center justify-center rounded-full bg-orange-100 text-orange-400 shadow-md",
    title:
        "mt-8 text-4xl font-bold text-zinc-950",
    description:
        "mt-5 text-base font-medium text-slate-700",
} as const;