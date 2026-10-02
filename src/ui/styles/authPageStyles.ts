export const authPageStyles = {
    page: "min-h-dvh bg-white",

    header: "grid h-16 grid-cols-[40px_1fr_40px] items-center px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full " +
        "text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100",
    headerTitle:
        "text-center text-[14px] font-semibold tracking-[-0.02em] text-gray-900",
    headerSpacer: "h-10 w-10",

    content: "flex flex-col px-5 pb-10",
    flowContent: "flex flex-col px-5 pb-10 pt-10",

    loginContent: "flex flex-col px-5 pb-10 pt-5",

    loginIntro: "mb-8",
    loginTitle: "text-[22px] font-bold leading-[1.4] tracking-[-0.03em] text-gray-900",
    loginDescription: "mt-3 text-[14px] leading-6 text-gray-500",

    intro: "mb-8",
    title: "text-[22px] font-bold leading-[1.4] tracking-[-0.03em] text-gray-900",
    description: "mt-2 text-[14px] leading-6 text-gray-500",

    form: "flex flex-col gap-5",
    inputGroup: "flex flex-col gap-2",
    label: "text-[14px] font-semibold text-gray-700",
    input:
        "h-[56px] w-full rounded-[16px] border border-gray-200 bg-gray-50 px-4 " +
        "text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 " +
        "focus:border-[#FB6F00] focus:bg-white focus:ring-2 focus:ring-orange-100 " +
        "disabled:bg-gray-100 disabled:text-gray-400",
    passwordInputWrapper: "relative",
    passwordInput: "pr-12",
    passwordToggle:
        "absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center " +
        "justify-center text-gray-400 transition-colors hover:text-gray-600",

    message: "text-[12px] leading-5 text-red-500",
    statusMessage: "text-[12px] leading-5 text-gray-500",
    timerText: "text-[13px] font-medium text-[#FB6F00]",

    primaryButton:
        "flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[14px] " +
        "bg-[#FB6F00] px-4 text-[14px] font-semibold text-white transition-all " +
        "hover:bg-[#E96500] active:scale-[0.99] disabled:cursor-not-allowed " +
        "disabled:bg-[#FFD7B5] disabled:text-white",
    secondaryButton:
        "flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[14px] " +
        "border border-gray-200 bg-white px-4 text-[14px] font-semibold text-gray-700 " +
        "transition-colors hover:bg-gray-50 active:bg-gray-100",

    signupGuide: "mt-6 flex items-center justify-center gap-1 text-[13px] text-gray-400",
    signupLink: "font-semibold text-gray-800 transition-colors hover:text-[#FB6F00]",

    divider: "my-8 flex items-center gap-4 text-[13px] text-gray-400",
    dividerLine: "h-px flex-1 bg-gray-200",

    socialGroup: "flex items-center justify-center gap-5",
    socialIconButton:
        "relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-full " +
        "transition-transform active:scale-95",
    socialIcon: "object-cover",

    helperLinks: "mt-8 flex items-center justify-center gap-2 text-[12px] text-gray-500",
    helperLink: "transition-colors hover:text-gray-800",
    separator: "text-gray-300",

    verificationSection: "flex flex-col items-center",
    verificationIcon:
        "mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 " +
        "text-[#FB6F00]",
    verificationTitle: "text-center text-[22px] font-bold tracking-[-0.03em] text-gray-900",
    verificationDescription: "mt-3 text-center text-[14px] leading-6 text-gray-500",

    codeInputGroup: "flex w-full items-center justify-center gap-2",
    codeInput:
        "h-[56px] min-w-0 flex-1 rounded-[14px] border border-gray-200 bg-white " +
        "text-center text-[20px] font-bold text-gray-900 outline-none transition-colors " +
        "focus:border-[#FB6F00] focus:ring-2 focus:ring-orange-100 " +
        "disabled:bg-gray-100 disabled:text-gray-400",
    codeInputError: "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100",
    codeInfo: "mb-5 flex items-center justify-center gap-1.5 text-[13px] text-gray-500",

    resendRow: "mt-3 flex items-center justify-center gap-1.5 text-[13px] text-gray-500",
    resendButton:
        "cursor-pointer font-semibold text-[#FB6F00] transition-opacity hover:opacity-70 " +
        "disabled:cursor-not-allowed disabled:text-[#FDBE8A]",
    verificationHelp: "mt-5 flex flex-col items-center gap-2 text-[13px] text-gray-500",
    verificationResendRow: "flex items-center justify-center gap-1.5",
    verificationResendButton:
        "cursor-pointer font-semibold text-[#FB6F00] transition-opacity " +
        "hover:opacity-70 disabled:cursor-not-allowed disabled:text-gray-400",
    verificationResendMessage: "text-[12px] leading-5 text-red-500",
    verificationResendTime: "text-[12px] text-gray-400",

    verificationHelpCard: "mt-10 w-full rounded-[18px] bg-gray-50 px-5 py-5 text-gray-600",
    verificationHelpCardTitle: "flex items-center gap-2 text-[14px] font-semibold text-gray-700",
    verificationHelpCardList: "mt-3 list-disc space-y-1 pl-5 text-[12px] leading-5 text-gray-500",

    verificationResultModalOverlay:
        "absolute inset-0 z-[80] flex items-center justify-center bg-black/35 px-5 backdrop-blur-[1px]",
    verificationResultModal:
        "w-full rounded-[22px] bg-white px-5 pb-5 pt-10 text-center " +
        "shadow-[0_16px_40px_rgba(0,0,0,0.18)]",
    verificationResultErrorIcon:
        "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500",
    verificationResultSuccessIcon:
        "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500",
    verificationResultTitle:
        "mt-7 text-[20px] font-bold tracking-[-0.03em] text-gray-900",
    verificationResultDescription:
        "mt-3 text-[15px] leading-6 text-gray-600",
    verificationResultCount: "font-bold text-[#FB6F00]",
    verificationResultButton: "mt-8",

    resultBox:
        "flex flex-col items-center rounded-[20px] border border-gray-100 bg-gray-50 " +
        "px-5 py-8 text-center",
    resultLabel: "text-[14px] leading-6 text-gray-600",
    resultValue: "mt-3 text-[20px] font-bold tracking-[-0.02em] text-gray-900",
    resultButtonGroup: "mt-7 flex w-full flex-col gap-3",

    completionContainer: "flex flex-col items-center pt-12 text-center",
    completionIcon:
        "flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#FB6F00] " +
        "bg-orange-50 text-[#FB6F00]",
    completionErrorIcon:
        "flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-300 " +
        "bg-gray-50 text-gray-500",
    completionTitle: "mt-7 text-[24px] font-bold tracking-[-0.03em] text-gray-900",
    completionDescription: "mt-3 text-[14px] leading-6 text-gray-500",
    completionValueBox: "mt-7 w-full rounded-[18px] bg-gray-100 px-5 py-5 text-center",
    completionValueLabel: "text-[13px] text-gray-500",
    completionValue: "mt-2 text-[20px] font-semibold tracking-[-0.02em] text-gray-900",
    completionButton: "mt-8",
    completionButtonGroup: "mt-8 flex w-full flex-col gap-3",

    stateContainer: "flex min-h-dvh items-center justify-center px-5",
    stateText: "text-[14px] text-gray-500",
} as const;