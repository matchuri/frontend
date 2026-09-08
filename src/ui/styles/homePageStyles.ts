export const homePageStyles = {
    container: "min-h-full bg-white",

    // Header
    header: "flex h-[72px] items-center justify-between px-5",
    logo: "flex items-center gap-2",
    logoIcon: "flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#FB6F00]",
    logoText: "text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    loginButton:
        "flex h-9 items-center justify-center rounded-xl px-3 text-[14px] font-bold text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#FB6F00]",

    content: "flex flex-col gap-9 px-5 pb-10",

    // Hero
    hero:
        "relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF8A1F] to-[#FB6F00] px-6 py-7 text-white shadow-[0_12px_30px_rgba(251,111,0,0.18)]",
    heroDecorationTop: "absolute -right-14 -top-16 h-44 w-44 rounded-full bg-white/10",
    heroContent: "relative z-10",
    heroBadge: "mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium",
    heroTitle: "text-[26px] font-bold leading-[1.35] tracking-[-0.02em]",
    heroTitleHighlight: "text-white",
    heroDescription: "mt-3 text-[13px] leading-6 text-white/85",

    startButton:
        "mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl " +
        "bg-white px-4 py-3.5 text-sm font-semibold text-[#FB6F00] " +
        "shadow-sm transition-all duration-200 " +
        "hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.16)] " +
        "active:scale-[0.99]",

    heroImageWrapper: "relative z-10 ml-auto mt-5 h-[125px] w-[180px] overflow-hidden rounded-[22px]",
    heroImage: "object-cover",

    // Intro
    introSection: "flex flex-col gap-5",
    sectionHeader: "text-center",
    sectionEyebrow: "text-[11px] font-bold tracking-[0.16em] text-[#FB6F00]",
    sectionTitle: "mt-2 text-[22px] font-bold tracking-[-0.03em] text-gray-900",
    sectionDescription: "mt-2 text-[13px] leading-5 text-gray-500",

    stepList: "flex flex-col gap-3",
    stepCard: "flex items-start gap-4 rounded-[20px] border border-gray-100 bg-white p-4.5 shadow-[0_2px_10px_rgba(0,0,0,0.035)]",
    stepIcon: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#FB6F00]",
    stepContent: "min-w-0 flex-1",
    stepTitleRow: "flex items-center gap-2",
    stepNumber: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FB6F00] text-[10px] font-bold text-white",
    stepTitle: "text-[15px] font-bold text-gray-900",
    stepDescription: "mt-1.5 text-[12px] leading-5 text-gray-500",

    // Features
    featureSection: "grid grid-cols-1 gap-3",
    featureCard: "flex items-start gap-3.5 rounded-[20px] bg-stone-50 p-4.5",
    featureIcon: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#FB6F00] shadow-sm",
    featureTitle: "text-[14px] font-bold text-gray-900",
    featureDescription: "mt-1 text-[12px] leading-5 text-gray-500",

    // Signup
    signupSection: "rounded-[24px] bg-orange-50 px-5 py-6 text-center",
    signupTitle: "text-[18px] font-bold tracking-[-0.03em] text-gray-900",
    signupDescription: "mt-2 text-[12px] leading-5 text-gray-500",
    signupButton:
        "mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-[#FB6F00] text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.99]",
    loginGuide: "mt-3 text-[12px] text-gray-500",
    loginLink: "font-semibold text-[#FB6F00] underline underline-offset-2",
} as const;