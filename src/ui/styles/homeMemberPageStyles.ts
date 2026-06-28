export const homeMemberPageStyles = {
    container: "h-screen overflow-hidden bg-[#EEF7FC] px-16 pt-24 pb-12",

    content: "h-full px-8",

    titleSection: "mb-12",
    title: "text-4xl font-semibold tracking-[-0.03em] text-zinc-950",
    description: "mt-4 text-xl font-medium text-slate-700",

    cardList: "flex flex-col gap-7",
    card:
        "flex min-h-[180px] items-center justify-between rounded-[40px] border border-zinc-200 bg-white px-12 py-8 shadow-sm",
    cardTextBox: "max-w-[620px]",
    cardTitle: "text-2xl font-bold tracking-[-0.02em] text-zinc-950",
    cardDescription: "mt-4 text-base leading-7 text-zinc-600",
    actionButton:
        "flex h-16 min-w-[260px] cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-zinc-950 bg-white px-8 text-base font-bold text-zinc-950 transition hover:bg-zinc-100 active:bg-zinc-100",
} as const;