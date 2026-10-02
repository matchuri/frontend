export const signupOnboardingStyles = {
    content: "flex flex-col px-5 pb-10 pt-5",

    intro: "mb-8",
    title: "text-[22px] font-bold leading-[1.4] tracking-[-0.03em] text-gray-900",
    description: "mt-2 text-[14px] leading-6 text-gray-500",

    // Terms
    termList: "flex flex-col gap-3",
    allAgreeRow:
        "flex cursor-pointer items-center gap-3 rounded-[18px] border border-orange-100 " +
        "bg-orange-50 px-4 py-4",
    checkboxInput: "peer sr-only",
    checkboxVisual:
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 " +
        "bg-white text-transparent transition-colors peer-checked:border-[#FB6F00] " +
        "peer-checked:bg-[#FB6F00] peer-checked:text-white",
    allAgreeLabel: "text-[15px] font-bold text-gray-900",
    termGuide: "mt-3 text-[12px] leading-5 text-gray-400",

    // Nickname
    form: "flex flex-col gap-6",
    inputGroup: "flex flex-col gap-2",
    label: "text-[14px] font-semibold text-gray-700",
    input:
        "h-[56px] w-full rounded-[16px] border border-gray-200 bg-gray-50 px-4 " +
        "text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 " +
        "focus:border-[#FB6F00] focus:bg-white focus:ring-2 focus:ring-orange-100",

    // Preference
    preferenceContent: "flex flex-col gap-5 pb-10",
    preferenceIntro: "rounded-[20px] bg-orange-50 px-5 py-5",
    preferenceIntroTitle: "text-[16px] font-bold text-gray-900",
    preferenceIntroDescription: "mt-1.5 text-[13px] leading-5 text-gray-500",
    preferenceCard:
        "rounded-[20px] border border-gray-100 bg-white px-5 py-5 " +
        "shadow-[0_2px_8px_rgba(0,0,0,0.035)]",
    sectionHeader: "mb-6 flex items-start justify-between gap-3",
    sectionTitle: "text-[16px] font-bold text-gray-900",
    sectionDescription: "mt-1 text-[12px] leading-5 text-gray-400",
    requiredBadge:
        "shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-[#FB6F00]",
    optionalBadge:
        "shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500",
    sectionGroup: "flex flex-col gap-7",

    primaryButton:
        "mt-7 flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[14px] " +
        "bg-[#FB6F00] px-4 text-[14px] font-semibold text-white transition-all " +
        "hover:bg-[#E96500] active:scale-[0.99] disabled:cursor-not-allowed " +
        "disabled:bg-[#FFD7B5] disabled:text-white",

    stateContainer: "flex min-h-dvh items-center justify-center bg-white px-5",
    stateText: "text-[14px] text-gray-500",
    errorText: "text-center text-[14px] text-red-500",
} as const;

export const signupTermGroupStyles = {
    container: "overflow-hidden rounded-[16px] border border-gray-100 bg-white",
    header: "flex min-h-[58px] items-center justify-between gap-3 px-4",
    checkboxLabel: "flex min-w-0 flex-1 cursor-pointer items-center gap-3",
    checkboxInput: "peer sr-only",
    checkboxVisual:
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 " +
        "bg-white text-transparent transition-colors peer-checked:border-[#FB6F00] " +
        "peer-checked:bg-[#FB6F00] peer-checked:text-white",
    name: "min-w-0 text-[14px] font-medium text-gray-800",
    requiredBadge:
        "shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-[#FB6F00]",
    optionalBadge:
        "shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500",
    toggleButton:
        "shrink-0 cursor-pointer text-[12px] font-medium text-gray-400 transition-colors " +
        "hover:text-gray-700",
    content: "border-t border-gray-100 bg-gray-50 px-4 py-4",
    section: "not-last:mb-5",
    sectionTitle: "mb-1.5 text-[12px] font-semibold text-gray-700",
    sectionText: "text-[11px] leading-5 text-gray-500",
} as const;