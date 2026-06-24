export const groupRecommendationPreparationPageStyles = {
    container: "min-h-screen bg-white",
    content: "mx-auto w-full max-w-[1280px] px-16 py-20",

    title: "text-4xl font-bold text-zinc-900",

    layout: "mt-20 grid grid-cols-[minmax(0,1fr)_380px] gap-14",
    mainSection: "flex flex-col gap-6",

    preferenceStatusCard: "rounded-[28px] border border-blue-200 bg-white px-10 py-8",
    preferenceStatusHeader: "flex items-center justify-between",
    preferenceStatusTitle: "text-2xl font-bold text-zinc-900",
    preferenceStatusCount: "text-base font-bold text-zinc-900",
    progressTrack: "mt-8 h-4 overflow-hidden rounded-full bg-zinc-200",
    progressFill: "h-full rounded-full bg-blue-500",
    preferenceStatusDescription: "mt-8 text-base font-medium leading-7 text-blue-950",

    memberGrid: "grid grid-cols-2 gap-6",
    memberCard:
        "flex min-h-[128px] items-center justify-between rounded-[24px] bg-zinc-50 px-8 py-5 shadow-md",
    myMemberCard:
        "flex min-h-[128px] items-center justify-between rounded-[24px] border-2 border-blue-400 bg-zinc-50 px-8 py-5 shadow-md",
    memberInfo: "flex min-w-0 items-center gap-5",
    memberAvatar: "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-300 text-slate-500",
    memberName: "whitespace-nowrap text-lg font-bold text-zinc-900",
    memberActionArea: "flex shrink-0 flex-col items-end gap-2",

    preferenceEditButton:
        "h-9 min-w-[96px] whitespace-nowrap rounded-full border border-blue-400 bg-white px-5 text-sm font-semibold text-slate-600",
    readyButton:
        "h-9 min-w-[96px] whitespace-nowrap rounded-full bg-blue-400 px-5 text-sm font-semibold text-white",
    readyIcon: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-300 text-zinc-950",
    waitingIcon:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-950",

    infoCard: "rounded-[28px] bg-blue-50 px-9 py-10",
    infoTitle: "text-2xl font-bold text-zinc-900",
    infoList: "mt-8 flex flex-col gap-5",
    infoItem: "flex items-center gap-4 rounded-full bg-white px-4 py-4",
    infoIcon: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-slate-500",
    infoLabel: "text-xs font-bold text-blue-400",
    infoValue: "mt-1 text-sm font-bold text-blue-950",
} as const;