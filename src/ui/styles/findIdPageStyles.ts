export const findIdPageStyles = {
    page: "min-h-screen bg-slate-100 flex items-center justify-center px-4",
    card: "w-full max-w-[560px] min-h-[680px] rounded-2xl bg-white px-14 py-12 shadow-sm",
    title: "text-4xl font-bold text-slate-950",
    description: "mt-3 text-base text-slate-700",
    form: "mt-24 flex flex-col",
    label: "mb-3 text-base font-semibold text-slate-950",
    input: "h-14 rounded-xl border border-slate-300 px-4 text-base text-zinc-900 outline-none focus:border-slate-500",
    button:
        "mt-10 flex h-14 items-center justify-center rounded-xl bg-slate-500 text-base font-semibold text-white hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50",
    resultBox: "mt-24 flex flex-col items-center text-center",
    resultLabel: "text-xl font-semibold text-slate-950",
    resultValue: "mt-8 text-3xl font-bold text-slate-950",
    resultButtonGroup: "mt-14 flex w-full flex-col gap-3",
    resultButton: "flex h-14 items-center justify-center rounded-xl bg-slate-600 text-base font-semibold text-white hover:bg-slate-700",
    secondaryResultButton:
        "flex h-14 items-center justify-center rounded-xl border border-slate-300 bg-white text-base font-semibold text-slate-700 hover:bg-slate-50",
} as const;