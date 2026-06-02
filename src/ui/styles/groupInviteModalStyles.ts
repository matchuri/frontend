export const groupInviteModalStyles = {
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]",
    modal: "w-full max-w-[520px] rounded-[28px] bg-white px-8 py-8 shadow-xl",
    backButton:
        "flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200",
    content: "mt-5 flex flex-col gap-6",
    title: "text-2xl font-bold text-zinc-900",
    input:
        "h-12 rounded-xl border border-slate-200 px-4 text-sm text-zinc-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400",
    footer: "flex justify-end",
    inviteButton: "h-11 rounded-full bg-black px-8 text-sm font-semibold text-white transition hover:bg-zinc-800",
} as const;