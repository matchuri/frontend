export const homeGuideCardStyles = {
    card:
        "flex h-64 flex-col items-center justify-center rounded-[24px] bg-white px-10 text-center shadow-md shadow-zinc-200",
    stepBox:
        "relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-extrabold text-white shadow-lg shadow-blue-200",
    iconBadge:
        "absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-md",
    title: "mt-7 text-lg font-extrabold text-zinc-900",
    description: "mt-7 text-sm leading-5 text-zinc-500",
} as const;