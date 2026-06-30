export const groupLocationEditModalStyles = {
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]",
    modal: "w-full max-w-[980px] rounded-[32px] bg-white px-8 py-8 shadow-xl",
    header: "flex items-center gap-4",
    backButton:
        "flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200",
    title: "text-2xl font-bold text-zinc-900",
    description: "mt-1 text-sm text-slate-500",
    mapSection: "relative mt-10",
    searchBar:
        "absolute left-1/2 top-8 z-20 flex h-14 w-[480px] -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-5 text-slate-500 shadow-lg",
    searchInput: "min-w-0 flex-1 bg-transparent text-sm text-zinc-700 outline-none placeholder:text-slate-400",
    locationButton: "flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100",
    searchErrorMessage: "absolute left-0 top-16 text-sm font-medium text-red-500",
    mapContainer: "relative h-[420px] overflow-hidden rounded-[24px] bg-slate-100",
    centerPin:
        "pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full text-indigo-700 drop-shadow-lg",
    locationInfo:
        "absolute left-1/2 top-1/2 z-10 mt-8 min-w-[260px] -translate-x-1/2 rounded-2xl bg-white/95 px-5 py-4 text-center shadow-lg",
    locationLabel: "text-xs font-medium text-slate-500",
    selectedAddress: "mt-1 block text-sm font-bold text-zinc-900",
    footer: "mt-7 flex items-center justify-between",
    guideBox: "flex items-center gap-2 text-sm font-medium text-slate-600",
    submitButton:
        "flex h-12 items-center gap-2 rounded-full bg-indigo-600 px-9 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700",
    disabledButton:
        "flex h-12 cursor-not-allowed items-center gap-2 rounded-full bg-zinc-300 px-9 text-sm font-semibold text-zinc-500",
} as const;