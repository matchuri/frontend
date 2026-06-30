export const groupRecommendationResultPageStyles = {
    container: "min-h-screen bg-slate-50",
    content: "mx-auto max-w-[1360px] px-16 py-10",

    backButton: "flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-slate-200",

    titleSection: "mt-8",
    title: "text-5xl font-bold text-zinc-900",
    description: "mt-3 text-xl text-slate-700",

    topSection: "mt-14 grid grid-cols-[1fr_1.45fr] gap-16",

    voteStatusCard: "rounded-[36px] bg-white px-10 py-10 shadow-[0_2px_8px_rgba(15,23,42,0.12)]",
    voteStatusHeader: "flex items-center justify-between",
    voteStatusTitle: "text-2xl font-bold text-zinc-900",
    voteStatusCount: "text-2xl font-bold text-blue-500",
    progressTrack: "mt-8 h-4 rounded-full bg-zinc-200",
    progressFill: "h-full rounded-full bg-blue-500",
    voteActionButton: "mt-8 h-16 w-full cursor-pointer rounded-[20px] bg-indigo-950 text-2xl font-bold text-white",
    resultActionButton: "mt-8 h-16 w-full cursor-pointer rounded-[20px] bg-indigo-950 text-2xl font-bold text-white",

    memberStatusCard: "min-w-0 rounded-[36px] bg-white px-12 py-8 shadow-[0_2px_8px_rgba(15,23,42,0.12)]",
    memberStatusTitle: "text-center text-2xl font-bold text-zinc-900",
    memberList: "mt-8 flex justify-center gap-10", // 멤버 5명 이하일 때 가운데 정렬
    memberListScrollable: "mt-8 flex max-w-full min-w-0 flex-nowrap gap-10 overflow-x-auto pb-3", // 멤버 6명 이상일 때 가로 스크롤 적용
    memberItem: "flex w-[88px] min-w-[88px] shrink-0 flex-col items-center",
    memberAvatarWrapper: "relative",
    memberAvatar:
        "flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-500",
    memberCheckIcon:
        "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white",
    memberNickname: "mt-3 text-sm font-bold text-zinc-900",
    memberStatusReady: "mt-1 text-sm font-semibold text-green-700",
    memberStatusWaiting: "mt-1 text-sm text-zinc-400",

    candidateGrid: "mt-20 grid grid-cols-3 gap-8",
    candidateCard: "overflow-hidden rounded-[24px] bg-white shadow-[0_4px_10px_rgba(15,23,42,0.14)]",
    selectedCandidateCard:
        "overflow-hidden rounded-[24px] border-2 border-blue-500 bg-white shadow-[0_4px_10px_rgba(15,23,42,0.14)]",
    candidateImagePlaceholder: "relative flex h-[260px] items-center justify-center bg-zinc-200",
    matchBadge: "absolute left-5 top-5 rounded-full bg-amber-800 px-5 py-2 text-base text-white",
    candidateBody: "px-8 py-7",
    candidateName: "text-xl font-semibold text-zinc-900",
    voteButton:
        "mt-5 h-14 w-full rounded-full bg-slate-100 text-lg font-semibold text-zinc-900 transition-colors hover:bg-blue-200 hover:text-blue-700 active:bg-blue-200",
    disabledVoteButton:
        "mt-5 h-14 w-full cursor-not-allowed rounded-full bg-zinc-300 text-lg font-semibold text-zinc-500",
    candidateImage: "h-full w-full object-cover",
    candidateImageFallbackText: "text-sm font-semibold text-zinc-400",
} as const;