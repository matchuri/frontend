export const groupCreateModalStyles = {
    overlay:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]",
    modal:
        "flex w-full max-w-[920px] flex-col rounded-[36px] bg-white px-12 py-10 shadow-2xl",
    header: "flex items-start gap-5",
    backButton:
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700",
    title: "text-4xl font-bold text-zinc-900",
    description: "mt-3 text-lg text-slate-600",
    groupNameInput:
        "mt-8 h-16 rounded-2xl border border-zinc-300 px-6 text-lg text-zinc-700 outline-none placeholder:text-slate-400",
    mapSection:
        "relative mt-8 flex h-[420px] flex-col overflow-hidden rounded-[28px] bg-zinc-100",
    searchBar:
        "absolute left-1/2 top-8 z-20 flex w-[440px] -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg",
    searchInput:
        "min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400",
    locationButton:
        "flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600",
    searchErrorMessage:
        "absolute left-0 top-[58px] w-full rounded-xl bg-white px-4 py-2 text-sm text-red-500 shadow-md",
    mapContainer: "relative h-full w-full",
    centerPin:
        "pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full text-blue-600",
    locationInfo:
        "absolute left-1/2 top-28 z-10 w-[360px] -translate-x-1/2 rounded-2xl bg-white px-5 py-4 shadow-lg",
    locationLabel: "text-xs text-slate-500",
    selectedAddress: "mt-1 block text-sm font-semibold text-zinc-900",
    footer: "mt-8 flex items-center justify-between",
    guideBox: "flex items-center gap-2 text-sm text-slate-600",
    submitButton:
        "flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700",
    disabledButton:
        "flex cursor-not-allowed items-center gap-2 rounded-full bg-zinc-300 px-10 py-4 text-lg font-bold text-zinc-500",
} as const;