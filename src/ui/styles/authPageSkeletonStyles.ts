export const authPageSkeletonStyles = {
    page: "min-h-dvh bg-white",

    header: "grid h-16 grid-cols-[40px_1fr_40px] items-center px-5",
    backButton: "h-10 w-10 rounded-full bg-gray-200",
    headerSpacer: "h-10 w-10",

    content: "flex flex-col px-5 pb-10 pt-5",
    loginContent: "flex flex-col px-5 pb-10 pt-5",

    progress: "mb-8 flex flex-col gap-3",
    progressMeta: "flex items-center justify-between",
    progressLabel: "h-4 w-24 rounded bg-gray-200",
    progressStep: "h-4 w-10 rounded bg-gray-200",
    progressTrack: "h-1.5 w-full rounded-full bg-gray-200",

    loginIntro: "mb-8",
    loginTitle: "h-8 w-20 rounded bg-gray-200",

    intro: "mb-8",
    title: "h-8 w-48 rounded bg-gray-200",
    descriptionFirst: "mt-3 h-4 w-full max-w-[320px] rounded bg-gray-200",
    descriptionSecond: "mt-2 h-4 w-3/4 rounded bg-gray-200",

    form: "flex flex-col gap-5",
    inputGroup: "flex flex-col gap-2",
    label: "h-5 w-16 rounded bg-gray-200",
    input: "h-[56px] w-full rounded-[16px] bg-gray-200",
    button: "h-[52px] w-full rounded-[14px] bg-gray-200",

    signupGuide: "mt-6 flex justify-center",
    signupGuideText: "h-4 w-44 rounded bg-gray-200",

    divider: "my-8 flex items-center gap-4",
    dividerLine: "h-px flex-1 bg-gray-200",
    dividerText: "h-4 w-6 rounded bg-gray-200",

    socialGroup: "flex items-center justify-center gap-5",
    socialButton: "h-14 w-14 rounded-full bg-gray-200",
    helperLinks: "mx-auto mt-8 h-4 w-36 rounded bg-gray-200",

    termList: "flex flex-col gap-3",
    termAll: "h-14 w-full rounded-[16px] bg-gray-200",
    termItem: "h-[72px] w-full rounded-[16px] bg-gray-200",
    termGuide: "my-5 h-4 w-4/5 rounded bg-gray-200",

    preferenceSections: "flex flex-col gap-7",
    preferenceSection: "flex flex-col gap-3",
    preferenceTitle: "h-5 w-28 rounded bg-gray-200",
    preferenceChips: "flex flex-wrap gap-2",
    preferenceChip: "h-9 w-20 rounded-full bg-gray-200",
    preferenceSearch: "h-[56px] w-full rounded-[16px] bg-gray-200",
} as const;