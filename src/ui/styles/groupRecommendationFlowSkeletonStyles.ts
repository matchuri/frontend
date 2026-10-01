export const groupRecommendationFlowSkeletonStyles = {
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

    // Preparation
    preparationContent:
        "flex flex-1 flex-col gap-7 px-5 pt-6 " +
        "pb-[calc(130px+env(safe-area-inset-bottom))]",
    infoCard: "flex flex-col gap-3 rounded-[20px] border border-gray-100 bg-white px-5 py-5",
    infoLabel: "h-3 w-28 rounded bg-gray-200",
    infoTitle: "h-7 w-40 rounded bg-gray-200",
    infoLocationRow: "flex items-center gap-2",
    infoAddress: "h-4 min-w-0 flex-1 rounded bg-gray-100",
    infoRadius: "h-6 w-16 shrink-0 rounded-full bg-gray-200",

    // Shared status
    statusCard:
        "rounded-[20px] border border-gray-100 bg-white px-5 py-5 " +
        "shadow-[0_2px_10px_rgba(0,0,0,0.035)]",
    statusHeader: "flex items-center justify-between gap-3",
    statusTitle: "h-5 w-32 rounded bg-gray-200",
    statusCount: "h-5 w-12 rounded bg-gray-200",
    progressTrack: "mt-4 h-2.5 w-full rounded-full bg-gray-200",
    statusDescription: "mt-3 h-4 w-48 rounded bg-gray-100",

    // Members
    memberSection: "flex flex-col gap-4",
    sectionHeader: "flex items-center justify-between",
    sectionTitle: "h-5 w-20 rounded bg-gray-200",
    sectionCount: "h-4 w-12 rounded bg-gray-100",
    preparationMemberList: "flex flex-col gap-3",
    preparationMemberCard:
        "flex min-w-0 items-center justify-between gap-3 rounded-[18px] " +
        "border border-gray-100 bg-white p-3.5",
    memberInfo: "flex min-w-0 flex-1 items-center gap-3",
    memberAvatar: "h-12 w-12 shrink-0 rounded-full bg-gray-200",
    memberName: "h-4 w-24 rounded bg-gray-200",
    memberBadge: "h-7 w-20 shrink-0 rounded-full bg-gray-100",
    preparationBottomActions:
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-[480px] gap-3 px-5 pt-2 " +
        "pb-[calc(20px+env(safe-area-inset-bottom))] bg-white/80 backdrop-blur-[10px]",
    bottomButton: "h-[52px] min-w-0 flex-1 rounded-[16px] bg-gray-200",

    // Result
    resultContent:
        "flex flex-1 flex-col gap-7 px-5 pt-6 " +
        "pb-[calc(118px+env(safe-area-inset-bottom))]",
    resultMemberList: "flex w-full min-w-0 gap-3 overflow-hidden pb-2 pt-1",
    resultMemberItem: "flex w-[88px] shrink-0 flex-col items-center gap-3",
    resultMemberAvatar: "h-[60px] w-[60px] rounded-full bg-gray-200",
    resultMemberName: "h-4 w-16 rounded bg-gray-200",
    resultMemberStatus: "h-3 w-12 rounded bg-gray-100",
    tasteSummary: "rounded-[20px] bg-orange-50/60 px-5 py-5",
    tasteSummaryTitle: "h-5 w-32 rounded bg-gray-200",
    tasteChipList: "mt-4 flex flex-wrap gap-2",
    tasteChip: "h-7 w-20 rounded-full bg-gray-200",
    tasteChipSmall: "h-7 w-16 rounded-full bg-gray-200",
    resultSection: "flex flex-col gap-4",
    resultHeader: "flex items-end justify-between px-1",
    resultEyebrow: "h-3 w-20 rounded bg-gray-200",
    resultTitle: "mt-2 h-7 w-24 rounded bg-gray-200",
    selectionGuide: "h-3 w-28 rounded bg-gray-100",
    candidateGrid: "flex flex-col gap-4",
    candidateCard: "overflow-hidden rounded-[22px] border-2 border-gray-100 bg-white",
    candidateImage: "h-[210px] w-full bg-gray-200",
    candidateBody: "p-5",
    candidateName: "h-7 w-28 rounded bg-gray-200",
    resultBottomAction:
        "fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[480px] px-5 " +
        "pb-[calc(20px+env(safe-area-inset-bottom))]",
    resultBottomButton: "h-[52px] w-full rounded-[16px] bg-gray-200",

    // Vote result
    voteResultContent: "flex flex-1 flex-col gap-7 px-5 pb-10 pt-6",
    voteResultRestaurantSection: "flex flex-col gap-4",
    voteResultRestaurantHeader: "flex items-end justify-between gap-3",
    voteResultEyebrow: "h-3 w-20 rounded bg-gray-200",
    voteResultMenuName: "mt-2 h-7 w-28 rounded bg-gray-200",
    voteResultLocationButton: "h-9 w-24 shrink-0 rounded-xl bg-gray-200",
    voteResultMap: "h-[280px] w-full rounded-[22px] bg-gray-200",
    voteResultRestaurantList: "flex flex-col gap-3",
    voteResultRestaurantCard: "rounded-[18px] border border-gray-100 bg-white p-4",
    voteResultRestaurantName: "h-5 w-32 rounded bg-gray-200",
    voteResultRestaurantMeta: "mt-2 h-3 w-48 rounded bg-gray-100",
} as const;