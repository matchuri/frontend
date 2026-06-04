export const groupMemberListModalStyles = {
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]",
    modal: "w-full max-w-[560px] rounded-[28px] bg-white px-8 py-8 shadow-xl",
    backButton:
        "flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200",
    content: "mt-5 flex flex-col gap-7",
    title: "text-2xl font-bold text-zinc-900",
    memberList: "flex max-h-[420px] flex-col gap-4 overflow-y-auto pr-1",
    memberCard: "flex items-center gap-4 rounded-[24px] bg-zinc-100 px-5 py-4",
    avatar: "flex h-14 w-14 items-center justify-center rounded-full bg-slate-300 text-slate-500",
    nickname: "flex-1 text-base font-semibold text-zinc-900",
    ownerRoleBadge: "rounded-full bg-amber-200 px-5 py-2 text-sm font-semibold text-yellow-800",
    memberRoleBadge: "rounded-full bg-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-700",
} as const;