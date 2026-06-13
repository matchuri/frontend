export const groupLeaveModalStyles = {
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]",
    modal: "w-full max-w-[420px] rounded-[28px] bg-white px-8 py-8 shadow-xl",
    title: "text-xl font-bold text-zinc-900",
    description: "mt-3 text-sm leading-relaxed text-slate-600",
    actions: "mt-8 flex justify-end gap-3",
    cancelButton:
        "h-11 rounded-full border border-slate-300 px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-100",
    leaveButton:
        "h-11 rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300",
} as const;