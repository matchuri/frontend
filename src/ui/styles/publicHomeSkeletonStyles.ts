export const publicHomeSkeletonStyles = {
    page: "min-h-full bg-white",

    header: "flex h-[72px] items-center justify-between px-5",
    logoWrapper: "flex items-center gap-2",
    logoIcon: "h-9 w-9 rounded-xl bg-gray-200",
    logoText: "h-6 w-24 rounded bg-gray-200",
    loginButton: "h-9 w-16 rounded-xl bg-gray-200",

    content: "flex flex-col gap-9 px-5 pb-10",

    hero: "rounded-[28px] bg-gray-100 px-6 py-7",
    heroBadge: "h-7 w-36 rounded-full bg-gray-200",
    heroTitleFirst: "mt-5 h-8 w-44 rounded bg-gray-200",
    heroTitleSecond: "mt-2 h-8 w-52 rounded bg-gray-200",
    heroDescriptionFirst: "mt-4 h-4 w-48 rounded bg-gray-200",
    heroDescriptionSecond: "mt-2 h-4 w-40 rounded bg-gray-200",
    heroButton: "mt-6 h-[50px] w-full rounded-2xl bg-gray-200",

    introSection: "flex flex-col gap-5",
    sectionHeader: "flex flex-col items-center",
    sectionEyebrow: "h-3 w-20 rounded bg-gray-200",
    sectionTitle: "mt-2 h-7 w-36 rounded bg-gray-200",

    stepList: "flex flex-col gap-3",
    stepCard: "flex items-start gap-4 rounded-[20px] border border-gray-100 bg-white p-4",
    stepIcon: "h-11 w-11 shrink-0 rounded-2xl bg-gray-200",
    stepContent: "flex-1",
    stepTitle: "h-5 w-28 rounded bg-gray-200",
    stepDescriptionFirst: "mt-2 h-3 w-full rounded bg-gray-100",
    stepDescriptionSecond: "mt-1.5 h-3 w-4/5 rounded bg-gray-100",

    featureSection: "grid grid-cols-1 gap-3",
    featureCard: "flex items-start gap-3.5 rounded-[20px] bg-stone-50 p-4",
    featureIcon: "h-10 w-10 shrink-0 rounded-xl bg-gray-200",
    featureContent: "flex-1",
    featureTitle: "h-4 w-32 rounded bg-gray-200",
    featureDescriptionFirst: "mt-2 h-3 w-full rounded bg-gray-200",
    featureDescriptionSecond: "mt-1.5 h-3 w-4/5 rounded bg-gray-200",

    signupSection: "rounded-[24px] bg-orange-50 px-5 py-6",
    signupTitle: "mx-auto h-5 w-56 rounded bg-gray-200",
    signupDescriptionFirst: "mx-auto mt-3 h-3 w-52 rounded bg-gray-200",
    signupDescriptionSecond: "mx-auto mt-1.5 h-3 w-40 rounded bg-gray-200",
    signupButton: "mt-5 h-12 w-full rounded-2xl bg-gray-200",
    signupGuide: "mx-auto mt-3 h-3 w-32 rounded bg-gray-200",
} as const;