export const locationModalStyles = {
    overlay:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm",
    modal:
        "flex h-[860px] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl",
    header:
        "flex items-start gap-5 px-10 py-8",
    backButton:
        "flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition hover:bg-zinc-200",
    title:
        "text-3xl font-semibold text-zinc-950",
    description:
        "mt-2 text-sm font-medium text-zinc-600",
    mapSection:
        "relative flex-1 overflow-hidden",
    searchBar:
        "absolute left-1/2 top-8 z-20 flex h-16 w-[620px] -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-6 shadow-xl",
    searchInput:
        "w-full text-base font-medium text-zinc-700 outline-none placeholder:text-zinc-400",
    searchErrorMessage:
        "absolute left-6 top-[72px] text-xs font-semibold text-red-500",
    locationButton:
        "flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600",
    mapContainer:
        "relative h-full w-full bg-zinc-200",
    emptyMapArea:
        "flex h-full w-full items-center justify-center bg-zinc-200 text-sm font-medium text-zinc-400",
    centerPin:
        "absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full text-[#4f46e5] drop-shadow-lg",
    locationInfo:
        "absolute left-1/2 top-[180px] z-10 flex -translate-x-1/2 flex-col rounded-2xl bg-white/95 px-6 py-4 shadow-lg backdrop-blur-sm",
    locationLabel:
        "text-xs font-semibold text-zinc-600",
    selectedAddress:
        "mt-1 text-base font-semibold text-zinc-800",
    footer:
        "flex items-center justify-between border-t border-zinc-200 px-10 py-6",
    guideBox:
        "flex items-center gap-2 text-sm font-medium text-zinc-600",
    saveButton:
        "flex h-14 w-[150px] items-center justify-center gap-2 rounded-full bg-[#4f46e5] text-base font-semibold text-white shadow-lg transition hover:bg-[#4338ca]",
} as const;