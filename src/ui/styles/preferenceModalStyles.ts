export const preferenceModalStyles = {
    overlay:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4",
    modal:
        "flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl",
    header:
        "flex items-center justify-between border-b border-zinc-200 px-8 py-6",
    headerLeft: "flex items-center gap-3",
    iconButton:
        "flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
    title: "text-2xl font-bold text-zinc-900",
    content:
        "flex-1 overflow-y-auto px-8 py-8",
    description:
        "mb-8 text-base font-medium text-zinc-600",
    section: "flex flex-col gap-5",
    sectionTitle:
        "text-lg font-bold text-zinc-900",
    sectionGroup:
        "flex flex-col gap-5",
    requiredSection: "mb-14 flex flex-col gap-5",
    loadingContainer:
        "flex h-40 w-full max-w-md items-center justify-center rounded-3xl bg-white",
    errorContainer:
        "flex h-40 w-full max-w-md items-center justify-center rounded-3xl bg-white text-red-500",
    footer:
        "shrink-0 border-t border-zinc-200 bg-white px-8 py-5",
    saveButton:
        "w-full rounded-full bg-[#ff7043] py-4 text-base font-semibold text-white transition hover:bg-[#f45f30] disabled:bg-zinc-300",
} as const;