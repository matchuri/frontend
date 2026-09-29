export const groupRecommendationResultPageStyles = {
    container: "flex min-h-full flex-col bg-white",

    // Header
    header:
        "sticky top-0 z-30 grid h-[64px] shrink-0 grid-cols-[40px_1fr_40px] items-center " +
        "border-b border-gray-100 bg-white px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 " +
        "transition-colors hover:bg-gray-50 active:bg-gray-100",
    headerTitle: "text-center text-[16px] font-bold text-gray-900",
    headerSpacer: "h-10 w-10",

    // Content
    content: "flex flex-1 flex-col gap-7 px-5 pb-10 pt-6",
    contentWithVoteAction: "pb-[calc(118px+env(safe-area-inset-bottom))]",
    stateContainer: "flex min-h-full flex-col items-center justify-center gap-4 px-5",
    stateText: "text-center text-[13px] text-gray-500",
    errorText: "text-center text-[13px] text-red-500",
    retryButton:
        "flex h-11 cursor-pointer items-center justify-center rounded-[14px] border border-gray-200 " +
        "bg-white px-5 text-[13px] font-semibold text-gray-600 hover:bg-gray-50",

    // Vote status
    voteStatusCard:
        "rounded-[20px] border border-gray-100 bg-white px-5 py-5 " +
        "shadow-[0_2px_10px_rgba(0,0,0,0.035)]",
    voteStatusHeader: "flex items-center justify-between gap-3",
    voteStatusTitle: "text-[15px] font-bold text-gray-900",
    voteStatusCount: "shrink-0 text-[15px] font-bold text-gray-900",
    progressTrack: "mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100",
    progressFill: "h-full rounded-full bg-[#FB6F00] transition-[width] duration-300 ease-out",
    voteStatusDescription: "mt-3 text-[12px] leading-5 text-gray-500",
    voteActionButton:
        "mt-4 flex h-11 w-full cursor-pointer items-center justify-center rounded-[14px] " +
        "bg-[#FB6F00] text-[13px] font-semibold text-white hover:bg-[#E96500] " +
        "disabled:cursor-not-allowed disabled:bg-orange-200",
    resultActionButton:
        "mt-4 flex h-11 w-full cursor-pointer items-center justify-center rounded-[14px] " +
        "bg-[#FB6F00] text-[13px] font-semibold text-white " +
        "transition-colors hover:bg-[#E96500] active:bg-[#D95E00]",

    // Members
    memberSection: "flex min-w-0 flex-col gap-4",
    memberSectionHeader: "flex items-center justify-between",
    memberStatusTitle: "text-[16px] font-bold text-gray-900",
    memberSectionCount: "text-[12px] font-medium text-gray-400",

    memberList:
        "flex w-full min-w-0 gap-3 overflow-x-auto overscroll-x-contain pb-2 pt-1 " +
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    memberItem: "flex w-[88px] shrink-0 flex-col items-center gap-3 text-center",

    memberAvatarWrapper:
        "relative h-[clamp(52px,15vw,64px)] w-[clamp(52px,15vw,64px)] shrink-0",
    memberAvatar:
        "relative flex h-full w-full items-center justify-center overflow-hidden " +
        "rounded-full bg-orange-50 text-gray-400",
    memberAvatarImage: "rounded-full object-cover",

    memberVoteCheck:
        "absolute -bottom-0.5 -right-0.5 z-10 flex h-6 w-6 items-center " +
        "justify-center rounded-full border-[3px] border-white bg-[#169B53] text-white",

    memberInfo: "flex w-full min-w-0 flex-col items-center gap-1",
    memberNameRow: "flex w-full min-w-0 items-center justify-center gap-1",
    memberNickname: "min-w-0 truncate text-[12px] font-semibold text-gray-900",
    myLabel: "shrink-0 text-[12px] font-medium text-gray-700",

    memberStatusReady: "text-[11px] font-medium text-[#169B53]",
    memberStatusWaiting: "text-[11px] font-medium text-gray-400",

    // Candidates
    resultSection: "flex flex-col gap-4",
    resultHeader: "flex items-end justify-between px-1",
    resultEyebrow: "text-[10px] font-bold tracking-[0.14em] text-[#FB6F00]",
    resultTitle: "mt-1 text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    selectionGuide: "pb-0.5 text-[11px] font-medium text-gray-400",
    candidateGrid: "flex flex-col gap-4",
    candidateCard:
        "overflow-hidden rounded-[22px] border-2 border-gray-100 bg-white " +
        "shadow-[0_3px_12px_rgba(0,0,0,0.045)] transition-[border-color,box-shadow] duration-200 " +
        "hover:border-orange-200",
    selectedCandidateCard:
        "overflow-hidden rounded-[22px] border-2 border-[#FB6F00] bg-white " +
        "shadow-[0_5px_18px_rgba(251,111,0,0.12)] transition-[border-color,box-shadow] duration-200",
    candidateSelectButton:
        "block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-inset " +
        "focus-visible:ring-[#FB6F00] disabled:cursor-default",
    candidateImageWrapper: "relative h-[210px] w-full overflow-hidden bg-gray-100",
    candidateImage: "object-cover",
    candidateImageFallback:
        "flex h-full w-full items-center justify-center text-[12px] font-medium text-gray-400",
    candidateBadges: "absolute left-3 top-3 z-10",
    matchBadge:
        "rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold " +
        "text-[#FB6F00] shadow-sm backdrop-blur-sm",
    selectedBadge:
        "absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full " +
        "bg-[#FB6F00] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm",
    candidateBody: "flex items-center justify-between gap-3 p-5",
    candidateName: "min-w-0 text-[22px] font-bold tracking-[-0.03em] text-gray-900",

    // Floating vote button
    bottomAction:
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[480px] " +
        "px-5 pb-[calc(20px+env(safe-area-inset-bottom))] " +
        "before:pointer-events-none before:absolute before:inset-x-0 before:-top-20 before:bottom-0 " +
        "before:z-0 before:bg-white/20 before:backdrop-blur-[3px] " +
        "before:[mask-image:linear-gradient(to_bottom,transparent_0%,black_60%)] " +
        "before:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_60%)] " +
        "before:content-['']",
    voteButton:
        "pointer-events-auto relative z-10 flex h-[52px] w-full cursor-pointer items-center justify-center " +
        "rounded-[16px] bg-[#FB6F00] text-[14px] font-semibold text-white " +
        "shadow-[0_8px_24px_rgba(251,111,0,0.24)] transition-colors hover:bg-[#E96500] " +
        "animate-[guestCtaFloat_2.4s_ease-in-out_infinite] motion-reduce:animate-none " +
        "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none " +
        "disabled:animate-none",
} as const;