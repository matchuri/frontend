export const resetPasswordPageStyles = {
    page: "min-h-screen bg-slate-100 flex items-center justify-center px-4",
    card: "w-full max-w-[560px] min-h-[680px] rounded-2xl bg-white px-14 py-12 shadow-sm",
    title: "text-4xl font-bold text-slate-950",
    description: "mt-1 text-base text-slate-700",
    form: "mt-4 flex flex-col",
    label: "mt-12 mb-3 text-base font-semibold text-slate-950",
    input: "mb-6 h-14 rounded-xl border border-slate-300 px-4 text-base text-zinc-800 outline-none focus:border-slate-500",
    button:
        "mt-4 flex h-14 items-center justify-center rounded-xl bg-slate-500 text-base font-semibold text-white hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50",
    timerText: "text-sm text-slate-500",
    message: "mt-2 text-sm text-red-500",
    resultBox: "mt-24 flex flex-col items-center text-center",
    resultLabel: "text-xl font-medium text-slate-950",
    resultButton: "mt-14 flex h-14 w-full items-center justify-center rounded-xl bg-slate-600 text-base font-semibold text-white hover:bg-slate-700",
} as const;