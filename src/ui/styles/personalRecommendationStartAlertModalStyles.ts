export const personalRecommendationStartAlertModalStyles = {
    overlay:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm",
    modal:
        "flex w-full max-w-md flex-col items-center rounded-3xl bg-white px-8 py-10 text-center shadow-2xl",
    title:
        "text-xl font-bold text-zinc-900",
    description:
        "mt-4 text-sm font-medium leading-6 text-zinc-600",
    confirmButton:
        "mt-8 h-12 w-full rounded-full bg-black text-sm font-semibold text-white transition hover:bg-zinc-800",
} as const;