export const groupCreateModalStyles = {
    overlay:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]",
    modal:
        "flex w-full max-w-[920px] flex-col rounded-[36px] bg-white px-12 py-10 shadow-2xl",
    backButton:
        "mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-700",
    title: "text-4xl font-bold text-zinc-900",
    description: "mt-3 text-lg text-slate-600",
    groupNameInput:
        "mt-10 h-16 rounded-2xl border border-zinc-300 px-6 text-lg text-zinc-800 outline-none placeholder:text-zinc-400",
    mapSection:
        "relative mt-10 flex h-[420px] flex-col overflow-hidden rounded-[28px] bg-zinc-100",
    mapPlaceholder:
        "flex flex-1 items-center justify-center text-2xl font-bold text-zinc-400",
    mapSearchBar:
        "absolute left-1/2 top-8 z-10 flex w-[440px] -translate-x-1/2 items-center justify-between rounded-2xl bg-slate-100 px-5 py-4 shadow-lg",
    selectedLocationCard:
        "absolute left-1/2 top-28 z-10 w-[360px] -translate-x-1/2 rounded-2xl bg-white px-5 py-4 shadow-lg",
    footer: "mt-8 flex items-center justify-between",
    submitButton:
        "rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700",
    disabledButton:
        "cursor-not-allowed rounded-full bg-zinc-300 px-10 py-4 text-lg font-bold text-zinc-500",
} as const;